import {Action} from '@ngrx/store';

import { Recipe } from '../recipes.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPES = 'ADD_RECIPES';
export const UPDATE_RECIPES = 'UPDATE_RECIPES';
export const DELETE_RECIPES = 'DELETE_RECIPES';

export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export class AddRecipes implements Action {
    readonly type = ADD_RECIPES;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipes implements Action {
    readonly type = UPDATE_RECIPES;
    constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipes implements Action {
    readonly type = DELETE_RECIPES;
    constructor(public payload: number) {}
}

export class StroeRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export type RecipeActions = SetRecipes | AddRecipes | UpdateRecipes | DeleteRecipes | StroeRecipes | FetchRecipes;

