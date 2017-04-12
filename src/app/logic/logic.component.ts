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
  @ViewChild(BlockEditorComponent) block: BlockEditorComponent;

  state: State;


  constructor(private stateServ: StateService) {
    stateServ.current$.subscribe(state => this.state = state);
  }

  ngOnInit() {

  }

  indexChange(e) {
    if (e == 1) { // second in the order (block)
      // this.block.injectBlockly();
    }
  }

}