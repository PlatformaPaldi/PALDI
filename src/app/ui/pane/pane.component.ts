import { Component, OnInit, Input, ContentChild, HostBinding } from '@angular/core';
import { PaneContentComponent } from './pane-content.component';
import { PaneTitleComponent } from './pane-title.component';



@Component({
  selector: 'ui-pane',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      // display: flex;
      // flex-direction: column;
      // border: 1px solid #d5d5d5;
      // margin: -1px;
      // background-color: white;
      // height: 100%;
    }
  `]
})
export class PaneComponent implements OnInit {
  @HostBinding('style.height.px') paneHeight: number;
  @ContentChild(PaneTitleComponent) titleCmp: PaneTitleComponent;
  @ContentChild(PaneContentComponent) contentCmp: PaneContentComponent;

  @Input()
  set height(value: number) {
    this.paneHeight = value;
    
    if (this.contentCmp) {
      if (this.titleCmp) {
        value -= this.titleCmp.height;
      }
      this.contentCmp.height = value;
    }
  }

  constructor() { }

  ngOnInit() { }

}