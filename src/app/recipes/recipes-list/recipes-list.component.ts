import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store} from '@ngrx/store';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'; 

import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

import * as fromRecipe from '../store/recipes.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  // @Output() recipeSelected = new EventEmitter<Recipe>();
  
  // recipes: Recipe[];
  recipesState: Observable<fromRecipe.State>;
  // subscription: Subscription;

  constructor(private recipesService: RecipesService, 
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // this.recipes = this.recipesService.getRecipes();
    // this.subscription = this.recipesService.recipeChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // })
    // select的recipes在recipes.module中取得, 如果不是动态注入，读取的是app.reducers.ts中的值
    this.recipesState = this.store.select('recipes');
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
