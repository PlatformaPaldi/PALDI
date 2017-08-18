import { Component, OnInit, Input } from '@angular/core';

import { Gadget } from 'app/core/gadget';
import { Login } from 'app/core/login';

@Component({
  selector: 'app-login',
  templateUrl: './login-board.component.html',
  styleUrls: ['./login-board.component.css']
})
export class LoginBoardComponent implements OnInit {

  @Input() gadget: Login;

  constructor() { }

  ngOnInit() {
  }


}
