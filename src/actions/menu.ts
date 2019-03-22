export const SET_HTML_ELEMENT_ON_MENU = "SET_HTML_ELEMENT_ON_MENU";

export interface IAppbarAction {
    type: string;
    anchorElement: HTMLElement;
    isLoggedIn: boolean;
}

export const setHtmlElementOnMenu = (anchorElement: HTMLElement) => {
    return {
        anchorElement,
        type: SET_HTML_ELEMENT_ON_MENU,
    } as IAppbarAction;
};
