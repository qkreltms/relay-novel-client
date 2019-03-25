import { connect } from "react-redux";
import { setHtmlElementOnMenu, setLocale, setIsOpen, setIsLoggedIn, setUser } from "../../actions";
import { ICombineReducersState } from "../../reducers";
import Appbar from "./Appbar";
import { User } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  anchorElement: state.appbar.anchorElement,
  isOpen: state.open.isOpen,
  isLoggedIn: state.login.isLoggedIn,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => ({
  setHtmlElementOnMenu: (anchorElement: HTMLElement) => dispatch(setHtmlElementOnMenu(anchorElement)),
  setLocale: (lang: string) => dispatch(setLocale(lang)),
  setIsOpen: (isOpen: boolean) => dispatch(setIsOpen(isOpen)),
  setIsLoggedIn: (isLoggedIn: boolean) => dispatch(setIsLoggedIn(isLoggedIn)),
  setUser: (user: User) => dispatch(setUser(user))
});

export const AppbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
