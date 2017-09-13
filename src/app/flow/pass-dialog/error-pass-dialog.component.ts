import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-pass-dialog',
  template: `
    <md-dialog-content>
      <h2 md-dialog-title>Senha inválida</h2>
    </md-dialog-content>
    <md-dialog-actions>
      <button md-raised-button color="primary" (click)="dialogRef.close()">Ok</button>
    </md-dialog-actions>
`
  //styleUrls: ['./pass-dialog.component.css']
})
export class ErrorPassDialog implements OnInit {

  constructor(public dialogRef: MdDialogRef<ErrorPassDialog>) { }

  ngOnInit() {
  }

}
