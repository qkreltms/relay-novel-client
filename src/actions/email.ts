export const SET_EMAIL = "SET_EMAIL";
export const SET_IS_EMAIL_DUPLICATED = "SET_IS_EMAIL_DUPLICATED";
import axios from "axios";
import config from "../config";

export interface IEmailAction {
    email: string;
    type: string;
    isEmailDuplicated: boolean;
}

export const setEmail = (email: string) => {
    return {
        email,
        type: SET_EMAIL,
    } as IEmailAction;
};

export const setIsEmailDuplicated = (isEmailDuplicated: boolean) => {
    return {
        isEmailDuplicated,
        type: SET_IS_EMAIL_DUPLICATED,
    } as IEmailAction;
}

export const DuplicatedEmail = () => (dispatch: any):boolean => {
    axios.get(`${config.REACT_APP_SERVER_URL}/users/email`)
    .then(res => {
        if (res.data.message.length >= 1) {
            return dispatch(setIsEmailDuplicated(true));
        }
    })
    .catch(err => {
        console.log(err.response)
    })

    return dispatch(setIsEmailDuplicated(false));
}
