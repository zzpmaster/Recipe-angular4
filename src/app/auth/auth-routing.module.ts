import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from '../auth/signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';

const authRouter: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(authRouter)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {

}