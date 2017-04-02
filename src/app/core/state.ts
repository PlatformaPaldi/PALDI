import { Page } from './page';


let doNothing = () => { }

export type StateType = 'content' | 'content-add' | 'intervention';

export interface IOutEdge {
  label: string;
  to: string;
}

export interface IBehavior {
  onEnter: Function;
  onNext: Function;
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
  private static _states: State[] = [];

  id: number = State._idCount;
  type: StateType = 'content';
  label: string = 's' + State._idCount;
  page: Page = new Page();
  outedges: IOutEdge[] = [];
  behavior: IBehavior = {
    onEnter: doNothing,
    onNext: doNothing
  };

  constructor(config?: Partial<IState>) {
    for (let k in config) {
      this[k] = config[k];
    }
    State._states.push(this);
    State._idCount++;
  }

  static getStateByLabel(label: string) {
    return State._states.find(s => s.label == label);
  }
}
