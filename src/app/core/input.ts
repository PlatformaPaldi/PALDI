import { Gadget } from './gadget';

export class Input extends Gadget {
  value: string= '';
  description: string= '';
  help: string= '';

  constructor() {
    super('input');
  }
}