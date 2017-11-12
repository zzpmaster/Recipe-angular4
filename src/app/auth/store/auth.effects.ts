import {Effect, Actions} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import * as AuthActions from './auth.action';
import {fromPromise} from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.action$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => {
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: AuthActions.SIGNUP
            }, {
                type: AuthActions.SET_TOKEN,
                payload: token
            }]
        });

    @Effect()
    authSignin = this.action$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => {
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: AuthActions.SIGNIN
            }, {
                type: AuthActions.SET_TOKEN,
                payload: token
            }]
        });

    @Effect({dispatch: false})
    logout = this.action$
        .ofType(AuthActions.LOGOUT)
        .do(() => {
            return fromPromise(firebase.auth().signOut());
        })
        .map(() => {
            this.router.navigate(['/']);
        });
    constructor(private router: Router, private action$: Actions) {

    }
}