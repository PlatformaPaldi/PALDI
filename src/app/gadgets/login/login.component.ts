import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from 'app/core/auth.service';
import { SectionService } from 'app/core/section.service';
import { Gadget } from 'app/core/gadget';
import { Login } from 'app/core/login';
import { State } from 'app/core/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() gadget: Login;
  public isUserLoggedIn: boolean = false;

  constructor(private auth: AuthService, private sectionService: SectionService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gadget.setReady();
  }

  loginGoogle() {
    this.auth.loginWithGoogle().then(_ => {

      this.auth.getUser().subscribe(
        user => {
          if(user) {
            this.gadget.isUserLoggedIn = true;
          } else {
            this.gadget.isUserLoggedIn = false;
          }
        }
    )})
  }

  logoutGoogle() {
    this.auth.logout();
  }

}
