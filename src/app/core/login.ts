import { Gadget } from './gadget';

export class Login extends Gadget {

  public isGoogleLoginOn: boolean = false;

  constructor() {
    super('login', 'Adicionar login');
  }

  get isAnswered(): boolean {
    return true;
  }

  get data() {
    return '';
  }

}
