import { Component, OnInit, Input } from '@angular/core';

import { Gadget } from 'app/core/gadget';
import { Quiz } from 'app/core/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() gadget: Quiz;
  private isHelpOn: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isHelpOn = false;
  }

  ngAfterViewInit() {
    this.gadget.setReady();
  }

  setGadgetValue(option: string) {
    if(option == this.gadget.selectedQuestion.resp_certa) {
       this.gadget.value = this.gadget.transitionRight;
    } else {
       this.gadget.value = this.gadget.transitionWrong;
    }
  }

  helpDisplay() {
    this.isHelpOn = !this.isHelpOn;
  }

}
