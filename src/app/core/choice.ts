import { Gadget } from './gadget';

interface IOption {
  value: string;
  text: string;
}

export class Choice extends Gadget {

  public value: string;

  constructor(public options: IOption[] = []) {
    super('choice', 'Escolha de uma opção');
  }

  add(option: IOption) {
    this.options.push(option);
  }

  delete(index: number) {
    this.options.splice(index);
  }

  get(index: number) {
    return this.options[index];
  }

  get isAnswered(): boolean {
    return this.value != undefined && this.value.length > 0;
  }
}