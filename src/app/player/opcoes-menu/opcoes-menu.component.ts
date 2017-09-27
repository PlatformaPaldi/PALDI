import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common'

import { SectionService } from 'app/core/section.service';

@Component({
  selector: 'opcoes-menu',
  templateUrl: './opcoes-menu.component.html',
  styleUrls: ['./opcoes-menu.component.css']
})
export class OpcoesMenuComponent implements OnInit {

  constructor(private location: PlatformLocation, private sectionService: SectionService) { }

  ngOnInit() {
  }

  continuar() {
    this.sectionService.currentState.goToPage(this.sectionService.currentState.menuCallState);
  }

  sair() {
    this.location.back();
  }

}
