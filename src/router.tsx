import React from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { AppbarContainer as Appbar } from "./components/header";
import { MainPageContainer as MainPage } from "./components/main_page";
import { SignupPageContainer as SignupPage } from "./components/signup_page";
import locale from "./i18n";
import { ICombineReducersState } from "./reducers";
import { SignupSuccessPageContainer } from "./components/signup_success_page";
import { NotfoundPageContainer } from "./components/notfound_page";

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
          <Appbar />
          <Switch>
            <Route exact path="/" component= { MainPage } />
            <Route exact path="/signup" component={ SignupPage } />
            <Route exact path="/signup/success" component={ SignupSuccessPageContainer } />
            <Route component={ NotfoundPageContainer } />
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

export default connect(
  mapStateToProps,
)(Router);
