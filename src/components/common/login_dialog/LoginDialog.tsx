import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import DefaultInput from "../DefaultInput";
import PasswordInput from "../PasswordInput";
import axios from "axios";
import config from "../../../config";
import { User } from "../../../models";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setPassword: (password: string) => void;
  setPasswordVisibility: (passwordVisibility: boolean) => void;
  setEmail: (email: string) => void;
  setIsEmailDuplicated: (isEmailDuplicated: boolean) => void;
  DuplicatedEmail: () => void;
  passwordVisibility: boolean;
  password: string;
  email: string;
  isPasswordError: boolean;
  isEmailError: boolean;
  isEmailDuplicated: boolean;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLogin: boolean) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    },
    margin: {
      margin: theme.spacing.unit
    }
  });

const LoginDialog: React.SFC<IProps> = props => {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleOnLogin = () => {
    // axios.defaults.withCredentials = true
    const axiosconfig = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      email: props.email,
      password: props.password
    };
    axios.post(`${config.REACT_APP_SERVER_URL}/auth/session`,
    body, axiosconfig)
      .then(res => {
        props.setIsOpen(false);
        props.setIsLoggedIn(true);
        // props.setUser(res.data.message as User)
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    props.setPasswordVisibility(!props.passwordVisibility);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setEmail(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="login-dialog-slide-title"
        aria-describedby="login-dialog-slide-description"
        disableBackdropClick={true}
        keepMounted
      >
        <DialogTitle id="login-dialog-slide-title">
          <FormattedMessage id="logindialog_title" />
        </DialogTitle>
        <DialogContent>
          <DefaultInput
            classes={props.classes}
            isError={props.isEmailError}
            value={props.email}
            handleChange={handleEmailChange}
            formattedMessageId="signup_email"
            name="dialog_email"
          />
            
          <PasswordInput
            classes={props.classes}
            isPasswordError={props.isPasswordError}
            passwordVisibility={props.passwordVisibility}
            password={props.password}
            handlePasswordChange={handlePasswordChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="logindialog_cancle" />
          </Button>
          <Button onClick={handleOnLogin} color="primary">
            <FormattedMessage id="logindialog_ok" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

(LoginDialog as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(LoginDialog));
