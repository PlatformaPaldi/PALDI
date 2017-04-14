import { Component, OnInit } from '@angular/core';
import { StateService } from 'app/core/state.service';
import { State } from "app/core/state";
import { GadgetType } from "app/core/gadget";

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  state: State;
  selected: number;
  itemButtons: number;
  private _clickedOnGadget: boolean;
  private _clickedOnItem: boolean;

  constructor (private stateServ: StateService) {
    stateServ.current$.subscribe(state => setTimeout(_ => this.state = state));
  }

  ngOnInit() {
  }

  hide() {
    this.unselect();
    this.hideItems();
  }

  unselect() {
    if (!this._clickedOnGadget) {
      this.selected = undefined;
    }
    this._clickedOnGadget = false;
  }

  select(elmIndex: number) {
    this.selected = elmIndex;
    this._clickedOnGadget = true;
  }

  showItems(elmIndex: number) {
    this.itemButtons = elmIndex;
    this._clickedOnItem = true;
  }

  hideItems() {
    if (!this._clickedOnItem) {
      this.itemButtons = undefined;
    }
    this._clickedOnItem = false;
  }

  swapUp(index: number) {
    this.state.page.swapUp(index);
  }

  swapDown(index: number) {
    this.state.page.swapDown(index);
  }

  add(index: number, type: GadgetType) {
    this.state.page.add(index, type);
    this.hideItems();
    this.select(index);
  }

  delete(index: number) {
    this.state.page.delete(index);
  }

}
