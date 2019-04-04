import { ILocaleAction, SET_LOCALE } from "../actions";

export interface ILocaleState {
  lang: string;
}

const createEmpty = () => ({
  lang: localStorage.getItem("lang") || "ko"
});

export const localeReducer = (state = createEmpty(), action: ILocaleAction) => {
  switch (action.type) {
    case SET_LOCALE: {
      return {
        lang: action.lang
      } as ILocaleAction;
    }

    default:
      return state;
  }
};
