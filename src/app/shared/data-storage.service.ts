import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

import {RecipesService} from '../recipes/recipes.service';
import {AuthService} from '../auth/auth.service';
import { Recipe } from '../recipes/recipes.model';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipesService, private authService: AuthService) {
    }

    storeRecipes() {
        const token = this.authService.getToken();

        const req = new HttpRequest('PUT', 'https://ng-recipe-book-6fa96.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true,
            // params: new HttpParams().set('auth', token) // 将参数移到auth.interceptor中
        });
        return this.httpClient.request(req);

        /**
        return this.httpClient.put('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            observe: 'events',
            // observe: 'body',
            // headers: new HttpHeaders().set('Authorization', 'Bearer xxxx')
            params: new HttpParams().set('auth', token)
        });
        */
    }

    getRecipes() {
        const token = this.authService.getToken();
        // this.httpClient.get<Recipe[]>('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json?auth=' + token)
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-6fa96.firebaseio.com/recipes.json?auth=' + token, {
            observe: 'body',    // 返回的结果集，response是将所有的response值传递到map中，body指取body中的值
            responseType: 'json'    // text blob json arraybuffer
        })
        .map((recipes) => { //如果使用httpclient，会自动的转换
        // .map((response: Response) => {
            // const recipes: Recipe[] = response.json();
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