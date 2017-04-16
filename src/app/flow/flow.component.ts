import { TextPageDialogComponent } from './textpage-dialog/textpage-dialog.component';
import { ConfirmDialogComponent } from './../ui/confirm-dialog/confirm-dialog.component';
import { SectionService } from 'app/core/section.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdMenuTrigger, MdMenu, MdDialog } from "@angular/material";
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { Section } from "app/core/section";
import { RenameDialog } from './rename-dialog.component';
import { StateGenerator } from './state-generator'

import EMPTY_PAGE from './states/empty';
import CHOICE_PAGE from './states/choice';
import INPUT_PAGE from './states/input';


const TERMINAL_GRP = 'terminal';
const TEMP_ID = 20000;
const EDGE_ID_START = 10000;
let nextId = EDGE_ID_START;

/** Return a random value in the range [-size; size]. Used to put a graph node in a random position. */
function noise(size) {
  return Math.floor((Math.random() * (2 * size)) - size);
}

/**
 * Componente de sequência de estados.
 * 
 * Mecanismos de interação:
 * - Estados
 *   - criação: botão no canto do canvas abre um menu com as opções de páginas a serem criadas
 *   - edição/remoção: ao clicar com o botão direito, abre um menu com as opções de "renomear", definir como estado inicial ou remover.
 * - Transições. Essas opções podem ser através de botões (mode_edit, launch, delete_forever)
 *   - criação: ao selecionar um estado, aparecerá um nó que pode ser deslocado sobre o destino da nova aresta
 *   - edição: ao selecionar uma aresta, ela entra em modo de edição e sairá se for clicado em qualquer outro canto da tela
 *   - remoção: se ao e
 * 
 *  mode_edit, trending_flat (arrow_forward), delete_forever
 */
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {
  @ViewChild('graph') private _container: ElementRef;
  @ViewChild('snippetMenu') private _menu: MdMenu;
  @ViewChild(MdMenuTrigger) private _menuTrigger: MdMenuTrigger;
  @ViewChild('snippetMenuTrigger') private _menuTriggerElm: ElementRef;

  private _graph: Network;
  private _nodes: DataSet<Node>;
  private _edges: DataSet<Edge>;

  private mode: string;
  private selected: number;
  private message: string;

  /** Vis network definitions */
  private _graphOptions = {
    nodes: {
      labelHighlightBold: true
    },
    edges: {
      arrows: 'to',
      smooth: true,
      // font: '12px arial gray'
      font: {
        color: '#3f51b5',
        size: 12,
        background: 'white'
      }
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -40,
        springLength: 100
      },
      minVelocity: 1,
      solver: 'forceAtlas2Based',
      timestep: 1,
    },
    interaction: {
      tooltipDelay: 300,
      selectConnectedEdges: false
    },
    manipulation: {
      enabled: true,
      controlNodeStyle: {
        color: {
          background: '#fff',
          border: '#928f7e',
          highlight: {
            background: '#fff',
            border: '#928f7e'
          }
        },
      },
      editEdge: (data, callback) => this.editEdgeConcluded(data, callback),
      addEdge: (data, callback) => this.addEdgeConcluded(data, callback),
    },
    groups: {
      start: { shape: 'box', color: { border: '#4caf50', background: '#b8e0b9', highlight: { border: '#4caf50', background: '#b8e0b9' } } },
      content: { shape: 'box', color: { border: '#ff7f00', background: '#ffb266', highlight: { border: '#ff7f00', background: '#ffb266' } } },
      intervention: { shape: 'box', color: { border: '#3f51b5', background: '#b4bbe4', highlight: { border: '#3f51b5', background: '#b4bbe4' } } },
      terminal: { shape: 'circle', label: ' + ', margin: 1, font: { face: 'courier', size: 12 }, color: { border: '#dedac1', background: '#ffffff', highlight: { border: '#dedac1', background: '#ffffff' } }, shapeProperties: { borderDashes: [2, 2] } }
    }
  };

  private section: Section;

  constructor(private sectionServ: SectionService, public dialog: MdDialog) {
    this.mode = 'normal';
    sectionServ.current$.subscribe(section => {
      this.section = section;
      this.resetGraph();
    });
    
  }

  ngOnInit() {
  }

  private resetNodes() {
    let nodes = this.section.states.map(state => {
      return {
        id: state.id,
        label: state.label,
        group: this.section.initialState == state.id? 'start' : state.type
      };
    });
    return this._nodes = new DataSet<Node>(nodes);
  }

  private resetEdges() {
    let edges = [];
    for (let state of this.section.states) {
      for (let edge of state.outedges) {
        edge.id = nextId++;   // insert id int he state edge to be able to get it back when necessary
        let to = this.section.states.find(state => state.label == edge.to);
        if (to) {
          edges.push({
            id: edge.id,
            from: state.id,
            to: to.id,
            label: edge.label
          });
        }
      }
    }
    return this._edges = new DataSet<Edge>(edges);
  }


  resetGraph() {
    let data = {
      nodes: this.resetNodes(),
      edges: this.resetEdges()
    };
    this._graph = new Network(this._container.nativeElement, data, this._graphOptions);
    this._graph.on('selectNode',   params => this.selectNode(params));
    this._graph.on('selectEdge', params => this.selectEdge(params));
    this._graph.on('deselectNode', params => this.deselectNode(params));
    this._graph.on('deselectEdge', params => this.deselectEdge(params));
    this._graph.on('dragStart', params => this.dragStart(params));
    this._graph.on('dragEnd', params => this.dragEnd(params));
  }

  private selectNode(params) {
    if (params.nodes.length > 0) {
      this.mode = 'editNode';
      this.selected = params.nodes[0];
      let node = this.section.getStateById(this.selected);
      this.sectionServ.selectState(node.label);
    }
  }

  private selectEdge(params) {
    if (params.edges.length > 0) {
      this.mode = 'editEdge';
      this.selected = params.edges[0];
    }    
  }

  private dragStart(params) {
    if (params.nodes.length > 0) {
      this.selectNode(params);
    }    
  }

  private dragEnd(params) {
    if (this.mode == 'cancel') {
      this.cancelEdition();
    }
  }

  private deselectNode(params) {
    if (this.mode == 'editNode') {
      this.mode = 'normal';
      this.selected = undefined;
    }
  }

  private deselectEdge(params) {
    if (this.mode == 'editEdge') {
      this.mode = 'normal';
      this.selected = undefined;    
    }
  }

  // ---------------------------------------------

  renameNode() {
    if (this.selected) {
      let node = this._nodes.get(this.selected) as Node;
      if (node) {
        let renameDlg = this.dialog.open(RenameDialog);
        renameDlg.componentInstance.label = node.label;
        renameDlg.afterClosed().subscribe(label => {
          if (label) {
            let state = this.section.getStateById(this.selected);
            state.label = label;
            this._nodes.update({ id: this.selected, label: label });
          }
        });
      }
    }
  }

  setAsStartNode() {
    if (this.selected) {
      let node = this._nodes.get(this.selected) as Node;
      if (node) {
        let initialState = this.section.getInitialState();
        this._nodes.update({ id: initialState.id , group: initialState.type });
        this._nodes.update({ id: this.selected, group: 'start' });
        this.section.initialState = this.selected;
        // TODO update section (spread event)
      }
    }    
  }
  
  removeNode() {
    if (this.selected) {
      let node = this._nodes.get(this.selected) as Node;
      if (node) {
        let dlg = this.dialog.open(ConfirmDialogComponent);
        let label = node.label ? `"${node.label}"` : '';
        dlg.componentInstance.message = `Quer mesmo remover a página ${label} ?`;
        dlg.afterClosed().subscribe(answer => {
          if (answer == 'ok') {
            // remove the node and its adjacent edges
            let toRemove =[];
            this._edges.forEach(edge => {
              if (edge.from == this.selected || edge.to == this.selected) {
                toRemove.push(edge.id);
              }
            });
            this._edges.remove(toRemove);
            this._nodes.remove(this.selected);

            // remove the state (and its from and to transitions)
            let state = this.section.getStateById(this.selected);
            this.section.removeState(state);
            this.mode = 'normal';
            this.selected = undefined;
          }
        });
      }
    }
  }


  renameEdge() {
    if (this.selected) {
      let edge = this._edges.get(this.selected) as Edge;
      if (edge) {
        let renameDlg = this.dialog.open(RenameDialog);
        renameDlg.componentInstance.label = edge['label'];
        renameDlg.afterClosed().subscribe(label => {
          if (label) {
            let fromState = this.section.getStateById(edge.from as number);

            console.log(fromState);
            console.log(this.selected);
            
            
            let transition = fromState.getTransition(this.selected);
            transition.label = label;

            // fromState.removeTransition(this.selected);
            console.log(fromState);
            
            this._edges.update([{ id: this.selected, label: label }]);
            // this.section.
            // TODO update section
          }
        });
      }
    }
  }

  createEdgeMode() {
    this._graph.addEdgeMode();
    this.message = "Clique em uma página e arraste até outra para criar uma transição entre elas.";
    this.mode = 'cancel';    
  }

  editEdge() {
    if (this.selected) {
      let edge = this._edges.get(this.selected) as Edge;
      if (edge) {
        this._graph.editEdgeMode();
        this.mode = 'cancel';
      }
    }
  }

  removeEdge() {
    if (this.selected) {
      let edge = this._edges.get(this.selected) as Edge;
      if (edge) {
        let dlg = this.dialog.open(ConfirmDialogComponent);
        let label = edge['label'] ? `"${edge['label']}"` : '';
        dlg.componentInstance.message = `Quer mesmo remover a transição ${label} ?`;
        dlg.afterClosed().subscribe(answer => {
          if (answer == 'ok') {
            let fromState = this.section.getStateById(edge.from as number);
            fromState.removeTransition(this.selected);
            this._edges.remove(this.selected);
            this.mode = 'normal';
            this.selected = undefined;
          }
        });
      }
    }
  }

  cancelEdition() {
    this._graph.disableEditMode();
    this._graph.unselectAll();
    this.message = '';
    this.mode = 'normal';
    this.selected = undefined;
  }

  private editEdgeConcluded(edgeData, callback) {
    if (this.selected) {
      let edge = this._edges.get(this.selected) as Edge;
      if (edge) {
        let fromState = this.section.getStateById(edge.from as number);
        let toNode = this._nodes.get(edgeData.to) as Node;
        // if the origin has not changed, just update the 'to' field
        if (edge.from == edgeData.from) {
          let transition = fromState.getTransition(this.selected);
          transition.to = toNode.label;
        }
        // else, the edge must be removed from the origin and created at the new one
        else {
          fromState.removeTransition(this.selected);
          console.log(fromState);
          fromState = this.section.getStateById(edgeData.from);
          fromState.addTransition({
            id: this.selected,
            label: edgeData.label,
            to: toNode.label
          });
        }
        callback(edgeData);
        this.cancelEdition();
      }
    }
  }

  private addEdgeConcluded(edgeData, callback) {
    let fromState = this.section.getStateById(edgeData.from);
    let toState = this.section.getStateById(edgeData.to);
    if (fromState && toState) {
      let id = nextId++;
      fromState.addTransition({
        id: id,
        to: toState.label,
        label: undefined
      });
      this._edges.add({
        id: id,
        from: fromState.id,
        to: toState.id
      });
      callback();
    }
  }


