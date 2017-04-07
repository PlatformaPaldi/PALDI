import { Subject } from 'rxjs/Subject';
import { Page } from './page';

let doNothing = () => { }

export type StateType = 'content' | 'content-add' | 'intervention';

export interface IOutEdge {
  label: string;
  to: string;
}

export interface IBehavior {
  code: string;
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
        this.updateBehavior();
      }
    }
    State._states.push(this);
    State._idCount++;
  }

  private updateBehavior() {
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

  next(to?: string) {
    if (!to && this.outedges.length > 0) {
      let len = this.outedges.length;
      let randomIndex = Math.floor(Math.random() * len);
      to = this.outedges[randomIndex].to;
    }
    let nextState = State.getStateByLabel(to);
    if (nextState) {
      this._next.next(nextState);
      nextState.behavior.onEnter();
    }
    else {
      // TODO send error: there is no outedge with the given 'to' label
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
}
