import { Component, OnInit, Input } from '@angular/core';
import { Gadget } from 'app/core/gadget';

@Component({
  selector: 'app-svg-board',
  templateUrl: './svg-board.component.html',
  styleUrls: ['./svg-board.component.css']
})
export class SvgBoardComponent implements OnInit {
  @Input() gadget: Gadget;

  constructor() { }

  ngOnInit() {
  }

  update(filename: string) {
    this.gadget['file'] = filename;
  }

}