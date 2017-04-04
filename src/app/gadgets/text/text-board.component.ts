import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Gadget } from 'app/core/gadget';

@Component({
  selector: 'app-text-board',
  templateUrl: './text-board.component.html',
  styleUrls: ['./text-board.component.css']
})
export class TextBoardComponent implements OnInit {
  @Input() gadget: Gadget;
  @ViewChild('toolbar') toolbar: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}