import { IEmailAction, SET_EMAIL, SET_IS_EMAIL_DUPLICATED } from "../actions";
export interface IEmailState {
  email: string;
  isEmailError: boolean;
  isEmailDuplicated: boolean;
}

const createEmpty = () => ({
  email: "",
  isEmailError: false,
  isEmailDuplicated: false
});

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const emailReducer = (state = createEmpty(), action: IEmailAction) => {
  switch (action.type) {
    case SET_EMAIL: {
      return {
        email: action.email,
        isEmailError: !validateEmail(action.email),
        isEmailDuplicated: false
      } as IEmailState;
    }
    case SET_IS_EMAIL_DUPLICATED: {
      return {
        email: state.email,
        isEmailError: true,
        isEmailDuplicated: action.isEmailDuplicated
      } as IEmailState;
    }

    default:
      return state;
  }
};

const validateEmail = (email: string): boolean => {
  if (email.length <= 0) {
    return true;
  }

  if (emailRegex.test(email)) {
    return true;
  }

  return false;
};
