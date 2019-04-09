import { User } from "../models";

export const SET_EMAIL = "SET_EMAIL";
export const SET_IS_EMAIL_DUPLICATED = "SET_IS_EMAIL_DUPLICATED";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
export const SHOW_PASSWORD = "SHOW_PASSWORD";
export const SET_NICKNAME = "SET_NICKNAME";
export const SET_USER = "SET_USER";

export interface IAuthAction {
  type: string;
  isLoggedIn: boolean;
  email: string;
  isEmailDuplicated: boolean;
  password: string;
  passwordVisibility: boolean;
  nickname: string;
  user: User;
}

export const setUser = (user: User) => {
  return {
    user,
    type: SET_USER
  } as IAuthAction;
};

export const setEmail = (email: string) => {
  return {
    email,
    type: SET_EMAIL
  } as IAuthAction;
};

export const setIsEmailDuplicated = (isEmailDuplicated: boolean) => {
  return {
    isEmailDuplicated,
    type: SET_IS_EMAIL_DUPLICATED
  } as IAuthAction;
};

export const setIsLoggedIn = (isLoggedIn: boolean) => {
  return {
    isLoggedIn,
    type: SET_IS_LOGGED_IN
  } as IAuthAction;
};

export const setPassword = (password: string) => {
  return {
    password,
    type: SET_PASSWORD
  } as IAuthAction;
};

export const setPasswordVisibility = (passwordVisibility: boolean) => {
  return {
    passwordVisibility,
    type: SHOW_PASSWORD
  } as IAuthAction;
};

export const setNickname = (nickname: string) => {
  return {
    nickname,
    type: SET_NICKNAME
  } as IAuthAction;
};
