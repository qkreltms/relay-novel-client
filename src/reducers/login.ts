// import { ILoginAction, SET_PASSWORD, SHOW_PASSWORD, SET_EMAIL, SET_IS_EMAIL_DUPLICATED  } from "../actions";

// export interface ILoginState {
//     email: string;
//     isEmailError: boolean;
//     isEmailDuplicated: boolean;
//     password: string;
//     passwordVisibility: boolean;
//     isPasswordError: boolean;
// }

// const createEmpty = () => ({
//     email: "",
//     isEmailError: false,
//     isEmailDuplicated: false,
//     password: "",
//     passwordVisibility: false,
//     isPasswordError: false,
// });

// const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

// export const emailReducer = (state = createEmpty(), action: ILoginAction) => {
//     switch (action.type) {
//         case SET_EMAIL: {
//             return {
//                 email: action.email,
//                 isEmailError: !validateEmail(action.email),
//                 isEmailDuplicated: false,
//                 ...state,
//             } as ILoginState;
//         }
//         case SET_IS_EMAIL_DUPLICATED: {
//             return {
//                 email: state.email,
//                 isEmailError: true,
//                 isEmailDuplicated: action.isEmailDuplicated,
//                 ...state,
//             } as ILoginState;
//         }
//         case SET_PASSWORD: {
//             return {
//                 password: action.password,
//                 passwordVisibility: state.passwordVisibility,
//                 isPasswordError: !validatePassword(action.password),
//                 ...state,
//             } as ILoginState;
//         }

//         case SHOW_PASSWORD: {
//             return {
//                 password: state.password,
//                 passwordVisibility: action.passwordVisibility,
//                 isPasswordError: state.isPasswordError,
//                 ...state,
//             } as ILoginState;
//         }

//         default:
//             return state;
//     }
// };

// const validateEmail = (email: string):boolean => {
//     if (emailRegex.test(email)) {
//         return true;
//     }

//     return false;
// }
