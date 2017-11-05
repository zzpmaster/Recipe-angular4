import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            // Redux 首次执行时，state 为 undefined, 此时可借机设置并返回应用的初始 state。
            // 如果使用 Object.assign() 新建了一个副本Object.assign({}, state, ingredients: [...state.ingredients, action.payload])
            // 注意: 为什么新建!!!!
            // 从不直接修改 state 是 Redux 的核心理念之一, 第一个参数会被改变，将state与ingredients
            // 使用 ES7 提案的 对象展开运算符（http://cn.redux.js.org/docs/recipes/UsingObjectSpreadOperator.html）
            // merge操作 会覆盖整个ingredients属性
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        default:
        return state;
    }
}