import { Page } from './page'

export type GadgetType = 'input' | 'choice' | 'text' | 'svg' | 'quiz' | 'login' | 'button';

export interface IGadget {
  type: GadgetType;
  description?: string;
}

export abstract class Gadget {

  ready: boolean;

  constructor(public type: GadgetType, public description?: string) {
    this.ready = false;
  }

  // abstract update method
  update() {}

  abstract get data();

  setReady() {
    this.ready = true;
  }

  isReady(page: Page, index: number) {

    if(index == 0 && page.gadgets[0].ready) {
       return true;
    }

    for(var i = 0; i < index; i++) {
      if(!page.gadgets[i].ready) {
        return false;
      }
    }

    return true;
  }
}
