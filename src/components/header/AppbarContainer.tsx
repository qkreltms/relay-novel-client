import { connect } from "react-redux";
import { setHtmlElementOnMenu, setLocale, setIsDialogOpen, setIsLoggedIn, setUser } from "../../actions";
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
  setUser: (user: User) => dispatch(setUser(user))
});

export const AppbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
