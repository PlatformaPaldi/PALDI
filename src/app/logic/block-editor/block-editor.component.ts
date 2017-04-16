import { SectionService } from 'app/core/section.service';
import { StateService } from 'app/core/state.service';
import { State } from 'app/core/state';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';

declare const Blockly: any;

// import {} from './blocks';
// import {} from './stubs';
import toolbox from './toolbox';

@Component({
  selector: 'app-block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.css']
})
export class BlockEditorComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private workspace: any;
  state: State;

  constructor(private sectionServ: SectionService) {
    sectionServ.currentState$.subscribe(state => setTimeout(_ => {
      this.state = state;
      this.updateBlocks();
    }));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.workspace === undefined) {
      this.workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
      this.workspace.addChangeListener((event) => this.updateCode(event));
      this.updateBlocks();
    }
  }

  ngAfterViewChecked() {
    Blockly.svgResize(this.workspace);
  }

  private updateBlocks() {
    if (this.state && this.state.behavior.type == 'block') {
      this.workspace.clear();
      let dom = Blockly.Xml.textToDom(this.state.behavior.block);
      Blockly.Xml.domToWorkspace(dom, this.workspace);
    }
  }

  updateCode(event) {
    if (event.type != Blockly.Events.UI) {
      let dom = Blockly.Xml.workspaceToDom(this.workspace);
      let xml = Blockly.Xml.domToText(dom);
      this.state.behavior.block = xml;
      let code = Blockly.JavaScript.workspaceToCode(this.workspace);
      this.state.behavior.code = code;
    }
  }

}


// Blockly.JavaScript.workspaceToCode(workspace);