import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";

const mapStateToProps = (state: ICombineReducersState) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const MainPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPage);
