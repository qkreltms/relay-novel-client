import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";

const mapStateToProps = (state: ICombineReducersState) => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({});

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
