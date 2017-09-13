import { Gadget } from './gadget';

export class Login extends Gadget {

  public isGoogleLoginOn: boolean = false;
  public isUserLoggedIn: boolean = false;

  constructor(isGoogleLoginOn ?: boolean) {
    super('login', 'Adicionar login');

    if(isGoogleLoginOn) {
      this.isGoogleLoginOn = true;
    }

  }

  get isAnswered(): boolean {
    return this.isUserLoggedIn;
  }

  get data() {
    return {
      isGoogleLoginOn: this.isGoogleLoginOn
    };
  }

}
