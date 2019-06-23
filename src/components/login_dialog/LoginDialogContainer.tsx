import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import LoginDialog from "./LoginDialog";
import {
  setIsDialogOpen,
  setPassword,
  setPasswordVisibility,
  setEmail,
  setNickname,
  setIsLoggedIn,
  setUser,
  setIsIncorrectEmail,
  setIsIncorrectPassword,
  initAuth
} from "../../actions";
import { User } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  isDialogOpen: state.open.isDialogOpen,
  password: state.auth.password,
  passwordVisibility: state.auth.passwordVisibility,
  email: state.auth.email,
  isPasswordError: state.auth.isPasswordError,
  isEmailError: state.auth.isEmailError,
  user: state.auth.user,
  isIncorrectEmail: state.auth.isIncorrectEmail,
  isIncorrectPassword: state.auth.isIncorrectPassword
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
  setIsIncorrectEmail: (isIncorrectEmail: boolean) =>
    dispatch(setIsIncorrectEmail(isIncorrectEmail)),
  setIsIncorrectPassword: (isIncorrectPassword: boolean) =>
    dispatch(setIsIncorrectPassword(isIncorrectPassword)),
  initAuth: () => dispatch(initAuth())
});

const LoginDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);

export default LoginDialogContainer;