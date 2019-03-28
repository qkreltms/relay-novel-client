import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NovelPage from "./NovelPage";

const mapStateToProps = (state: ICombineReducersState) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const NovelPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NovelPage);
