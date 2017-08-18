import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  private user$: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user$ = firebaseAuth.authState;
  }

  public getUser() {
    return this.user$;
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.firebaseAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

}
