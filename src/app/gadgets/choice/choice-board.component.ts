import { Component, OnInit, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Gadget } from 'app/core/gadget';
import { Choice } from "app/core/choice";

@Component({
  selector: 'app-choice-board',
  templateUrl: './choice-board.component.html',
  styleUrls: ['./choice-board.component.scss']
})
export class ChoiceBoardComponent {
  private _newValue: string;
  private _newText: string;

  @Input() gadget: Choice;

  @ViewChild('newValue') private _newValueRef: ElementRef;

  constructor() { }

  private addOption() {
    this.gadget.add({
      value: this._newValue,
      text: this._newText
    });
    this._newValue = '';
    this._newText = '';
    this._newValueRef.nativeElement.focus();
  }

  private removeOption(index: number) {
    this.gadget.delete(index);
  }

  onBlur(index: number) {
    if (index == undefined) {
      if ((this._newValue != undefined && this._newValue.length > 0) &&
          (this._newText != undefined && this._newText.length > 0)) {
        this.addOption();
      }
    }
    else {
      let option = this.gadget.get(index);
      if ((option.value == undefined || option.value.length == 0) &&
          (option.text == undefined || option.text.length == 0)) {
        this.removeOption(index);
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('onKeyDown');
    console.log(this._newValue);
    console.log(this._newText);
    
  }

  onKeyPress(event: KeyboardEvent) {
    console.log('onKeyUp');
    // console.log(event.key);
    console.log(this._newValue);
    console.log(this._newText);
    

    if ((event.key == 'Enter' || event.key == 'Tab') &&
        (this._newValue != undefined && this._newValue.length > 0) &&
        (this._newText != undefined && this._newText.length > 0)) {
      this.addOption();
    }
  }

}