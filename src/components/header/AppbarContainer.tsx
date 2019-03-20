import { connect } from "react-redux";
import { setHtmlElementOnMenu, setLocale } from "../../actions";
import { ICombineReducersState } from "../../reducers";
import Appbar from "./Appbar";

const mapStateToProps = (state: ICombineReducersState) => ({
  anchorElement: state.appbar.anchorElement,
});

const mapDispatchToProps = (dispatch: any) => ({
  setHtmlElementOnMenu: (anchorElement: any) => dispatch(setHtmlElementOnMenu(anchorElement)),
  setLocale: (lang: string) => dispatch(setLocale(lang)),
});

export const AppbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
