import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';

import 'brace';
import 'brace/theme/eclipse';
import { State } from "app/core/state";
import { StateService } from "app/core/state.service";


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('editor') editor: AceEditorComponent;

  state: State;

  // private _code: string;
  // @Input() get code() { return this._code; }
  // @Output() codeChange = new EventEmitter<string>();
  // set code(rawCode: string) {
  //   this._code = rawCode;
  //   this.codeChange.emit(this._code);
  // }

  options: any = {
    printMargin: false
  };

  constructor(private stateServ: StateService) {
    stateServ.current$.subscribe(state => {
      // state.updateBehavior();  // update onEnter() and onNext() before changing the state
      this.state = state;
    });
  }

  ngAfterViewInit() {
    this.editor.getEditor().clearSelection();
    this.editor.getEditor().$blockScrolling = Infinity;
  }
}