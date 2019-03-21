import { IEmailAction, SET_EMAIL } from "../actions";

export interface IEmailState {
    email: string;
}

const createEmpty = () => ({
    email: "",
});

export const emailReducer = (state = createEmpty(), action: IEmailAction) => {
    switch (action.type) {
        case SET_EMAIL: {
            return {
                email: action.email,
            } as IEmailAction;
        }

        default:
            return state;
    }
};
