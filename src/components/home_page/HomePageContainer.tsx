import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import HomePage from "./HomePage";
const mapStateToProps = (state: ICombineReducersState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
