import { InterventionComponent } from './intervention/intervention.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'app/core/state.service';
import { State } from "app/core/state";
import { ISlimScrollOptions } from 'ng2-slimscroll';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('scroll') scrollRef: ElementRef;
  @ViewChild(InterventionComponent) intervention: InterventionComponent;

  height: number;
  width: number;

  contentState: Readonly<State>;
  interventionState: Readonly<State>;

  constructor(private stateServ: StateService) {
    stateServ.current$.subscribe(_ => setTimeout(_ => this.updateInternalState()));
  }

  ngOnInit() {
    this.run();
  }

  nextState() {
    this.stateServ.next();
  }

  private updateInternalState() {
    let state = this.stateServ.current;
    if (state.type == 'content') {
      this.contentState = state;
      this.intervention.hide();
    }
    else if (state.type == 'intervention') {
      this.interventionState = state;
      this.intervention.show();
    }
  }

  run() {
    let start = this.stateServ.initial;
    if (start) {
      State.updateBehaviors();
      this.stateServ.changeTo(start.label);
      // this.updateInternalState();
    }
  }

}