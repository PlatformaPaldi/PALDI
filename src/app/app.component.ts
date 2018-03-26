import { SectionService } from 'app/core/section.service';
import { State } from 'app/core/state';
import { StateService } from './core/state.service';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog } from "@angular/material";
import { PlayerComponent } from "app/player/player.component";
import { PlatformLocation } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  bookTitle = 'Livro';
  sectionTitle = 'Section';

  private _player: MdDialogRef<PlayerComponent>;
  private state: State;
  private states: string[] = [];

  menuCallState: string;

  constructor(private sectionServ: SectionService, private dialog: MdDialog, location: PlatformLocation) {
    sectionServ.current$.subscribe(section => setTimeout(_ => this.bookTitle = section.title));
    sectionServ.currentState$.subscribe(state => setTimeout(_ => this.state = state));

    location.onPopState(() => {

      if(sectionServ.currentState.label != 'menu') {
        this.menuCallState = sectionServ.currentState.label;
        sectionServ.currentState.callMenu();
        sectionServ.currentState.menuCallState = this.menuCallState;
        location.pushState(null, null, '');
      } else {
        location.back();
      }

    });
  }

  ngOnInit() {
    setTimeout(_ => this.sectionServ.reset());
  }

  openPlayer() {
    this._player = this.dialog.open(PlayerComponent);
    // ACOX --> a way to remove the square border on the smartphone
    setTimeout(_ => {
      let elm = document.getElementsByClassName('mat-dialog-container')[0];
      elm['style'] = 'border-radius: 30px; padding: 0';
    });
  }

  save() {
    this.sectionServ.save();
  }

}
