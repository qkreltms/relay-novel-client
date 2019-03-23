import { connect } from "react-redux";
import { ICombineReducersState } from "../../../reducers";
import LoginDialog from "./LoginDialog";
import {
  setIsOpen,
  setPassword,
  setPasswordVisibility,
  setEmail,
  setNickname,
  DuplicatedEmail,
  setIsEmailDuplicated,
  setIsLoggedIn,
  setUser
} from "../../../actions";
import { User } from "../../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  isOpen: state.open.isOpen,
  password: state.password.password,
  passwordVisibility: state.password.passwordVisibility,
  email: state.email.email,
  isPasswordError: state.password.isPasswordError,
  isEmailError: state.email.isEmailError,
  isEmailDuplicated: state.email.isEmailDuplicated,
  isLoggedIn: state.login.isLoggedIn,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => ({
  setIsOpen: (isOpen: boolean) => dispatch(setIsOpen(isOpen)),
  setPassword: (password: string) => dispatch(setPassword(password)),
  setPasswordVisibility: (passwordVisibility: boolean) =>
    dispatch(setPasswordVisibility(passwordVisibility)),
  setEmail: (email: string) => dispatch(setEmail(email)),
  setNickname: (nickname: string) => dispatch(setNickname(nickname)),
  DuplicatedEmail: () => dispatch(DuplicatedEmail()),
  setIsEmailDuplicated: (isEmailDuplicated: boolean) =>
    dispatch(setIsEmailDuplicated(isEmailDuplicated)),
  setIsLoggedIn: (isLogin: boolean) => dispatch(setIsLoggedIn(isLogin)),
  setUser: (user: User) => dispatch(setUser(user))
});

export const LoginDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);
