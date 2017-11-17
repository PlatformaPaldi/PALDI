import { Gadget } from './gadget';

export class Button extends Gadget {

  public label: string;
  public identifier: string;

  constructor(label: string = '', identifier: string = '') {
    super('button', 'Adicionar botão');
  }

  get isAnswered(): boolean {
    return true;
  }

  get data() {
    return {
      label: this.label,
      identifier: this.identifier
    };
  }

}
