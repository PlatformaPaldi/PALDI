import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-text-page-dialog',
  templateUrl: './text-page-dialog.component.html',
})
export class TextPageDialogComponent {
  title: string = '';
  placeHolder: string = '';
  name: string;
  varName: string;
  hint: string;

  constructor(public dialogRef: MdDialogRef<TextPageDialogComponent>) { }

  confirm() {
    this.dialogRef.close({
      name: this.name,
      varName: this.varName
    });
  }
}