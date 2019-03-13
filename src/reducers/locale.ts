import { ILocaleAction, SET_LOCALE } from "../actions";

export interface ILocaleState {
    lang: string;
}

const createEmpty = () => ({
    lang: localStorage.getItem("lang") || "ko" ,
});

export const localeReducer = (state = createEmpty(), action: ILocaleAction) => {
    switch (action.type) {
        case SET_LOCALE: {
            return handleSetLocaleCompleted(state, action);
        }

        default:
            return state;
    }
};

const handleSetLocaleCompleted = (state = createEmpty(), action: ILocaleAction) => {
    return {
        lang: action.lang,
    };
};
