import { State, IState } from './state';

type OriginType = 'firebase' | 'json';

export interface ISection {
  title: string;
  states: State[];
  initialState: number;
  properties: Object;
  origin: OriginType;
}

export class Section implements ISection {
  title: string = '';
  states: State[] = [];
  properties: Object = {};
  initialState: number = 0;
  origin: OriginType = 'json';

  constructor(sectionData?: Partial<ISection>) {
    if (sectionData) {
      this.title = sectionData.title || 'default section';
      this.initialState = sectionData.initialState || 0;
      this.properties = sectionData.properties || {};
      if (Array.isArray(sectionData.states)) {
        this.states = sectionData.states.map(state => new State(this, state));
      }
    }
  }

  createState(stateData: IState): State {
    let state = new State(this, stateData);
    // TODO check id duplication
    this.states.push(state);
    return state;
  }

  removeState(state: State) {
    let index = this.states.findIndex(s => s.id == state.id);
    if (index >= 0) {
      this.states.splice(index, 1);
    }
    // remove all the transitions to the state
    for (let s of this.states) {
      let index = s.outedges.findIndex(edge => edge.to == state.label);
      while (index >= 0) {
        s.outedges.splice(index, 1);
        index = s.outedges.findIndex(edge => edge.to == state.label);
      }
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

  updateStateBehaviors() {
    State.globals = {};
    for (let state of this.states) {
      state.updateBehavior();
    }
  }

  toJson() {
    return JSON.stringify({
      title: this.title,
      initialState: this.initialState,
      states: this.states.map(state => {
        return {
          id: state.id,
          type: state.type,
          label: state.label,
          outedges: state.outedges.map(edge => {
            return {
              label: edge.label,
              to: edge.to
            }
          }),
          page: {
            gadgets: state.page.gadgets.map(gadget => {
              let gdt = gadget.data;
              gdt.type = gadget.type;
              return gdt;
            })
          },
          behavior: {
            type: state.behavior.type,
            code: state.behavior.code,
            block: state.behavior.block
          }
        }
      })
    });
  }

}
