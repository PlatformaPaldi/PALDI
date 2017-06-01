import { Gadget } from './gadget';

export class Svg extends Gadget {

  constructor(public file:string = 'assets/server/casa.svg') {
    super('svg', 'Imagem vetorial');
  }

  get data() {
    return {
      file: this.file
    }
  }

}