import { Gadget } from './gadget';

interface IOption {
  value: string;
  text: string;
}

export class Choice extends Gadget {

  public value: string;
  public options: IOption[];

  constructor(options: IOption[] = []) {
    super('choice', 'Escolha de uma opção');
    this.options = [];
    options.forEach(option => this.options.push({
      value: option.value,
      text: option.text
    }));
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