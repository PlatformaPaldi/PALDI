import { StateService } from './core/state.service';
import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from "@angular/material";
import { PlayerComponent } from "app/player/player.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _player: MdDialogRef<PlayerComponent>;
  
  private states: string[] = [];

  constructor(private stateServ: StateService, private dialog: MdDialog) {
    stateServ.current$.subscribe(_ => setTimeout(_ => {
      this.states = stateServ.getStates();
    }));
  }

  showState(label: string) {
    this.stateServ.changeTo(label);
  }

  openPlayer() {
    this._player = this.dialog.open(PlayerComponent);
    // ACOX --> a way to remove the square border on the smartphone
    setTimeout(_ => {
      let elm = document.getElementsByClassName('mat-dialog-container')[0];
      elm['style'] = 'border-radius: 30px; padding: 0';
    });
    // this._player.afterClosed().subscribe(option => {
    //   this.openSplash();
    // });
  }


}
