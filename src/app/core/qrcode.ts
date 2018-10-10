import { Gadget } from './gadget';

export class Qrcode extends Gadget {

  //public value: string;
  
  constructor() {
    super('qrcode', 'Leitor de qrcode');

    //this.value = (value ? value : '');
  }

  get isAnswered(): boolean {
    return true;
  }

  get data() {
    return {
      
    };
  }

}
