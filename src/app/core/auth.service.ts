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
        this.updateUser();
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
    this.app.auth().signOut();
    State.globals['user'] = '';
    this.user$ = null;
  }

  updateUser() {
    //State.globals['user'] = this.firebaseAuth.auth.currentUser.displayName;
    State.globals['user'] = this.user$.currentUser.displayName;

  }

}
