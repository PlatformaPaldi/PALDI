import { State } from './state';

export interface ISection {
  title: string;
  states: State[];
  initialState: number;
  properties: Object;
}

export class Section implements ISection {
  title: string;
  states: State[];
  properties: Object;
  initialState: number;

  constructor(sectionData?: Partial<ISection>) {
    if (sectionData) {
      this.title = sectionData.title || 'default section';
      this.initialState = sectionData.initialState || 0;
      this.properties = sectionData.properties || {};
      if (Array.isArray(sectionData.states)) {
        this.states = sectionData.states.map(state => new State(state));
      }
    }
  }

  addState(state: State) {
    // TODO check id duplication
    this.states.push(state);
  }

  removeState(state: State) {
    let index = this.states.findIndex(s => s.id == state.id);
    if (index >= 0) {
      this.states.splice(index, 1);
    }
  }

  getStateByLabel(label: string) {
    return this.states.find(s => s.label == label);
  }

  getStateById(id: number) {
    return this.states.find(s => s.id == id);
  }

  getInitialState() {
    return this.getStateById(this.initialState);
  }



}