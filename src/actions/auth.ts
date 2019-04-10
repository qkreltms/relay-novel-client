import { User } from "../models";

export const SET_EMAIL = "SET_EMAIL";
export const SET_IS_INCORRECT_EMAIL = "SET_IS_INCORRECT_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
export const SHOW_PASSWORD = "SHOW_PASSWORD";
export const SET_NICKNAME = "SET_NICKNAME";
export const SET_USER = "SET_USER";
export const SET_IS_INCORRECT_PASSWORD = "SET_IS_INCORRECT_PASSWORD";
export const INIT_AUTH = "INIT_AUTH";
export interface IAuthAction {
  type: string;
  isLoggedIn: boolean;
  email: string;
  isIncorrectEmail: boolean;
  isIncorrectPassword: boolean;
  password: string;
  passwordVisibility: boolean;
  nickname: string;
  user: User;
}

export const initAuth = () => {
  return {
    type: INIT_AUTH
  } as IAuthAction;
};

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

export const setIsIncorrectEmail = (isIncorrectEmail: boolean) => {
  return {
    isIncorrectEmail,
    type: SET_IS_INCORRECT_EMAIL
  } as IAuthAction;
};

export const setIsIncorrectPassword = (isIncorrectPassword: boolean) => {
  return {
    isIncorrectPassword,
    type: SET_IS_INCORRECT_PASSWORD
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
