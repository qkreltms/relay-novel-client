import { connect } from "react-redux";
import {
  setPassword,
  setPasswordVisibility,
  setEmail,
  setNickname,
  setIsIncorrectEmail,
  initAuth,
  setIsEmailError,
  setIsNicknameError,
  setIsPasswordError
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
  isEmailDuplicated: state.auth.isIncorrectEmail,
  isDialogOpen: state.open.isDialogOpen,
  isNicknameError: state.auth.isNicknameError
});

const mapDispatchToProps = (dispatch: any) => ({
  setPassword: (password: string) => dispatch(setPassword(password)),
  setPasswordVisibility: (passwordVisibility: boolean) =>
    dispatch(setPasswordVisibility(passwordVisibility)),
  setEmail: (email: string) => dispatch(setEmail(email)),
  setNickname: (nickname: string) => dispatch(setNickname(nickname)),
  setIsEmailDuplicated: (isDuplicated: boolean) =>
    dispatch(setIsIncorrectEmail(isDuplicated)),
  initAuth: () => dispatch(initAuth()),
  setIsEmailError: (isError: boolean) => dispatch(setIsEmailError(isError)),
  setIsNicknameError: (isError: boolean) => dispatch(setIsNicknameError(isError)),
  setIsPasswordError: (isError: boolean) => dispatch(setIsPasswordError(isError))
});

export const SignupPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);