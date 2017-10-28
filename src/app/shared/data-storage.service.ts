import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {RecipesService} from '../recipes/recipes.service';
import {AuthService} from '../auth/auth.service';
import { Recipe } from '../recipes/recipes.model';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipesService, private authService: AuthService) {
    }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(), {});
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json?auth=' + token)
        .map((response: Response) => {
            const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return recipes;
        })
        .subscribe((recipes: Recipe[]) => {
            // const data = response.json();
            // this.recipeService.setRecipes(data);
            this.recipeService.setRecipes(recipes);
        });
    }

}