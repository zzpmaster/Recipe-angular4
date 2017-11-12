import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RecipesComponent } from './recipes.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';

import {recipeReducer} from './store/recipes.reducers';

@NgModule({
  imports: [
    // ngif ngfor ...
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    //如果是lazy load的方式加载，需要使用 forFeature来动态添加state
    StoreModule.forFeature('recipes', recipeReducer)
  ],
  declarations: [
    RecipesComponent,
    RecipesStartComponent,
    RecipesListComponent,
    RecipesEditComponent,
    RecipesDetailComponent,
    RecipesItemComponent
  ]
})
export class RecipesModule { }
