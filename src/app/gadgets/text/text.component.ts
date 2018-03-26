import { StateService } from 'app/core/state.service';
import { State } from 'app/core/state';
import { Text } from 'app/core/text';
import { Gadget } from 'app/core/gadget';
import { Component, OnInit, ViewChild, ElementRef, Input, ComponentRef, AfterViewInit } from '@angular/core';

import * as Quill from 'quill';

let Font = Quill.import('formats/font');
Font.whitelist = ['sans-serif', 'satisfy', 'roboto', 'josefin', 'arvo', 'macondo'];

let Inline: ObjectConstructor = Quill.import('blots/inline');

class VariableBlot extends Inline {
  static blotName = 'variable';
  static tagName = 'var';
}
Quill.register(VariableBlot);
Quill.register(Font, true);

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor: ElementRef;
  @Input() gadget: Text;
  @Input() edition: boolean;

  private quill: Quill.Quill;

  constructor(stateServ: StateService) {
    stateServ.current$.subscribe(() => {
      let withVar = this.contentToVar(this.gadget.content);
      this.gadget.content = this.varToContent(withVar);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.edition) {
      this.gadget.content = this.varToContent(this.gadget.content);
    }

    this.gadget.setReady();
  }

  setBoard(boardRef: ComponentRef<any>) {
    if (this.edition) {
      this.quill = new Quill(this.editor.nativeElement, {
        modules: {
          toolbar: boardRef.instance.toolbar.nativeElement
        },
        theme: 'snow'
      });
      if(!this.gadget.content) {
        this.gadget.content = '';
      }
      else {
        this.quill.clipboard.dangerouslyPasteHTML(this.contentToVar(this.gadget.content));
      }
      this.quill.on('text-change', (delta, oldDelta) => this.onTextChange());
    }
  }

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
        if (State.globals[v]) {
          let reg = new RegExp(`<var>${v}</var>`, 'g');
          let rep = `<var name="${v}" class="player">${State.globals[v]}</var>`;
          html = html.replace(reg, rep);
        }
      }
    }
    return html;
  }

  private contentToVar(html: string) {
    var varRegex = /<var name="(\w+)"[^<]*<\/var>/g;
    return html.replace(varRegex, '<var>$1</var>');
  }


  onTextChange() {
    let html = this.varToContent(this.editor.nativeElement.children[0].innerHTML);
    this.gadget.content = html;
  }


}
