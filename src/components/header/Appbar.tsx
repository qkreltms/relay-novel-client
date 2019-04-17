import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
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
import axios from "axios";
import config from "../../config";
import axiosConfig from "../../config/axios";
import { User, newUser } from "../../models";
import CustomButton from "../common/CustomButton";

const styles = {
  grow: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  }
};

export interface IProps extends WithStyles<typeof styles> {
  anchorElement: HTMLElement;
  setHtmlElementOnMenu: (anchorElement: HTMLElement) => void;
  setLocale: (lang: string) => void;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  classes: any;
  match: any;
  location: any;
  history: any;
  isDialogOpen: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User;
  setUser: (user: User) => void;
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
      <CustomButton
        onClick={() => setLocale("ko")}
        formattedMessageId="appbar_ko_btn"
      />
      <CustomButton
        onClick={() => setLocale("en")}
        formattedMessageId="appbar_en_btn"
      />
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
    props.setIsDialogOpen(true);
  };

  const handleMenuLogoutClick = () => {
    axios
      .get(`${config.REACT_APP_SERVER_URL}/api/auth/session`, axiosConfig)
      .then(res => {
        if (res.data.status === "success") {
          props.setUser(newUser());
          props.setIsLoggedIn(false);
          return location.reload();
        }
      })
      .catch(err => {
        console.log("로그아웃 실패", err.response);
      })
      .finally(() => {
        props.setHtmlElementOnMenu(null);
      });
  };

  return (
    <div className={classes.root}>
      {props.isDialogOpen ? <LoginDialogContainer /> : <div />}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/">
              <FormattedMessage id="title" />
            </Link>
          </Typography>
          {changeLanguageButtons}
          {props.isLoggedIn ? (
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
                <MenuItem onClick={handleMenuLogoutClick}>
                  <FormattedMessage id="appbar_menu_logout" />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <CustomButton
                onClick={handleSignupClick}
                formattedMessageId="appbar_signup_btn"
              />
              <CustomButton
                onClick={handleLoginClick}
                formattedMessageId="appbar_login_btn"
              />
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
