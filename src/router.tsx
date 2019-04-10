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
import { SignupSuccessPageContainer as SignupSuccessPage } from "./components/signup_success_page";
import { NotfoundPageContainer as NotfoundPage } from "./components/notfound_page";
import { NovelPageContainer as NovelPage } from "./components/novel_page";
import { CreateRoomPageContainer as CreateRoomPage } from "./components/createroom_page";

addLocaleData([...en, ...ko]);

interface IProps {
  lang: string;
  setLocale: (lang: string) => void;
}

const Router: React.SFC<IProps> = props => {
  return (
    <IntlProvider locale={props.lang} messages={locale[props.lang]}>
      <HashRouter>
        <div id="App">
          <Appbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signup/success" component={SignupSuccessPage} />
            <Route exact path="/room/:id" component={NovelPage} />
            <Route exact path="/create/room" component={CreateRoomPage} />
            <Route component={NotfoundPage} />
          </Switch>
          <footer />
        </div>
      </HashRouter>
    </IntlProvider>
  );
};

const mapStateToProps = (state: ICombineReducersState) => ({
  lang: state.locale.lang
});

export default connect(mapStateToProps)(Router);
