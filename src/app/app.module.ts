import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
// import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import {StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesService } from './recipes/recipes.service';
import { DataStorageService } from './shared/data-storage.service';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

import {reducers} from './store/app.reducers';

import {AuthEffects} from './auth/store/auth.effects';

import {environment} from './../environments/environment'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule, //注意： 如果需要懒加载，就不需要在imports中引用
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),    //状态管理
    EffectsModule.forRoot([AuthEffects]), //监听特定的 Action
    StoreRouterConnectingModule,
    // 确保StoreDevtoolsModule在StoreModule之下, 在prod环境下，不需要引入
    // 需要安装 redux devtools chrome 
    !environment.production ? StoreDevtoolsModule.instrument() : []   
  ],
  // providers: [ShoppingListService, RecipesService, DataStorageService, AuthService, AuthGuardService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
