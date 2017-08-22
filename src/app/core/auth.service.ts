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

  login() {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.firebaseAuth.auth.signInWithPopup(provider).then(_ =>{
        State.globals['user'] = this.firebaseAuth.auth.currentUser.displayName;
    }).catch (err =>
      console.log("auth error")
    );
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    State.globals['user'] = '';
  }

}
