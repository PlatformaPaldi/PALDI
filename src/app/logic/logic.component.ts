import { SectionService } from 'app/core/section.service';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { State } from 'app/core/state';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor(private sectionServ: SectionService) {
    this.selected = 0;
    sectionServ.currentState$.subscribe(state => {
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