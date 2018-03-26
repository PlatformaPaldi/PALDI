import { Component, OnInit, Input } from '@angular/core';

import { Button } from 'app/core/button';

@Component({
  selector: 'app-button-board',
  templateUrl: './button-board.component.html',
  styleUrls: ['./button-board.component.css']
})
export class ButtonBoardComponent implements OnInit {

  @Input() gadget: Button;

  constructor() { }

  ngOnInit() {
  }

  updateLabel(label: string) {
    this.gadget.label = label;
  }

  updateIdentifier(identifier: string) {
    this.gadget.identifier = identifier;
  }
}
