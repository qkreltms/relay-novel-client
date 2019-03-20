import { connect } from "react-redux";
import { setPassword, setPasswordVisibility} from "../../actions";
import { ICombineReducersState } from "../../reducers";
import SignupPage from "./SignupPage";

const mapStateToProps = (state: ICombineReducersState) => ({
    password: state.password.password,
    passwordVisibility: state.password.passwordVisibility,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPassword: (password: string) => dispatch(setPassword(password)),
    setPasswordVisibility: (passwordVisibility: boolean) => dispatch(setPasswordVisibility(passwordVisibility)),
});

export const SignupPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupPage);
