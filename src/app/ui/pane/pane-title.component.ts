import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-pane-title',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      padding: 0 15px 0 15px;
      align-items: center;    
      height: 48px;
      flex-direction: row;
      display: flex;
      // flex: 1 1 auto;
    }
  `]
})
export class PaneTitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get height(): number {
    return 48;
  }
}