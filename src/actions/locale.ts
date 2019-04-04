export const SET_LOCALE = "SET_LOCALE";

export interface ILocaleAction {
  lang: string;
  type: string;
}

export const setLocale = (lang: string) => {
  return {
    lang,
    type: SET_LOCALE
  } as ILocaleAction;
};
