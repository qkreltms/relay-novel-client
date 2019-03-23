import { connect } from "react-redux";
import { setHtmlElementOnMenu, setLocale, setIsOpen, setIsLoggedIn } from "../../actions";
import { ICombineReducersState } from "../../reducers";
import Appbar from "./Appbar";

const mapStateToProps = (state: ICombineReducersState) => ({
  anchorElement: state.appbar.anchorElement,
  isOpen: state.open.isOpen,
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = (dispatch: any) => ({
  setHtmlElementOnMenu: (anchorElement: HTMLElement) => dispatch(setHtmlElementOnMenu(anchorElement)),
  setLocale: (lang: string) => dispatch(setLocale(lang)),
  setIsOpen: (isOpen: boolean) => dispatch(setIsOpen(isOpen)),
  setIsLoggedIn: (isLoggedIn: boolean) => dispatch(setIsLoggedIn(isLoggedIn)),
});

export const AppbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
