import { Gadget } from './gadget';

export class Text extends Gadget {

  constructor(public content?: string) {
    super('text', 'Texto formatado');
  }
}