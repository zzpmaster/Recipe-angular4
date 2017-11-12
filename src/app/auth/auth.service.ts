import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthAction from './store/auth.action';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  // deprecated
  token: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  // deprecated 被 effects取代
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.store.dispatch(new AuthAction.Singup());
        firebase.auth().currentUser.getToken().then((token: string) => {
          this.store.dispatch(new AuthAction.SetToken(token));
          this.router.navigate(['/']);
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
  // deprecated 被 effects取代 
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new AuthAction.Singin());
        firebase.auth().currentUser.getToken().then((token: string) => {
          // this.token = token;
          this.store.dispatch(new AuthAction.SetToken(token));
          this.router.navigate(['/']);
        });
      })
      .catch(error => {
        console.log(error)
      });
  }

  logout() {
    firebase.auth().signOut();
    // this.store.dispatch(new AuthAction.Logout());
    // this.token = null;
  }

  // deprecated
  getToken() {
    firebase.auth().currentUser.getToken().then((token: string) => {
      this.token = token;
    });
    return this.token;
  }
  
  // deprecated
  isAuthenticated() {
    return this.token != null;
  }

}
