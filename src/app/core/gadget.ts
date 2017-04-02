
export type GadgetType = 'input' | 'choice' | 'text';

export abstract class Gadget {
  constructor(public type: GadgetType) {}
}