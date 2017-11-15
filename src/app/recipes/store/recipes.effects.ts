import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";

import * as RecipesActions from './recipes.actions';
import { HttpClient, HttpRequest } from "@angular/common/http";

import {Recipe} from '../recipes.model';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipes.reducers';

@Injectable()
export class RecipesEffects {
    @Effect()
    recipeFetch = this.action$
        .ofType(RecipesActions.FETCH_RECIPES)
        .switchMap((action: RecipesActions.FetchRecipes) => {

            // this.httpClient.get<Recipe[]>('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json?auth=' + token)
            // auth参数在interceptor中添加
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json', {
                observe: 'body',    // 返回的结果集，response是将所有的response值传递到map中，body指取body中的值
                responseType: 'json'    // text blob json arraybuffer
            })
        })
        .map((recipes) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: RecipesActions.SET_RECIPES,
                payload: recipes
            };
        });

    @Effect({dispatch: false})  //不继续向下发送dispath
    recipeStore = this.action$
        .ofType(RecipesActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 'https://ng-recipe-book-6fa96.firebaseio.com/recipes.json', state.recipes, {
                reportProgress: true,
                // params: new HttpParams().set('auth', token) // 将参数移到auth.interceptor中
            });
            return this.httpClient.request(req);
        });

    constructor(private action$: Actions, 
                private httpClient:HttpClient,
                private store: Store<fromRecipe.FeatureState>) {

    }
}