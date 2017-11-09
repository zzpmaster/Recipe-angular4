import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private store: Store<fromApp.AppState> ) {
    }

    /**
     * 拦截请求，如果有默认的参数，可以使用HttpInterceptor
     * @param req 
     * @param next 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);

        // const copied = req.clone({
        //     params: req.params.set('auth', this.authService.getToken())
        // });

        // return next.handle(copied);
        return this.store.select('auth').take(1).switchMap((auth: fromAuth.State) => {
            const copied = req.clone({
                params: req.params.set('auth', auth.token)
            });
            return next.handle(copied);
        })
    }
}