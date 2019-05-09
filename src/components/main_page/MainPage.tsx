import React from "react";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  Tabs,
  Tab,
  AppBar,
  NoSsr
} from "@material-ui/core";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { CreateRoomPageContainer as CreateRoomPage } from "../createroom_page";
import { TodayNovelPageContainer as TodayNovelPage } from "../today_novel_page";
import { HomePageContainer as HomePage } from "../home_page";
import { FormattedMessage } from "react-intl";
import { LoginDialogContainer as LoginDialog } from "../common/login_dialog";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1
    }
  });

interface IProps extends WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
  classes: any;
  isLoggedIn: boolean;
}

interface IState {
  value: number;
}

class MainPage extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  private handleTabsChange = (value: number) => (
    event: React.ChangeEvent<{ checked: boolean }>
  ) => {
    this.setState({ value });
  };

  public render() {
    const { classes } = this.props;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              indicatorColor="secondary"
              textColor="primary"
            >
              <FormattedMessage id="mainpage_home">
                {(text: string) => (
                  <Tab label={text} onChange={this.handleTabsChange(0)} />
                )}
              </FormattedMessage>
              <FormattedMessage id="mainpage_latest_novel">
                {(text: string) => (
                  <Tab label={text} onChange={this.handleTabsChange(1)} />
                )}
              </FormattedMessage>
              <FormattedMessage id="mainpage_create_room">
                {(text: string) => (
                  <Tab label={text} onChange={this.handleTabsChange(2)} />
                )}
              </FormattedMessage>
            </Tabs>
          </AppBar>
          {this.state.value === 0 && <HomePage />}
          {this.state.value === 1 && <TodayNovelPage />}
          {this.state.value === 2 && <CreateRoomPage />}
        </div>
      </NoSsr>
    );
  }
}

(MainPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(MainPage));
