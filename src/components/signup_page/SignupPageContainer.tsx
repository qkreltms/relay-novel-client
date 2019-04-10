import { connect } from "react-redux";
import {
  setPassword,
  setPasswordVisibility,
  setEmail,
  setNickname,
  setIsIncorrectEmail,
  initAuth
} from "../../actions";
import { ICombineReducersState } from "../../reducers";
import SignupPage from "./SignupPage";

const mapStateToProps = (state: ICombineReducersState) => ({
  password: state.auth.password,
  passwordVisibility: state.auth.passwordVisibility,
  email: state.auth.email,
  nickname: state.auth.nickname,
  isPasswordError: state.auth.isPasswordError,
  isEmailError: state.auth.isEmailError,
  isIncorrectEmail: state.auth.isIncorrectEmail,
  isDialogOpen: state.open.isDialogOpen,
  isNicknameError: state.auth.isNicknameError
});

const mapDispatchToProps = (dispatch: any) => ({
  setPassword: (password: string) => dispatch(setPassword(password)),
  setPasswordVisibility: (passwordVisibility: boolean) =>
    dispatch(setPasswordVisibility(passwordVisibility)),
  setEmail: (email: string) => dispatch(setEmail(email)),
  setNickname: (nickname: string) => dispatch(setNickname(nickname)),
  setIsIncorrectEmail: (isIncorrectEmail: boolean) =>
    dispatch(setIsIncorrectEmail(isIncorrectEmail)),
  initAuth: () => dispatch(initAuth())
});

export const SignupPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
