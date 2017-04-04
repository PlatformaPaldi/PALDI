import { Text } from 'app/core/text';
import { Gadget } from 'app/core/gadget';
import { Component, OnInit, ViewChild, ElementRef, Input, ComponentRef } from '@angular/core';

import * as Quill from 'quill';

let Font = Quill.import('formats/font');
Font.whitelist = ['sans-serif', 'satisfy', 'roboto', 'josefin', 'arvo', 'macondo'];
Quill.register(Font, true);


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @ViewChild('editor') editor: ElementRef;
  @Input() gadget: Text;
  @Input() edition: boolean;

  private quill: Quill.Quill;

  constructor() { }

  ngOnInit() {
    // let toolbar = [
    //   [{ header: [1, 2, false] }],
    //   ['bold', 'italic', 'underline'],
    //   [{ 'font': [] }],
    //   // [{ 'font': ['sans-serif', 'satisfy', 'roboto', 'josefin', 'arvo', 'macondo'] }],
    //   [{ 'align': [] }],
    //   [{ list: 'ordered' }, { list: 'bullet' }],
    //   [{ 'color': [] }, { 'background': [] }],
    // ];

    // this.quill = new Quill(this.editor.nativeElement, {
    //   modules: {
    //     toolbar: toolbar
    //   },
    //   theme: 'snow'
    // });
  }

  setBoard(boardRef: ComponentRef<any>) {
    if (this.edition) {
      this.quill = new Quill(this.editor.nativeElement, {
        modules: {
          toolbar: boardRef.instance.toolbar.nativeElement
        },
        theme: 'snow'
      });
      this.quill.on('text-change', () => {
        this.gadget.content = this.editor.nativeElement.children[0].innerHTML;
      });
    }

  }


}