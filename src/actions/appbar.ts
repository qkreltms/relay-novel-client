export const SET_HTML_ELEMENT_ON_MENU = "SET_HTML_ELEMENT_ON_MENU";

export interface IAppbarAction {
    type: string;
    anchorElement: any;
    isLoggedIn: boolean;
}

export const setHtmlElementOnMenu = (anchorElement: any) => {
    return {
        anchorElement,
        type: SET_HTML_ELEMENT_ON_MENU,
    } as IAppbarAction;
};
