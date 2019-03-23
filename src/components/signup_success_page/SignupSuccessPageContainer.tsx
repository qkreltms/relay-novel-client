import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import SignupSuccessPage from "./SignupSuccessPage";

const mapStateToProps = (state: ICombineReducersState) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const SignupSuccessPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupSuccessPage);
