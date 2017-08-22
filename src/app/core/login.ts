import { Gadget } from './gadget';

export class Login extends Gadget {

  public isGoogleLoginOn: boolean = false;
  public isUserLoggedIn: boolean = false;

  constructor() {
    super('login', 'Adicionar login');
  }

  get isAnswered(): boolean {
    return this.isUserLoggedIn;
  }

  get data() {
    return '';
  }

}
