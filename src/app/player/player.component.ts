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

  contentState: State;
  interventionState: State;

  constructor(private stateServ: StateService) {
    stateServ.current$.subscribe(state => {
      if (state.type == 'content') {
        this.contentState = state;
        this.intervention.hide();
      }
      else if (state.type == 'intervention') {
        this.interventionState = state;
        this.intervention.show();
      }
    });
  }

  ngOnInit() {
  }

  nextState() {
    this.stateServ.next();
  }

  run() {
    console.log('run');
    State.updateBehaviors();
  }

}