import { connect } from "react-redux";
import {
  setPassword,
  setPasswordVisibility,
  setEmail,
  setNickname,
  setIsEmailDuplicated
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
  isEmailDuplicated: state.auth.isEmailDuplicated,
  isDialogOpen: state.open.isDialogOpen,
  isNicknameError: state.auth.isNicknameError
});

const mapDispatchToProps = (dispatch: any) => ({
  setPassword: (password: string) => dispatch(setPassword(password)),
  setPasswordVisibility: (passwordVisibility: boolean) =>
    dispatch(setPasswordVisibility(passwordVisibility)),
  setEmail: (email: string) => dispatch(setEmail(email)),
  setNickname: (nickname: string) => dispatch(setNickname(nickname)),
  setIsEmailDuplicated: (isEmailDuplicated: boolean) =>
    dispatch(setIsEmailDuplicated(isEmailDuplicated))
});

export const SignupPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
