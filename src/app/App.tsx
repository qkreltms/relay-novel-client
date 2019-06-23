import React from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import Appbar from "../components/header";
import MainPage from "../pages/main_page";
import SignupPage from "../pages/signup_page";
import locale from "../i18n";
import { ICombineReducersState } from "../reducers";
import SignupSuccessPage from "../pages/signup_success_page";
import NotfoundPage from "../pages/notfound_page";
import NovelPage from "../pages/novel_page";

addLocaleData([...en, ...ko]);

interface IProps {
  lang: string;
  setLocale: (lang: string) => void;
}

const App: React.SFC<IProps> = props => {
  return (
    <IntlProvider locale={props.lang} messages={locale[props.lang]}>
      <HashRouter>
        <div id="app">
          {/* Header */}
          <Appbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signup/success" component={SignupSuccessPage} />
            <Route exact path="/room/:id" component={NovelPage} />
            <Route component={NotfoundPage} />
          </Switch>
          {/* TODO: footer 구현 */}
          <footer />
        </div>
      </HashRouter>
    </IntlProvider>
  );
};

const mapStateToProps = (state: ICombineReducersState) => ({
  lang: state.locale.lang
});

export default connect(mapStateToProps)(App);
