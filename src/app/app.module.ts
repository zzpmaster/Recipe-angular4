import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

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

import {shoppingListReducer} from './shopping-list/store/shopping-list.reducers';

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
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  // providers: [ShoppingListService, RecipesService, DataStorageService, AuthService, AuthGuardService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
