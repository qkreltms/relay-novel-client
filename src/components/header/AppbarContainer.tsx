import { connect } from "react-redux";
import { setHtmlElementOnMenu, setLocale, setIsDialogOpen, setIsLoggedIn, setUser, setPageNumber } from "../../actions";
import { ICombineReducersState } from "../../reducers";
import Appbar from "./Appbar";
import { User } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  anchorElement: state.appbar.anchorElement,
  isDialogOpen: state.open.isDialogOpen,
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch: any) => ({
  setHtmlElementOnMenu: (anchorElement: HTMLElement) => dispatch(setHtmlElementOnMenu(anchorElement)),
  setLocale: (lang: string) => dispatch(setLocale(lang)),
  setIsDialogOpen: (isOpen: boolean) => dispatch(setIsDialogOpen(isOpen)),
  setIsLoggedIn: (isLoggedIn: boolean) => dispatch(setIsLoggedIn(isLoggedIn)),
  setUser: (user: User) => dispatch(setUser(user)),
  setPageNumber: (pageNumber: number) => dispatch(setPageNumber(pageNumber))
});

const AppbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);

export default AppbarContainer;
