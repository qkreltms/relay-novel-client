import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const styles = {
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
};

export interface IProps extends WithStyles<typeof styles> {
  setLocale: (lang: string) => void;
}

export interface IState {
  isLoggedIn: boolean;
  anchorElement: null | HTMLElement;
}

class Appbar extends React.Component<IProps, IState> {
  public state: IState = {
    anchorElement: null,
    isLoggedIn: false,
  };

  public setLocale = (lang: string) => {
    localStorage.setItem("lang", lang);
    this.props.setLocale(lang);
}

  public render() {
    const { classes } = this.props;
    const { isLoggedIn, anchorElement } = this.state;
    const isProfileClicked = Boolean(anchorElement); // anchorElement가 값이 있을 경우
    const changeLanguageButtons =
    (<div>
      <Button onClick={() => this.setLocale("ko")}>한국어</Button>
      <Button onClick={() => this.setLocale("en")}>English</Button>
    </div>);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            <FormattedMessage id="title" />
            </Typography>
            { changeLanguageButtons }
            {isLoggedIn ? (
              <div>
                <IconButton
                  aria-owns={isProfileClicked ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handlePopup}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElement}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  open={isProfileClicked}
                  onClose={this.handlePopupClose}
                >
                  <MenuItem onClick={this.login}><FormattedMessage id="appbar_profile" /></MenuItem>
                  <MenuItem onClick={this.signup}><FormattedMessage id="appbar_myinfo" /></MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button>
                  <Link to="/signup"><FormattedMessage id="appbar_signup" /></Link>
                </Button>
                <Button>
                  <Link to="/login"><FormattedMessage id="appbar_login" /></Link>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private handlePopup = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorElement: event.currentTarget });
  }

  private handlePopupClose = () => {
    this.setState({ anchorElement: null });
  }

  private login = () => {
    this.handlePopupClose();
    // TODO: 페이지 이동
  }

  private signup = () => {
    this.handlePopupClose();
    // TODO: 페이지 이동
  }
}

(Appbar as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Appbar);
