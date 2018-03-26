import { State } from './state';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpUtils } from '../common/http-utils';

const url = 'assets/server/states.json';

@Injectable()
export class StateService {
  private _currentState: State;
  private _subscription: Subscription;

  /** Observable to emit events when the current state changes */
  private _currentSource = new Subject<State>();   // source
  current$ = this._currentSource.asObservable();   // stream

  constructor(private _http: Http) {
    this.load();
  }

  load() {
    // this._http.get(url)
    //   .map(HttpUtils.extractData)
    //   .catch(HttpUtils.handleError)
    //   .subscribe(
    //     data => {
    //       let stateJson = data as State[];
    //       if (stateJson.length > 0) {
    //         let stateObjs = stateJson.map(state => new State(state));
    //         this.changeState(stateObjs[0]); // initial state
    //       }
    //     },
    //     error => {
    //       console.log('error: ', error);
    //     }
    //   );    
  }

  private changeState(newState: State) {
    // changes the current state and emits an event with the new changed state.
    this._currentState = newState;
    this._currentSource.next(this._currentState);

    // remove the event subscription from the previous event and creates a new one with the new event.
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._subscription = newState.next$.subscribe(s => this.changeState(s));
  }

  next() {
    if (this.current.behavior.onNext) {
      this.current.behavior.onNext();
    }
  }

  get current(): Readonly<State> {
    return this._currentState;
  }

  // get initial(): Readonly<State> {
  //   return State.getInitialState();
  // }

  // changeTo(stateLabel: string) {
  //   let state = State.getStateByLabel(stateLabel);
  //   if (state) {
  //     this.changeState(state);
  //   }
  // }

  // getStates(): string[] {
  //   return State.getStates();
  // }

}