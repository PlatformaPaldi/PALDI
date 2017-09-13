import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-pass-dialog',
  templateUrl: './pass-dialog.component.html',
  styleUrls: ['./pass-dialog.component.css']
})
export class PassDialog implements OnInit {

  book: string = "livro"
  pass: string;

  constructor(public dialogRef: MdDialogRef<PassDialog>) { }

  ngOnInit() {
  }

}
