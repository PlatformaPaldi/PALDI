import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  @ViewChild('editor') editor: ElementRef;
  code: string;
  instance: CodeMirror.Editor;
  editorOpts = {
    mode: 'javascript',
    lineNumbers: true,
    matchBrackets: true,
    theme: 'mbo',
    viewportMargin: Infinity
  };

  constructor() {
    this.code = '// some code';
  }

  ngOnInit() {
    this.instance = CodeMirror.fromTextArea(this.editor.nativeElement, this.editorOpts);
    this.updateEditor();
    this.instance.on('change', () => {
      this.code = this.instance.getValue();
    });
  }

  onFocus() {

  }

  onBlur() {

  }

  updateEditor() {
    this.instance.setValue(this.code);
  }
  
}