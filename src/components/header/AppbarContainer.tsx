import { connect } from "react-redux";
import { setHtmlElementOnMenu, setLocale, setIsOpen } from "../../actions";
import { ICombineReducersState } from "../../reducers";
import Appbar from "./Appbar";

const mapStateToProps = (state: ICombineReducersState) => ({
  anchorElement: state.appbar.anchorElement,
  isOpen: state.open.isOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  setHtmlElementOnMenu: (anchorElement: HTMLElement) => dispatch(setHtmlElementOnMenu(anchorElement)),
  setLocale: (lang: string) => dispatch(setLocale(lang)),
  setIsOpen: (isOpen: boolean) => dispatch(setIsOpen(isOpen)),
});

export const AppbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
