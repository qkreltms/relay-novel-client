import { connect } from "react-redux";
import { setPassword, setPasswordVisibility, setEmail, setNickname} from "../../actions";
import { ICombineReducersState } from "../../reducers";
import SignupPage from "./SignupPage";

const mapStateToProps = (state: ICombineReducersState) => ({
    password: state.password.password,
    passwordVisibility: state.password.passwordVisibility,
    email: state.email.email,
    nickname: state.nickname.nickname,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPassword: (password: string) => dispatch(setPassword(password)),
    setPasswordVisibility: (passwordVisibility: boolean) => dispatch(setPasswordVisibility(passwordVisibility)),
    setEmail: (email: string) => dispatch(setEmail(email)),
    setNickname: (nickname: string) => dispatch(setNickname(nickname)),
});

export const SignupPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupPage);
