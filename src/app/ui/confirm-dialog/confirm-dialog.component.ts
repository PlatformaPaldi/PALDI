import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent{
  message = 'Confirma?'
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }
}
