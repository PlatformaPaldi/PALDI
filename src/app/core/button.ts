import { Gadget } from './gadget';

export class Button extends Gadget {

  public label: string;
  public identifier: string;
  public align: string;

  constructor(label: string = '', identifier: string = '', align: string = '') {
    super('button', 'Adicionar botão');

    this.label = (label ? label : '');
    this.identifier = (identifier ? identifier : '');
    this.align = (align ? align : '');
  }

  get isAnswered(): boolean {
    return true;
  }

  get data() {
    return {
      label: this.label,
      identifier: this.identifier,
      align: this.align
    };
  }

}
