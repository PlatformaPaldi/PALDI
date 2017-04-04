import { Gadget } from './gadget';

interface IOption {
  value: string;
  text: string;
}

export class Choice extends Gadget {
  answer: string = '';
  options: IOption[] = [];

  constructor() {
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
}