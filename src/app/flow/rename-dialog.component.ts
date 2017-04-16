import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';


@Component({
  selector: 'rename-dialog',
  templateUrl: './rename-dialog.component.html',
  // styleUrls: ['./rename-dialog.component.scss']
})
export class RenameDialog {
  message: string = 'Novo nome';
  label: string;
  constructor(public dialogRef: MdDialogRef<RenameDialog>) { }
}
