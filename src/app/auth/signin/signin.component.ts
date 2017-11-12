import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthAtions from '../store/auth.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    // this.authService.signinUser(email, password);
    this.store.dispatch(new AuthAtions.TrySignin({
      username: email,
      password: password
    }));
  }

}
