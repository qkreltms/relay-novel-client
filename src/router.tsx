import React from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { setLocale } from "./actions";
import Appbar from "./components/header/Appbar";
import locale from "./i18n";
import { ICombineReducersState } from "./reducers";

addLocaleData([...en, ...ko]);

interface IProps {
  lang: string;
  setLocale: (lang: string) => void;
}

const Router: React.SFC<IProps> = (props) => {
  return (
    <IntlProvider locale={props.lang} messages={locale[props.lang]}>
      <HashRouter>
        <div>
            <Appbar setLocale={props.setLocale}/>
            <Switch>
              {/* <Route exact path="/" component={App} />
        <Route exact path="/signup" component={App} />
        <Route path="/login" component={App} /> */}
            </Switch>
          <footer />
        </div>
      </HashRouter>
    </IntlProvider>
  );
};

const mapStateToProps = (state: ICombineReducersState) => ({
  lang: state.locale.lang,
});

const mapDispatchToProps = (dispatch: any) => ({
  setLocale: (lang: string) => dispatch(setLocale(lang)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router);
