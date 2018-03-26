import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { trigger, state, animate, transition, style } from '@angular/animations';

import { SectionService } from 'app/core/section.service';

@Component({
  selector: 'opcoes-menu',
  templateUrl: './opcoes-menu.component.html',
  styleUrls: ['./opcoes-menu.component.css'],
  animations: [
    trigger('visibilityState', [
      state('shown', style({ minHeight: '80px', maxHeight: '570px' })),
      state('hidden', style({ minHeight: '0px', maxHeight: '0px' })),
      state('collapsed', style({ minHeight: '0px', maxHeight: '80px' })),
      transition('* => shown', animate('400ms ease-in')),
      transition('* => hidden', animate('400ms ease-out')),
      transition('* => collapsed', animate('400ms ease-in')),
    ])
  ]
})
export class OpcoesMenuComponent implements OnInit {

  private collapsed = false;
  @Input() private visible: string = 'hidden';

  constructor(private location: PlatformLocation, private sectionService: SectionService) { }

  ngOnInit() {
  }

  continue() {
    this.sectionService.currentState.goToPage(this.sectionService.currentState.menuCallState);
  }

  exit() {
    this.location.back();
  }

  summary() {
    this.sectionService.currentState.goToPage("summary");
  }

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

}
