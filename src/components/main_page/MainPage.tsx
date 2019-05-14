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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    contents: {
      width: "90%",
      margin: "0 auto",
      overflow: "visible"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
  classes: any;
  isLoggedIn: boolean;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

class MainPage extends React.Component<IProps> {
  private handleTabsChange = (pageNumber: number) => (
    event: React.ChangeEvent<{ checked: boolean }>
  ) => {
    this.props.setPageNumber(pageNumber);
  };

  public render() {
    const { classes } = this.props;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={this.props.pageNumber}
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
              {this.props.isLoggedIn && (
                <FormattedMessage id="mainpage_create_room">
                  {(text: string) => (
                    <Tab label={text} onChange={this.handleTabsChange(2)} />
                  )}
                </FormattedMessage>
              )}
            </Tabs>
          </AppBar>
          <div className={classes.contents}>
            {this.props.pageNumber === 0 && <HomePage />}
            {this.props.pageNumber === 1 && <TodayNovelPage />}
            {this.props.pageNumber === 2 && <CreateRoomPage />}
          </div>
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
