import { State } from 'app/core/state';
import { StateService } from 'app/core/state.service';
import { BlockEditorComponent } from './block-editor/block-editor.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.scss']
})
export class LogicComponent implements OnInit {
  state: State;
  selected = 0;

  constructor(private stateServ: StateService) {
    stateServ.current$.subscribe(state => setTimeout(_ => this.state = state));
  }

  ngOnInit() {
  }

  indexChange(e) {
    if (e == 1) { // second in the order (code)
    }
  }

}