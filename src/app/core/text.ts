import { State } from './state';
import { Gadget } from './gadget';

export class Text extends Gadget {

  constructor(public content?: string) {
    super('text', 'Texto formatado');
  }

  get data() {
    return {
      content: this.contentToVar(this.content)
    }
  }

  /** Replace original Quill content (with <var>var_name</var>) with globals values (State.globals)  */
  private varToContent(html: string = '') {
    var varRegex = /<var>[\w]+<\/var>/g;
    var matches = html.match(varRegex);

    if (matches) {
      var vars = matches.map(match => match.substring(5, match.length - 6));
      var varsObj = {};
      for (let v of vars) {
        varsObj[v] = true; // to be unique
      }
      for (let v in varsObj) {
        if (State.globals[v] != undefined) {
          let reg = new RegExp(`<var>${v}</var>`, 'g');
          let rep = `<var name="${v}" class="player">${State.globals[v]}</var>`;
          html = html.replace(reg, rep);
        }
      }
    }
    return html;
  }

  /** Replace the content global values (State.globals) with the Quill content format (<var>var_name</var>).  */
  private contentToVar(html: string) {
    var varRegex = /<var name="(\w+)"[^<]*<\/var>/g;
    return html.replace(varRegex, '<var>$1</var>');
  }


  update() {
    console.log('updating...');
    // TODO crap solution (ACOX)
    let withVar = this.contentToVar(this.content);
    this.content = this.varToContent(withVar);
  }
  
}