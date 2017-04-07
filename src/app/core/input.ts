import { Gadget } from './gadget';

export class Input extends Gadget {
  // value: string= '';
  // description: string= '';
  // help: string= '';

  constructor(public value = '', public description = '', public help = '') {
    super('input', 'Entrada de dados');
  }
}