import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { State } from 'app/core/state';

@Injectable()
export class AuthService {

  private user$: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user$ = firebaseAuth.authState;
    //this.firebaseAuth.auth.onAuthStateChanged(_ => '');
  }

  public getUser() {
    return this.user$;
  }

  private login(provider) {

    return this.firebaseAuth.auth.signInWithPopup(provider).then(_ => {
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
    this.firebaseAuth.auth.signOut();
    State.globals['user'] = '';
  }

  updateUser() {
    //State.globals['user'] = this.firebaseAuth.auth.currentUser.displayName;
    this.user$.subscribe(user => {
      State.globals['user'] = user.displayName;
    });
  }

}
