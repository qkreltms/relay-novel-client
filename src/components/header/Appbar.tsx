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
import { Link, withRouter } from "react-router-dom";
import { LoginDialogContainer } from "../common/login_dialog";

const styles = {
  grow: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  }
};

export interface IProps extends WithStyles<typeof styles> {
  // isLoggedIn: boolean;
  anchorElement: HTMLElement;
  setHtmlElementOnMenu: (anchorElement: HTMLElement) => void;
  setLocale: (lang: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  classes: any;
  match: any;
  location: any;
  history: any;
  isOpen: boolean;
}

const Appbar: React.SFC<IProps> = props => {
  const setLocale = (lang: string) => {
    localStorage.setItem("lang", lang);
    props.setLocale(lang);
  };

  const { classes } = props;
  const isProfileClicked = Boolean(props.anchorElement); // anchorElement가 값이 있을 경우
  const changeLanguageButtons = (
    <div>
      <Button onClick={() => setLocale("ko")}>한국어</Button>
      <Button onClick={() => setLocale("en")}>English</Button>
    </div>
  );

  const handlePopup = (event: React.MouseEvent<HTMLElement>) => {
    props.setHtmlElementOnMenu(event.currentTarget);
  };

  const handlePopupClose = () => {
    props.setHtmlElementOnMenu(null);
  };

  const handleMenuMyProfileClick = () => {
    handlePopupClose();
    props.history.push("/myprofile");
  };

  const handleSignupClick = () => {
    props.history.push("/signup");
  };

  const handleLoginClick = () => {
    props.setIsOpen(true);
  };

  const isLoggedIn = false;

  return (
    <div className={classes.root}>
      {props.isOpen ? <LoginDialogContainer /> : <div />}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/">
              <FormattedMessage id="title" />
            </Link>
          </Typography>
          {changeLanguageButtons}
          {isLoggedIn ? (
            <div>
              <IconButton
                aria-owns={isProfileClicked ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={handlePopup}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={props.anchorElement}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "top"
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top"
                }}
                open={isProfileClicked}
                onClose={handlePopupClose}
              >
                <MenuItem onClick={handleMenuMyProfileClick}>
                  <FormattedMessage id="appbar_menu_myprofile" />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button onClick={handleSignupClick}>
                <FormattedMessage id="appbar_signup" />
              </Button>
              <Button onClick={handleLoginClick}>
                <FormattedMessage id="appbar_login" />
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

(Appbar as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(Appbar));
