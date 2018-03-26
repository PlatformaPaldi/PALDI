import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-pane-tools',
  template: `
    <div class="toolbar">
      <div class="toolfill"></div>
      <ng-content></ng-content>
    </div>
    `,
  styles: [`
    :host {
      width: 100%;
    }
    .toolbar {
      display: flex;
      align-items: center;
    }
    .toolfill {
      flex-grow: 1;
    }
  `]
})
export class PaneToolsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}