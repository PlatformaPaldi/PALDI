import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';

import 'brace';
import 'brace/theme/eclipse';


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('editor') editor: AceEditorComponent;
  code: string;
  options: any = {
    printMargin: false
  };

  constructor() {
    this.code = '// some code';
  }

  ngAfterViewInit() {
    this.editor._editor.clearSelection();
  }
}