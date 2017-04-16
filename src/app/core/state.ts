import { Subject } from 'rxjs/Subject';
import { Page } from './page';

declare const Blockly: any;

let doNothing = () => { }

export type StateType = 'content' | 'content-add' | 'intervention';

export interface IOutEdge {
  id?: number;  
  label: string;
  to: string;
}

export interface IBehavior {
  type: 'block' | 'code';
  code: string;
  block?: string;
  onEnter?: Function;
  onNext?: Function;
}

export interface IState {
  id: number;
  type: StateType;
  label: string;
  page: Page;
  outedges: IOutEdge[];
  behavior: IBehavior;
}

export class State implements IState {
  private static _idCount = 0;
  private static _states: State[] = [];  // array of existing states

  static globals: Object = {
    // name: 'André'
  };   // set of global variables

  /** Observable to emit events when the state needs to go to the next state */
  private _next = new Subject<State>();   // source
  next$ = this._next.asObservable();  // stream

  id: number = State._idCount;
  type: StateType = 'content';
  label: string = '_s' + State._idCount;
  page: Page = new Page();
  outedges: IOutEdge[] = [];
  behavior: IBehavior = {
    type: 'block',
    code: '',
    onEnter: doNothing,
    onNext: doNothing
  };

  constructor(state?: Partial<IState>) {
    if (state) {
      for (let k in state) {
        this[k] = state[k];
      }
      if (state.page) {
        this.page = new Page(state.page.gadgets);
      }
      if (state.behavior) {
        setTimeout(_ => this.updateBehavior());
      }
    }
    State._states.push(this);
    State._idCount++;
  }

  updateBehavior() {
    if (this.behavior.type == 'block') {
      if (this.behavior.block != undefined && this.behavior.block.length > 1) {
        let workspace = new Blockly.Workspace();
        let dom = Blockly.Xml.textToDom(this.behavior.block);
        Blockly.Xml.domToWorkspace(dom, workspace);
        this.behavior.code = Blockly.JavaScript.workspaceToCode(workspace);
      }
    }
    if (this.behavior.code) {
      let code = `
        (function(state, globals) {
          function onEnter() {};
          function onNext() {};
          ${ this.behavior.code }
          return {
            onEnter: onEnter,
            onNext: onNext
          }
        })(this, State.globals);
        `;
      let codeEval = eval(code);  // TODO check security risks
      this.behavior.onEnter = codeEval.onEnter;
      this.behavior.onNext = codeEval.onNext;
    }
  }

  next(edgeLabel?: string) {
    if (!edgeLabel && this.outedges.length > 0) {
      let len = this.outedges.length;
      let randomIndex = Math.floor(Math.random() * len);
      edgeLabel = this.outedges[randomIndex].label;
    }
    // let nextState = State.getStateByLabel(to);
    let edge = this.outedges.find(edge => edge.label == edgeLabel);
    if (edge) {
      let nextState = State.getStateByLabel(edge.to);
      if (nextState) {
        this._next.next(nextState);
        nextState.behavior.onEnter();
        nextState.page.update();
        return;
      }
    }
    // TODO if get here, send error: there is no outedge with the given 'to' label
  }

  addTransition(edge: IOutEdge) {
    this.outedges.push(edge);
  }

  getTransition(id: number) {
    return this.outedges.find(edge => edge.id == id);
  }

  removeTransition(id: number) {
    let index = this.outedges.findIndex(edge => edge.id == id);
    if (index >= 0) {
      this.outedges.splice(index, 1);
    }
  }

  static getStateByLabel(label: string) {
    return State._states.find(s => s.label == label);
  }

  static updateBehaviors() {
    for(let state of State._states) {
      state.updateBehavior();
    }
  }

  static getInitialState(): State {
    return State._states[0];
  }

  static getStates(): string[] {
    return State._states.map(s => s.label);
  }
}
