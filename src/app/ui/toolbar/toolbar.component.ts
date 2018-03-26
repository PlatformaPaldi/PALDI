import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @HostBinding('style.height.px')
  @Input() height: number;

  constructor() { }

  ngOnInit() {
  }

}