import {Recipe} from '../recipes.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';

// 因为recipes是动态加载模块，所以，在fromApp.AppState是没有recipes的属性的
// 所以可以继承fromApp.AppState使得在调用fromApp.AppState可以加载到FeatureState的属性
export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state, 
                recipes: action.payload
            };
        case RecipeActions.ADD_RECIPES:
            return {
                ...state, 
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPES:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipes = {
                ...recipe, 
                ...action.payload.recipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipes;
            return {
                ...state, 
                recipes: recipes
            }
        case RecipeActions.DELETE_RECIPES:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state, 
                recipes: oldRecipes
            }
        default:
            return state;
    }
}