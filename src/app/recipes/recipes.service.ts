import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Store} from '@ngrx/store';

import { ShoppingListService } from '../shopping-list/shopping-list.service'; 
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipesService {

    // recipeSelected = new EventEmitter<Recipe>();
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 
        'http://cdn2.stylecraze.com/wp-content/uploads/2014/08/Top-15-Yummy-Indian-Breakfast-Recipes-For-Your-Kids1.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Anthoer A Test Recipe', 'This is simply a test', 
        'http://cdn2.stylecraze.com/wp-content/uploads/2014/08/Top-15-Yummy-Indian-Breakfast-Recipes-For-Your-Kids1.jpg', [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ];

    constructor(private shoppingListService: ShoppingListService,
                private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }
    // deprecated
    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }
    // deprecated
    addIngredientsToShoppingList(ingredient: Ingredient[]) {
        // this.shoppingListService.addIngredients(ingredient);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient));
    }
    // deprecated
    addRecipe(recipes: Recipe) {
        this.recipes.push(recipes);
        this.recipeChanged.next(this.recipes.slice());
    }
    // deprecated
    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    // deprecated
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

 }