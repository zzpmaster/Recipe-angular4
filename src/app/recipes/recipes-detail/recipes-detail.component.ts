import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipes.model';
import {Ingredient} from '../../shared/ingredient.model';

import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipes.reducers';
import * as RecipeAction from '../store/recipes.actions';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  // recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router,
              //private store: Store<fromApp.AppState>
              private store: Store<fromRecipe.FeatureState>) { 

              }

  ngOnInit() {
    // const id = +this.router.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // this.recipe = this.recipesService.getRecipe(this.id);
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    // this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.select('recipes').take(1).subscribe((recipeState: fromRecipe.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    });
    // this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipesService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeAction.DeleteRecipes(this.id));
    this.router.navigate(['recipes']);
  }

}