//-------------------------------------------------

  private createState(type: string) {

    let stateCreation = (title: string, creationFunc: Function) => {
      let dlg = this.dialog.open(TextPageDialogComponent);
      dlg.componentInstance.title = title;
      dlg.componentInstance.placeHolder = 'Nome da página';
      dlg.componentInstance.hint = "(opcional) Caso queira guardar a resposta em uma variável";
      dlg.afterClosed().subscribe(data => {
        if (data && data.name) {
          let state = creationFunc(nextId++, data.name, data.varName);
          this.sectionServ.createState(state);
          this._nodes.add({
            id: state.id,
            label: state.label,
            group: state.type
          });
        }
      });

    }

    switch (type) {
      case 'content':
        let emptyDlg = this.dialog.open(RenameDialog);
        emptyDlg.componentInstance.message = 'Nome da nova página';
        emptyDlg.afterClosed().subscribe(label => {
          if (label) {
            EMPTY_PAGE.id = nextId++;
            EMPTY_PAGE.label = label;
            this.sectionServ.createState(EMPTY_PAGE);
            this._nodes.add({
              id: EMPTY_PAGE.id,
              label: EMPTY_PAGE.label,
              group: EMPTY_PAGE.type
            });
            // TODO update section
          }
        });
        break;

      case 'choice':
        stateCreation('Pergunta com opções', StateGenerator.createChoice);
        // let textDlg = this.dialog.open(TextPageDialogComponent);
        // textDlg.componentInstance.title = 'Pergunta com opções';
        // textDlg.componentInstance.placeHolder = 'Nome da página';
        // textDlg.componentInstance.hint = "(opcional) Caso queira guardar a resposta em uma variável";
        // textDlg.afterClosed().subscribe(data => {
        //   if (data && data.name) {
        //     let state = StateGenerator.createChoice(nextId++, data.name, data.varName);
        //     this.sectionServ.createState(state);
        //     this._nodes.add({
        //       id: state.id,
        //       label: state.label,
        //       group: state.type
        //     });
        //   }
        // });



        // let choiceDlg = this.dialog.open(RenameDialog);
        // choiceDlg.componentInstance.message = 'Nome da nova página';
        // choiceDlg.afterClosed().subscribe(label => {
        //   if (label) {
        //     CHOICE_PAGE.id = nextId++;
        //     CHOICE_PAGE.label = label;
        //     this.sectionServ.createState(CHOICE_PAGE);
        //     this._nodes.add({
        //       id: CHOICE_PAGE.id,
        //       label: CHOICE_PAGE.label,
        //       group: CHOICE_PAGE.type
        //     });
        //     // TODO update section
        //   }
        // });
        break;
        
      case 'input':
        stateCreation('Pergunta com entrada de texto', StateGenerator.createInput);
        break;
    }
  }


















  private selectState(node: Node) {
    this.sectionServ.selectState(node.label);

    // let posObj = this._graph.getPositions(node.id);
    // let pos = posObj[node.id];
    // console.log(pos);
    
    // this._nodes.add([{ id: TEMP_ID, group: TERMINAL_GRP, x: pos.x, y: pos.y + 60, physics: false }]);
    // this._edges.add([{ id: TEMP_ID, from: node.id, to: TEMP_ID, dashes: true, physics: false }]);
  }

/*
  private selectNode(params) {
    if (params.nodes && params.nodes.length > 0) {
      let nodeId = params.nodes[0];
      let node: Node = this._nodes.get(nodeId);
      if (node.group == TERMINAL_GRP) {
        // this._graph.unselectAll();
        // this.openTerminalMenu(node, params.pointer.DOM);
      }
      else {
        this.selectState(node)
      }
    }
  }

  private deselectNode(params) {
    // remove temporary node and edge
    // this._nodes.remove(TEMP_ID);
    // this._edges.remove(TEMP_ID);
  }

  enableEditMode() {
    console.log('dddd');
    
    // this._graph.addEdgeMode();
    this._graph.editEdgeMode();
  }

  selectEdge(params) {
    setTimeout(_ => this._graph.editEdgeMode());
    // this._graph.editEdgeMode();
  }

  release(params) {
    // this._graph.disableEditMode();
    // this._graph.unselectAll();
  }
*/
}