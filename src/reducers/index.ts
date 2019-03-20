import { combineReducers } from "redux";
import { AppbarReducer, IAppbarState } from "./appbar";
import { ILocaleState, localeReducer } from "./locale";
import { IPasswordState, passwordReducer } from "./password";

export interface ICombineReducersState {
    appbar: IAppbarState;
    locale: ILocaleState;
    password: IPasswordState;
}

export const rootReducer = combineReducers<ICombineReducersState>({
    appbar: AppbarReducer,
    locale: localeReducer,
    password: passwordReducer,
});
