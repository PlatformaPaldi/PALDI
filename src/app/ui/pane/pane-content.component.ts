import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-pane-content',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;

    }
  `]
})
export class PaneContentComponent implements OnInit {
  @HostBinding('style.height.px') _height: number;

  constructor() { }

  ngOnInit() {
  }

  set height(value: number) {
    this._height = value;
  }
}