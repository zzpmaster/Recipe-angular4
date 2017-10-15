import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs/Subject';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ];

    getIngredients() {
        // copy当前的数组
        return this.ingredients.slice(0);
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ingredients.forEach((ingredient) => {
        //     this.addIngredient(ingredient);
        // })
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}