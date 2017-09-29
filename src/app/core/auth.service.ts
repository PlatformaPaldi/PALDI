import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { State } from 'app/core/state';
import { SectionService } from 'app/core/section.service';

@Injectable()
export class AuthService {

  //private user$: Observable<firebase.User>;
  private user$;
  private app;

  constructor(private firebaseAuth: AngularFireAuth, private sectionService: SectionService) {
    //this.firebaseAuth.auth.onAuthStateChanged(_ => '');
  }

  public getUser() {
    return this.user$;
  }

  private login(provider) {

    this.app = this.sectionService.getApp();
    this.user$ = this.app.auth();

    return this.app.auth().signInWithPopup(provider).then(_ => {
        this.app.auth().onAuthStateChanged(user => {
          this.updateUser(user);
        });
    }).catch (err =>
      console.log("auth error: " + err)
    );

  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    return this.login(provider);
  }

  logout() {
    this.app = this.sectionService.getApp();
    this.app.auth().signOut().then(_ => {
        this.app.auth().onAuthStateChanged(user => {
          this.updateUser(user);
        });
    }).catch (err =>
      console.log("logout error: " + err)
    );
  }

  updateUser(user) {
    if(user) {
      //State.globals['user'] = this.user$.currentUser.displayName;
      State.globals['user'] = user.displayName;
    } else {
      State.globals['user'] = '';
      this.user$ = null;
    }

  }

}
