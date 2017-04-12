import { Gadget } from './gadget';

export class Input extends Gadget {
  // value: string= '';
  // info: string= '';
  // help: string= '';

  constructor(public value = '', public info = '', public help = '') {
    super('input', 'Entrada de dados');
  }

  get isAnswered(): boolean {
    return this.value != undefined && this.value.length > 0;
  }
}