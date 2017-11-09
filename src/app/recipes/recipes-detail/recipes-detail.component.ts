import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipes.model';
import {Ingredient} from '../../shared/ingredient.model';

import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { 

              }

  ngOnInit() {
    // const id = +this.router.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    // this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
