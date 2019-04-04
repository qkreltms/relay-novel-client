export const SET_PASSWORD = "SET_PASSWORD";
export const SHOW_PASSWORD = "SHOW_PASSWORD";

export interface IPasswordAction {
  type: string;
  password: string;
  passwordVisibility: boolean;
}

export const setPassword = (password: string) => {
  return {
    password,
    type: SET_PASSWORD
  } as IPasswordAction;
};

export const setPasswordVisibility = (passwordVisibility: boolean) => {
  return {
    passwordVisibility,
    type: SHOW_PASSWORD
  } as IPasswordAction;
};
