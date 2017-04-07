import { Component, OnInit, Input } from '@angular/core';
import { Choice } from "app/core/choice";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  @Input() gadget: Choice;
  // answer: string;

  constructor() {
  }

  ngOnInit() {
  }

}