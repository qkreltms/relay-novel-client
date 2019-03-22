import { combineReducers } from "redux";
import { emailReducer, IEmailState } from "./email";
import { ILocaleState, localeReducer } from "./locale";
import { AppbarReducer, IAppbarState } from "./menu";
import { INicknameState, nicknameReducer } from "./nickname";
import { IPasswordState, passwordReducer } from "./password";
import { IOpenState, openReducer } from "./open";

export interface ICombineReducersState {
    appbar: IAppbarState;
    locale: ILocaleState;
    password: IPasswordState;
    nickname: INicknameState;
    email: IEmailState;
    open: IOpenState;
}

export const rootReducer = combineReducers<ICombineReducersState>({
    appbar: AppbarReducer,
    locale: localeReducer,
    password: passwordReducer,
    nickname: nicknameReducer,
    email: emailReducer,
    open: openReducer,
});
