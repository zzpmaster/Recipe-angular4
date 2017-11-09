import * as AuthAction from './auth.action';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
}

export function authReducers(state = initialState, action: AuthAction.AuthActions) {

    switch(action.type) {
        case (AuthAction.SIGNIN):
        case (AuthAction.SIGNUP):
            return {
                ...state,
                authenticated: true
            };
        case (AuthAction.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (AuthAction.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}