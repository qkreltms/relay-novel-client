// import axios from "axios";
// import config from "../config";

// export const SET_EMAIL = "SET_EMAIL";
// export const SET_IS_EMAIL_DUPLICATED = "SET_IS_EMAIL_DUPLICATED";
// export const SET_PASSWORD = "SET_PASSWORD";
// export const SHOW_PASSWORD = "SHOW_PASSWORD";

// export interface ILoginAction {
//     email: string;
//     type: string;
//     isEmailDuplicated: boolean;
//     password: string;
//     passwordVisibility: boolean;
// }


// export const setLoginEmail = (email: string) => {
//     return {
//         email,
//         type: SET_EMAIL,
//     } as ILoginAction;
// };

// export const setIsEmailDuplicated = (isEmailDuplicated: boolean) => {
//     return {
//         isEmailDuplicated,
//         type: SET_IS_EMAIL_DUPLICATED,
//     } as ILoginAction;
// }

// export const DuplicatedEmail = () => (dispatch: any):boolean => {
//     axios.get(`${config.REACT_APP_SERVER_URL}/users/email`)
//     .then(res => {
//         if (res.data.message.length >= 1) {
//             return dispatch(setIsEmailDuplicated(true));
//         }
//     })
//     .catch(err => {
//         console.log(err.response)
//     })

//     return dispatch(setIsEmailDuplicated(false));
// }


// export const setPassword = (password: string) => {
//     return {
//         password,
//         type: SET_PASSWORD,
//     } as ILoginAction;
// };

// export const setPasswordVisibility = (passwordVisibility: boolean) => {
//     return {
//         passwordVisibility,
//         type: SHOW_PASSWORD,
//     } as ILoginAction;
// };
