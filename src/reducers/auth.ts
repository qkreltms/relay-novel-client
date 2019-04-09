import {
  IAuthAction,
  SET_EMAIL,
  SET_IS_EMAIL_DUPLICATED,
  SET_IS_LOGGED_IN,
  SET_PASSWORD,
  SHOW_PASSWORD,
  SET_NICKNAME,
  SET_USER
} from "../actions";
import { User, newUser } from "../models";

export interface IAuthState {
  email: string;
  isEmailError: boolean;
  isEmailDuplicated: boolean;
  isLoggedIn: boolean;
  password: string;
  passwordVisibility: boolean;
  isPasswordError: boolean;
  nickname: string;
  isNicknameError: boolean;
  user: User;
}

const createEmpty = () => ({
  email: "",
  isEmailError: false,
  isEmailDuplicated: false,
  isLoggedIn: false,
  password: "",
  passwordVisibility: false,
  isPasswordError: false,
  nickname: "",
  isNicknameError: false,
  user: newUser()
});

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const authReducer = (state = createEmpty(), action: IAuthAction) => {
  switch (action.type) {
    case SET_EMAIL: {
      return {
        ...state,
        email: action.email,
        isEmailError: isEmail(action.email),
        isEmailDuplicated: false
      } as IAuthState;
    }

    case SET_IS_EMAIL_DUPLICATED: {
      return {
        ...state,
        isEmailDuplicated: action.isEmailDuplicated
      } as IAuthState;
    }

    case SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      } as IAuthState;
    }

    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
        isPasswordError: isPassword(action.password)
      } as IAuthState;
    }

    case SHOW_PASSWORD: {
      return {
        ...state,
        passwordVisibility: action.passwordVisibility
      } as IAuthState;
    }

    case SET_NICKNAME: {
      return {
        ...state,
        nickname: action.nickname,
        isNicknameError: isNickname(action.nickname)
      } as IAuthState;
    }

    case SET_USER: {
      return {
        ...state,
        user: action.user
      } as IAuthState;
    }

    default:
      return state;
  }
};

const isEmail = (email: string): boolean => {
  //TODO: 정규식으로 길이 제한 하기
  if (email.length <= 0) return false;
  if (emailRegex.test(email)) return false;

  return true;
};

const isPassword = (password: string): boolean => {
  //TODO: 정규식으로 바꾸기
  if (password.length <= 0) return false;
  if (password.length >= 6 && password.length <= 30) return false;

  return true;
};

const isNickname = (nickname: string): boolean => {
  //TODO: 정규식으로 바꾸기
  if (nickname.length <= 0) return false;
  if (nickname.length >= 1 && nickname.length <= 30) return false;

  return true;
};
