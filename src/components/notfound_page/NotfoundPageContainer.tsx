import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NotfoundPage from "./NotfoundPage";

const mapStateToProps = (state: ICombineReducersState) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const NotfoundPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotfoundPage);
