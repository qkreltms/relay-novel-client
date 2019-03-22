import { connect } from "react-redux";
import { setPassword, setPasswordVisibility, setEmail, setNickname, DuplicatedEmail, setIsEmailDuplicated} from "../../actions";
import { ICombineReducersState } from "../../reducers";
import SignupPage from "./SignupPage";

const mapStateToProps = (state: ICombineReducersState) => ({
    password: state.password.password,
    passwordVisibility: state.password.passwordVisibility,
    email: state.email.email,
    nickname: state.nickname.nickname,
    isPasswordError: state.password.isPasswordError,
    isNicknameError: state.nickname.isNicknameError,
    isEmailError: state.email.isEmailError,
    isEmailDuplicated: state.email.isEmailDuplicated,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPassword: (password: string) => dispatch(setPassword(password)),
    setPasswordVisibility: (passwordVisibility: boolean) => dispatch(setPasswordVisibility(passwordVisibility)),
    setEmail: (email: string) => dispatch(setEmail(email)),
    setNickname: (nickname: string) => dispatch(setNickname(nickname)),
    DuplicatedEmail: () => dispatch(DuplicatedEmail()),
    setIsEmailDuplicated: (isEmailDuplicated: boolean) => dispatch(setIsEmailDuplicated(isEmailDuplicated)),
});

export const SignupPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupPage);
