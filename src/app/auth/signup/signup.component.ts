import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthAtions from '../store/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    // this.authService.signupUser(email, password);
    this.store.dispatch(new AuthAtions.TrySignup({
      username: email,
      password: password
    }));
  }

}
