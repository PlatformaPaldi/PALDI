import { StateService } from './core/state.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private states: string[] = [];

  constructor(private stateServ: StateService) {
    stateServ.current$.subscribe(_ => {
      this.states = stateServ.getStates();
    });
  }

  showState(label: string) {
    this.stateServ.changeTo(label);
  }

  toggleLogic() {
    
  }
}
