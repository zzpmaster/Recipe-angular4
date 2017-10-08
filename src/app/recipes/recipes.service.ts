import { EventEmitter, Injectable } from '@angular/core';

import { ShoppingListService } from '../shopping-list/shopping-list.service'; 
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipesService {

    recipeSelected = new EventEmitter<Recipe>();

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

    constructor(private shoppingListService: ShoppingListService) {
    }

    getRecipes() {
        return this.recipes;
    }

    addIngredientsToShoppingList(ingredient: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredient);
    }

 }