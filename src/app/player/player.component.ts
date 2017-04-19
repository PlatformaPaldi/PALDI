import { Section } from 'app/core/section';
import { SectionService } from 'app/core/section.service';
import { InterventionComponent } from './intervention/intervention.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'app/core/state.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { State } from 'app/core/state';


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
  error: string;

  section: Section;
  currentState: Readonly<State>;
  contentState: Readonly<State>;
  interventionState: Readonly<State>;
  private subscription: Subscription;  // to listen to state transitions (onNext())

  constructor(private sectionServ: SectionService) {
  }

  ngOnInit() {
    this.section = this.sectionServ.current;
    this.run();
  }

  nextState() {
    if (this.currentState && this.currentState.behavior.onNext) {
      this.currentState.behavior.onNext();
    }    
  }

  private updateInternalState(state: State) {
    if (state) {
      this.currentState = state; // save the reference to call 'onNext()'

      // call behavior and update page elements
      if (state.behavior.onEnter) {
        state.behavior.onEnter();
      }
      state.page.update();

      console.log(State.globals);
      
      
      // set up the correct var to in the player
      if (state.type == 'content') {
        this.contentState = state;
        this.intervention.hide();
      }
      else if (state.type == 'intervention') {
        this.interventionState = state;
        this.intervention.show();
      }
      // remove the event subscription from the previous event and creates a new one with the new event.
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = state.next$.subscribe(s => this.updateInternalState(s));
    }
    else {
      // TODO the book end up in a final state
      // what to do: close the player? or show a pre-defined page
      console.log('book finished');
      
    }
  }


  run() {
    if (this.section) {
      let start = this.section.getInitialState();
      if (start) {
        this.section.updateStateBehaviors(); // compile
        this.updateInternalState(start);
        this.sectionServ.save();
      }
      else {
        this.error = 'Página inicial não definida';
      }
    }
  }

}