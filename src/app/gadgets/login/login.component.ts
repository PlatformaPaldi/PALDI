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
  public user: string;
  public isUserLoggedIn: boolean = false;

  constructor(private auth: AuthService, private sectionService: SectionService) {
    this.user = "";
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.auth.login();
    this.auth.getUser().subscribe(
      user => {
        if(user) {
          this.user = user.displayName;
          this.isUserLoggedIn = true;
          State.globals['user'] = user.displayName;
          //this.sectionService.nextState();
        } else {
          this.user = "";
          this.isUserLoggedIn = false;
        }
      }
    )
  }

  logoutGoogle() {
    this.auth.logout();
    State.globals['user'] = '';
  }

}
