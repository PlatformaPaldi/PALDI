import { ContactDialogComponent } from './../../ui/contact-dialog/contact-dialog.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() logo: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Output() select = new EventEmitter<string>();

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openContact() {
    this.dialog.open(ContactDialogComponent);
  }

}