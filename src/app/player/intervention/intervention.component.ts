import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css'],
  animations: [
    trigger('visibilityState', [
      state('shown', style({ minHeight: '80px', maxHeight: '500px' })),
      state('hidden', style({ minHeight: '0px', maxHeight: '0px' })),
      state('collapsed', style({ minHeight: '0px', maxHeight: '80px' })),
      transition('* => shown', animate('400ms ease-in')),
      transition('* => hidden', animate('400ms ease-out')),
      transition('* => collapsed', animate('400ms ease-in')),
    ])
  ]
})
export class InterventionComponent implements OnInit {
  private collapsed = false;
  @Input() private visible: string = 'hidden';
  // @Output() private onNext = new EventEmitter();

  constructor() { }

  get isVisible() { return this.visible != 'hidden'; }
  show() {
    // this.height = 100;
    this.visible = 'shown';
    this.collapsed = false;
  }
  hide() {
    // this.height = 0;
    this.visible = 'hidden';
    this.collapsed = false;
  }
  collapse() {
    this.visible = 'collapsed';
    this.collapsed = true;
  }
  toggle() {
    if (this.isVisible)
      this.hide();
    else
      this.show();
  }

  ngOnInit() {
  }

}
