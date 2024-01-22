import {IUser} from "../authmodels.ts";


export enum AuthReducerActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER",
    LOGIN_ADMIN = "AUTH_LOGIN_ADMIN",
}

export interface IAuthReducerState {
    isAuth: boolean,
    isAdmin: boolean,
    user: IUser | null
}

const initState: IAuthReducerState = {
    isAuth: false,
    isAdmin: false,
    user: null
}

const AuthReducer = (state = initState, action: any): IAuthReducerState => {
    switch (action.type) {
        case AuthReducerActionType.LOGIN_USER:
        return {
            isAuth: true,
            isAdmin: false,
                user:action.payload as IUser
        } as IAuthReducerState;
        case AuthReducerActionType.LOGOUT_USER:
            return {
                isAuth: false,
                isAdmin: false,
                user: null
            } as IAuthReducerState;
        case AuthReducerActionType.LOGIN_ADMIN:
            return {
                isAuth: true,
                isAdmin: true,
                user:action.payload as IUser
            } as IAuthReducerState;
        default: {
            return state;
        }
    }
}

export default AuthReducer;