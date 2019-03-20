import { IAppbarAction, SET_HTML_ELEMENT_ON_MENU } from "../actions";

export interface IAppbarState {
    anchorElement: any;
}

const createEmpty = () => ({
    anchorElement: null,
});

export const AppbarReducer = (state = createEmpty(), action: IAppbarAction) => {
    switch (action.type) {

        case SET_HTML_ELEMENT_ON_MENU: {
            return {
                anchorElement: action.anchorElement,
            } as IAppbarState;
        }

        default:
            return state;
    }
};
