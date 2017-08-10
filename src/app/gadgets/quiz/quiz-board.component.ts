import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { Gadget } from 'app/core/gadget';
import { Quiz, IQuestion } from 'app/core/quiz';

@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent {
  private _newValue: string;
  public description: string = "";
  public element: any;
  private questions: IQuestion[] = [];

  @Input() gadget: Quiz;

  @ViewChild('newValue') private _newValueRef: ElementRef;

  constructor(private _http: Http, private db: AngularFireDatabase) {
    this.updateFile();
    this.loadQuestions();
  }

  private loadQuestions() {
    this._http
    .get('assets/server/questions2.json')
    .map(response => response.json())
    .subscribe(
      question => {
        this.gadget.clearQuestions();
        question.forEach(q => this.gadget.add({
          id: q.id,
          livro: q.livro,
          nivel: q.nivel,
          pergunta: q.pergunta,
          ajuda_pergunta: q.ajuda_pergunta,
          op_resp_1: q.op_resp_1,
          op_resp_2: q.op_resp_2,
          op_resp_3: q.op_resp_3,
          op_resp_4: q.op_resp_4,
          op_resp_5: q.op_resp_5,
          resp_certa: q.resp_certa
        }))
      },
      error => console.log("error " + error)
    );
  }

  private setSelectedQuestion(id) {
    this.gadget.setSelectedQuestion(id);
  }

  private addResult() {
      this._http
      .get('assets/server/questions.json')
      .map(response => response.json())
      .subscribe(
        question => {

          console.log("size");
          console.log(question[0]['description']);
          /*
          if(question[this._newValue] != null) {
            this.element = question[this._newValue];
            this.gadget.add({
              value: this._newValue,
              description: this.element.description,
              options: {
                a: this.element.options.a,
                b: this.element.options.b,
                c: this.element.options.c,
                d: this.element.options.d,
                e: this.element.options.e
              }
            });
            this._newValue = '';
            this._newValueRef.nativeElement.focus();

          } else {
            this._newValue = "";
          }*/
        },
        error => console.log("error " + error)
    );
  }


  private updateFile() {
    this.db.object('/questions')
    .subscribe(data => {
      //this._http.post("assets/server/questions2.json", data)
      //.subscribe(response => console.log("---" + response) );
      console.log("data");
      console.log(data);
    });
  }

  private remove() {
    //this.gadget.clear();
  }

  onBlur(index: number) {
    if (index == undefined) {
      if(this._newValue != undefined && this._newValue.length > 0) {
        this.addResult();
      }
    }
    else {
      let option = this.gadget.get(index);
      if(option.id == undefined || option.id.length == 0) {
        this.remove();
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('onKeyDown');
    console.log(this._newValue);

  }

  onKeyPress(event: KeyboardEvent) {
    console.log('onKeyUp');
    // console.log(event.key);
    console.log(this._newValue);


    if((event.key == 'Enter' || event.key == 'Tab') &&
        (this._newValue != undefined && this._newValue.length > 0)) {
      console.log('enter');
      this.addResult();
    }
  }
}
