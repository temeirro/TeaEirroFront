import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "../mycomponents/auth/login/AuthReducer.ts";
import CartReducer from "../mycomponents/tea_pages/CartReducer.ts";

export const rootReducer = combineReducers({
    auth:AuthReducer,
    cart:CartReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});