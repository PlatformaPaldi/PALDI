import { Component, OnInit, Input } from '@angular/core';
import { Gadget } from 'app/core/gadget';

@Component({
  selector: 'app-input-board',
  templateUrl: './input-board.component.html',
  styleUrls: ['./input-board.component.css']
})
export class InputBoardComponent implements OnInit {
  @Input() gadget: Gadget;

  constructor() { }

  ngOnInit() {
  }

}