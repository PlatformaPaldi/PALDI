import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.css']
})
export class NextButtonComponent {
  @Input() visible: boolean = true;
  @Output() onNext = new EventEmitter();

  constructor() { }

  show() { this.visible = true; }
  hide() { this.visible = false; }
  onClick() { this.onNext.emit(); }
}