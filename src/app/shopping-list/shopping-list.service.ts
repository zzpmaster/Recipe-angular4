import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs/Subject';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ];

    getIngredients() {
        // copy当前的数组
        return this.ingredients.slice(0);
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    // deprecated
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // deprecated
    addIngredients(ingredients: Ingredient[]) {
        // ingredients.forEach((ingredient) => {
        //     this.addIngredient(ingredient);
        // })
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // deprecated
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // deprecated
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}