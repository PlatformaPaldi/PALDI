import { State } from './state';
import { Injectable } from '@angular/core';


// let s0 = new State({
//   label: 's0',
//   page: [
//     { type: 'input', data: {
//         value: '',
//         description: '',
//         help: ''
//       }
//     },
//     {
//       type: 'choice',
//       data: [
//         { value: 'a1', text: 'Opção 1' },
//         { value: 'a2', text: 'Opção 2' },
//         { value: 'a3', text: 'Opção 3' },
//       ]
//     },
//     { type: 'choice', data: [] },
//     { type: 'choice', data: [] }    
//   ],
//   outedges: [{ label: 'e0', to: 's1' }]
// });
// let s1 = new State({
//   label: 's1',
//   type: 'content-add',
//   outedges: [{ label: 'e1', to: 's2' }]
// });
// let s2 = new State({
//   label: 's2',
//   type: 'intervention',
//   outedges: [
//     { label: 'e2', to: 's0' },
//     { label: 'e3', to: 's1' }
//   ]
// });


@Injectable()
export class StateService {
  private _currentState: State;

  constructor() {
    this._currentState = new State();
  }

  next() {
    let len = this._currentState.outedges.length;
    let randomIndex = Math.floor(Math.random() * len);
    let nextLabel = this._currentState.outedges[randomIndex].to;

    this._currentState.behavior.onNext(); // TODO
    this._currentState = State.getStateByLabel(nextLabel);
    this._currentState.behavior.onEnter(); // TODO
  }

  get current(): Readonly<State> {
    return this._currentState;
  }



}