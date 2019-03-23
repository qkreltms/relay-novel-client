import { User } from "../models";
export const SET_USER = "SET_USER";

export interface IUserAction {
    type: string;
    user: User;
}

export const setUser = (user: User) => {
    return {
        user,
        type: SET_USER,
    } as IUserAction;
};