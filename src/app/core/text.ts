import { Gadget } from './gadget';

export class Text extends Gadget {

  content: string;

  constructor() {
    super('text', 'Texto formatado');
  }
}