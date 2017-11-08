import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            // Redux 首次执行时，state 为 undefined, 此时可借机设置并返回应用的初始 state。
            // 如果使用 Object.assign() 新建了一个副本Object.assign({}, state, ingredients: [...state.ingredients, action.payload])
            // 注意: 为什么新建!!!!
            // 从不直接修改 state 是 Redux 的核心理念之一, 第一个参数会被改变，将state与ingredients
            // 使用 ES7 提案的 对象展开运算符（http://cn.redux.js.org/docs/recipes/UsingObjectSpreadOperator.html）
            // merge操作 会覆盖整个ingredients属性(因为是对象)
            console.log(1);
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload] //不加点的原因是他不是一个数组
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            console.log(2);
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingredients: ingredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredientArray = [...state.ingredients];
            ingredientArray.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredientArray
            };
        case ShoppingListActions.START_EDIT:
            const editIngredient = {...state.ingredients[action.payload]}; 
            return {
                ...state,
                editedIngredient: editIngredient,
                editedIngredientIndex: action.payload
            };
        default:
            return state;   //系统初始化时，会调用default来初始化
    }
}