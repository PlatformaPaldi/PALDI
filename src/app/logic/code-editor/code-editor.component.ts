import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';

import 'brace';
import 'brace/theme/eclipse';
import { State } from "app/core/state";
import { StateService } from "app/core/state.service";

declare var droplet;

import commandPalette from './commands';



@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor: AceEditorComponent;
  // @ViewChild('droplet') dropletRef: ElementRef;
  droplet;

  state: State;

  private _code: string;
  @Input() get code() { return this._code; }
  @Output() codeChange = new EventEmitter<string>();
  set code(rawCode: string) {
    this._code = rawCode;
    this.codeChange.emit(this._code);
  }

  options: any = {
    printMargin: false,
    readOnly: true
  };

  constructor() {
  }

  focus() {
    this.editor.getEditor().clearSelection();
    this.editor.getEditor().focus();
  }

  // constructor(private stateServ: StateService) {
    // stateServ.current$.subscribe(state => setTimeout(_ => {
    //   this.state = state;
    // }));
  // }

/*
Funções usadas com o droplet
    dropletEditor.setFontFamily("Source Code Pro");
    dropletEditor.setFontSize(15);
    dropletEditor.setPaletteWidth(250);
    dropletEditor.setTopNubbyStyle(0, '#1e90ff');
    dropletEditor.on('parseerror', function(e) {
      fireEvent('parseerror', [pane, e]);
    });
    dropletEditor.setEditorState(useblocks);  // useblocks: boolean
    dropletEditor.setValue(text);
    dropletEditor.on('changepalette', function() {
      $('.droplet-hover-div').tooltipster({position: 'right', interactive: true});
    });

  dropletEditor.on('selectpalette', function(p) {
    fireEvent('selectpalette', [pane, p]);
  });
  dropletEditor.on('pickblock', function(p) {
    fireEvent('pickblock', [pane, p]);
  });

  dropletEditor.on('linehover', function(ev) {
    fireEvent('icehover', [pane, ev]);
  });

  dropletEditor.clearLineMarks();

  dropletEditor.on('change', function() {
  });

  dropletEditor.on('toggledone', function() {
  });
======================================

setMode(mode, modeOptions?) --> como no construtor
getMode()   -> retorna apenas 'mode'
[set|get]ReadOnly   --> bool
resize[Text|Block]Mode()
resizePalette()
reize()


Editor::toggleBlocks(callback)


*/


  ngOnInit() {
    // this.droplet = new droplet.Editor(this.editor.getEditor(), commandPalette);
    // this.droplet.toggleBlocks();
    // this.droplet.on('keydown', () => {
    //   console.log('keydown');
      
    //   this.state.behavior.code = this.droplet.getValue();
    // })
    // this.droplet.setEditorState(false);
  }

  ngAfterViewInit() {
    // this.droplet.redrawMain();
    // this.editor.getEditor().clearSelection();
    this.editor.getEditor().$blockScrolling = Infinity;
  }

  toggleCodeMode() {
    // this.droplet.toggleBlocks();
  }
}