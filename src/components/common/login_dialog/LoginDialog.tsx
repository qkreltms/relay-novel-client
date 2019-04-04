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
  FormLabel
  // Slide
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../CustomInput";
import PasswordInput from "../PasswordInput";
import axios from "axios";
import config from "../../../config";
import { User } from "../../../models";
import axiosConfig from "../../../config/axios";
import CustomButton from "../CustomButton";

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
  passwordVisibility: boolean;
  password: string;
  email: string;
  isPasswordError: boolean;
  isEmailError: boolean;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLogin: boolean) => void;
  duplicatedEmail: (email: string) => boolean;
  setIsEmailDuplicated: (duplicated: boolean) => void;
  isEmailDuplicated: boolean;
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
  const handleOnClose = () => {
    props.setIsOpen(false);
    props.setPassword("");
    props.setEmail("");
  };

  const handleOnLogin = () => {
    if (props.email.length <= 0) {
      return;
    }
    if (props.password.length <= 0) {
      return;
    }

    const body = {
      email: props.email,
      password: props.password
    };

    axios
      .post(`${config.REACT_APP_SERVER_URL}/auth/session`, body, axiosConfig)
      .then(res => {
        props.setIsOpen(false);
        props.setIsLoggedIn(true);
        props.setUser(res.data.message as User);
        props.setPassword("");
        props.setEmail("");
        console.log("로그인 성공");
        console.log(res);
      })
      .catch(err => {
        //패스워드 혹은 이메일 틀림
        const res = err.response;
        if (res.data.message.includes("username")) {
          props.setIsEmailDuplicated(true);
        }
        console.log(res);
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

  // const TransitionComponent = props => <Slide direction="up" {...props} />;

  return (
    <div>
      <Dialog
        open={props.isOpen}
        // TransitionComponent={TransitionComponent}
        onClose={handleOnClose}
        aria-labelledby="login-dialog-slide-title"
        aria-describedby="login-dialog-slide-description"
        disableBackdropClick={true}
        keepMounted
      >
        <DialogTitle id="login-dialog-slide-title">
          <FormattedMessage id="logindialog_title" />
        </DialogTitle>
        <DialogContent>
          <CustomInput
            isError={props.isEmailError}
            value={props.email}
            handleChange={handleEmailChange}
            formattedMessageId="signup_email"
            name="dialog_email"
          />

          <PasswordInput
            isPasswordError={props.isPasswordError}
            passwordVisibility={props.passwordVisibility}
            password={props.password}
            handlePasswordChange={handlePasswordChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <FormLabel>
            {props.isEmailDuplicated ? (
              <FormattedMessage id="logindialog_notexistsemail" />
            ) : props.isPasswordError ? (
              <FormattedMessage id="signup_errPassword" />
            ) : props.isEmailError ? (
              <FormattedMessage id="signup_errEmail" />
            ) : (
              <div />
            )}
          </FormLabel>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleOnClose}
            formattedMessageId="logindialog_cancle_btn"
          />
          <CustomButton
            onClick={handleOnLogin}
            formattedMessageId="logindialog_ok_btn"
          />
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
