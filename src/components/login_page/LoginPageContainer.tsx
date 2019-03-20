import { connect } from "react-redux";
import { LoginPage } from "./LoginPage";

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const LoginPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
