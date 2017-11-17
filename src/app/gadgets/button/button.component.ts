import { Component, OnInit, Input } from '@angular/core';

import { Button } from 'app/core/button';
import { SectionService } from 'app/core/section.service';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() gadget: Button;

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gadget.setReady();
  }

  updateTouch() {
    this.sectionService.currentState.behavior.onTouch(this.gadget.identifier);
  }
}
