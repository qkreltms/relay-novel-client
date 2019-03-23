import { SET_USER, IUserAction } from "../actions";
import { User, newUser } from "../models";

export interface IUserState {
    user: User;
}

const createEmpty = () => ({
    user: newUser(),
});

export const userReducer = (state = createEmpty(), action: IUserAction) => {
    switch (action.type) {
        case SET_USER: {
            return {
                user: action.user,
            } as IUserState;
        }

        default:
            return state;
    }
};
