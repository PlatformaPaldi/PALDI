
export type GadgetType = 'input' | 'choice' | 'text';

export interface IGadget {
  type: GadgetType;
  description?: string;
}

export abstract class Gadget {
  constructor(public type: GadgetType, public description?: string) {}

  // abstract update method
  update() {}
}