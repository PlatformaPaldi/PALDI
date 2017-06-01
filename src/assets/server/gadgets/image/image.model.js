

import { Gadget } from './gadget';

export class Input extends Gadget {
  value = '';
  info = '';
  help = '';

  constructor() {
    super('input', 'Entrada de dados');
  }

  isAnswered() {
    return this.value != undefined && this.value.length > 0;
  }

  update() {

  }

  getData() {
    return {
      value: this.value,
      info: this.info,
      help: this.help
    }
  }

}
