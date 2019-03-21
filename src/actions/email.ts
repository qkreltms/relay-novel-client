export const SET_EMAIL = "SET_EMAIL";

export interface IEmailAction {
    email: string;
    type: string;
}

export const setEmail = (email: string) => {
    return {
        email,
        type: SET_EMAIL,
    } as IEmailAction;
};
