import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GadgetType } from "app/core/gadget";

@Component({
  selector: 'app-item-bar',
  templateUrl: './item-bar.component.html',
  styleUrls: ['./item-bar.component.css']
})
export class ItemBarComponent implements OnInit {
  @Output() addItem = new EventEmitter<GadgetType>();

  constructor() { }

  ngOnInit() {
  }

}