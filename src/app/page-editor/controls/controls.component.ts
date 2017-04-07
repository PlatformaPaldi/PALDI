import { ChoiceBoardComponent } from './../../gadgets/choice/choice-board.component';
import { GadgetService } from 'app/gadgets/gadget.service';
import { Component, OnInit, Input, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Gadget } from "app/core/gadget";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  providers: [ GadgetService ]
})
export class ControlsComponent implements OnInit {
  @Input() show: boolean;
  @Input() gadget: Gadget;
  @Input() edition: boolean = false;

  @Output() onUp = new EventEmitter();
  @Output() onDown = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  @ViewChild('boardHolder', { read: ViewContainerRef })
  boardHolder: ViewContainerRef;

  @ViewChild('gadgetHolder', { read: ViewContainerRef })
  gadgetHolder: ViewContainerRef;
  
  constructor(private gadgetServ: GadgetService) { }

  ngOnInit() {
    this.gadgetServ.createComponent(this.gadget, this.edition, this.gadgetHolder, this.boardHolder);
  }

}