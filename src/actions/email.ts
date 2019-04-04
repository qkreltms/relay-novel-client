export const SET_EMAIL = "SET_EMAIL";
export const SET_IS_EMAIL_DUPLICATED = "SET_IS_EMAIL_DUPLICATED";

export interface IEmailAction {
  email: string;
  type: string;
  isEmailDuplicated: boolean;
}

export const setEmail = (email: string) => {
  return {
    email,
    type: SET_EMAIL
  } as IEmailAction;
};

export const setIsEmailDuplicated = (isEmailDuplicated: boolean) => {
  return {
    isEmailDuplicated,
    type: SET_IS_EMAIL_DUPLICATED
  } as IEmailAction;
};
