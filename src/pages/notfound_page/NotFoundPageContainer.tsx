import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NotfoundPage from "./NotFoundPage";

const mapStateToProps = (state: ICombineReducersState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

const NotFoundPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotfoundPage);

export default NotFoundPageContainer;
