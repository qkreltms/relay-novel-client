import { connect } from "react-redux";
import { ICombineReducersState } from "../../../reducers";
import LoginDialog from "./LoginDialog";
import {
  setIsDialogOpen,
  setPassword,
  setPasswordVisibility,
  setEmail,
  setNickname,
  setIsLoggedIn,
  setUser,
  setIsEmailDuplicated
} from "../../../actions";
import { User } from "../../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  isDialogOpen: state.open.isDialogOpen,
  password: state.auth.password,
  passwordVisibility: state.auth.passwordVisibility,
  email: state.auth.email,
  isPasswordError: state.auth.isPasswordError,
  isEmailError: state.auth.isEmailError,
  user: state.auth.user,
  isEmailDuplicated: state.auth.isEmailDuplicated
});

const mapDispatchToProps = (dispatch: any) => ({
  setIsDialogOpen: (isOpen: boolean) => dispatch(setIsDialogOpen(isOpen)),
  setPassword: (password: string) => dispatch(setPassword(password)),
  setPasswordVisibility: (passwordVisibility: boolean) =>
    dispatch(setPasswordVisibility(passwordVisibility)),
  setEmail: (email: string) => dispatch(setEmail(email)),
  setNickname: (nickname: string) => dispatch(setNickname(nickname)),
  setIsLoggedIn: (isLogin: boolean) => dispatch(setIsLoggedIn(isLogin)),
  setUser: (user: User) => dispatch(setUser(user)),
  setIsEmailDuplicated: (isEmailDuplicated: boolean) =>
    dispatch(setIsEmailDuplicated(isEmailDuplicated))
});

export const LoginDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);
