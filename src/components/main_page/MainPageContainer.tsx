import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";
import { setPageNumber } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
  isLoggedIn: state.auth.isLoggedIn,
  pageNumber: state.tab.pageNumber
});

const mapDispatchToProps = (dispatch: any) => ({
  setPageNumber: (pageNumber: number) => dispatch(setPageNumber(pageNumber))
});

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
