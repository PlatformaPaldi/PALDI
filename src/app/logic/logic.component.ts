import { CodeEditorComponent } from './code-editor/code-editor.component';
import { State } from 'app/core/state';
import { StateService } from 'app/core/state.service';
import { BlockEditorComponent } from './block-editor/block-editor.component';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.scss']
})
export class LogicComponent implements OnInit {
  @ViewChild(CodeEditorComponent) codeEditor: CodeEditorComponent;
  state: State;
  selected: number;

  private tootipMsg: string[] = [
    'Altera para programação textual',
    'Altera para programação em blocos'
  ];

  constructor(private stateServ: StateService, private changeDetector: ChangeDetectorRef) {
    this.selected = 0;
    stateServ.current$.subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
  }

  toogleCodeMode() {
    this.selected = (this.selected + 1) % 2;
    if (this.selected == 1) {
      this.codeEditor.focus();
    }
  }
}