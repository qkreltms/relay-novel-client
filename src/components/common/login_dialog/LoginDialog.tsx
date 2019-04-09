import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormLabel
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../CustomInput";
import CustomPasswordInput from "../CustomPasswordInput";
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
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  setPassword: (password: string) => void;
  setPasswordVisibility: (passwordVisibility: boolean) => void;
  setEmail: (email: string) => void;
  passwordVisibility: boolean;
  password: string;
  email: string;
  isPasswordError: boolean;
  isEmailError: boolean;
  setUser: (user: User) => void;
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

class LoginDialog extends React.Component<IProps> {
  public componentDidMount() {
    this.initProps();
  }

  public componentWillUnmount() {
    this.initProps();
  }

  private initProps = () => {
    this.props.setEmail("");
    this.props.setIsEmailDuplicated(false);
    this.props.setPassword("");
    this.props.setPasswordVisibility(false);
  };

  private handleOnClose = () => {
    this.props.setIsDialogOpen(false);
    this.props.setPassword("");
    this.props.setEmail("");
  };

  private handleOnLogin = () => {
    if (this.props.email.length <= 0) return;
    if (this.props.password.length <= 0) return;

    const body = {
      email: this.props.email,
      password: this.props.password
    };

    axios
      .post(
        `${config.REACT_APP_SERVER_URL}/api/auth/session`,
        body,
        axiosConfig
      )
      .then(res => {
        this.props.setIsDialogOpen(false);
        this.props.setIsLoggedIn(true);
        this.props.setUser(res.data.message as User);
        this.props.setPassword("");
        this.props.setEmail("");
        console.log("로그인 성공");
        console.log(res);
      })
      .catch(err => {
        //패스워드 혹은 이메일 틀림
        const res = err.response;
        if (res.data.message.includes("username")) {
          this.props.setIsEmailDuplicated(true);
        }
        console.log(res);
      });
  };

  private handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setPassword(event.target.value);
  };

  private handlePasswordVisibility = () => {
    this.props.setPasswordVisibility(!this.props.passwordVisibility);
  };

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setEmail(event.target.value);
  };
  public render() {
    return (
      <div>
        <Dialog
          open={this.props.isDialogOpen}
          onClose={this.handleOnClose}
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
              isError={this.props.isEmailError}
              value={this.props.email}
              handleChange={this.handleEmailChange}
              formattedMessageId="signup_email"
              name="dialog_email"
            />

            <CustomPasswordInput
              name="login_dialog_password_input"
              isError={this.props.isPasswordError}
              isVisible={this.props.passwordVisibility}
              value={this.props.password}
              handleChange={this.handlePasswordChange}
              handleVisibility={this.handlePasswordVisibility}
            />
            <FormLabel>
              {this.props.isEmailDuplicated ? (
                <FormattedMessage id="logindialog_notexistsemail" />
              ) : this.props.isPasswordError ? (
                <FormattedMessage id="signup_errPassword" />
              ) : this.props.isEmailError ? (
                <FormattedMessage id="signup_errEmail" />
              ) : (
                <div />
              )}
            </FormLabel>
          </DialogContent>
          <DialogActions>
            <CustomButton
              onClick={this.handleOnClose}
              formattedMessageId="logindialog_cancle_btn"
            />
            <CustomButton
              onClick={this.handleOnLogin}
              formattedMessageId="logindialog_ok_btn"
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

(LoginDialog as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(LoginDialog));
