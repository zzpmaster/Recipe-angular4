import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService  implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    // return this.authService.isAuthenticated();
    console.log('AuthGuardService');
    return this.store.select('auth').map((authState: fromAuth.State) => {
      console.log('AuthGuardService: ' + authState.authenticated);
      return authState.authenticated;
    })
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated();
    return this.store.select('auth').map((authState: fromAuth.State) => {
      return authState.authenticated;
    })
  }

}
