import { combineReducers } from "redux";
import { ILocaleState, localeReducer } from "./locale";

export interface ICombineReducersState {
    locale: ILocaleState;
}

export const rootReducer = combineReducers<ICombineReducersState>({
    locale: localeReducer,
});
