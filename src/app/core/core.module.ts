import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {LoggingIntercepter} from '../shared/logging.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule    //需要导入RouterModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers:[
        ShoppingListService, 
        RecipesService, 
        DataStorageService, 
        AuthService, 
        AuthGuardService,
        // 告诉angularHTTP_INTERCEPTORS是一个数组，不是一个单个的值
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingIntercepter, multi: true}
    ]
})
    
export class CoreModule {

}