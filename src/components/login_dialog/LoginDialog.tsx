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
  FormLabel,
  Grid,
  Typography,
  IconButton,
  Divider
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../CustomInput";
import CustomPasswordInput from "../CustomPasswordInput";
import axios from "axios";
import config from "../../config";
import { User } from "../../models";
import axiosConfig from "../../config/axios";
import CustomButton from "../CustomButton";
import facebookImg from "../../static/images/facebook.svg";

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
  setIsIncorrectEmail: (isIncorrectEmail: boolean) => void;
  isIncorrectEmail: boolean;
  isIncorrectPassword: boolean;
  setIsIncorrectPassword: (isIncorrectPassword: boolean) => void;
  initAuth: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    facebookIcon: {
      width: "35px",
      height: "35px"
    },
    otherPlatformAuthentication: {
      textAlign: "center",
      padding: "1vh"
    },
    divider: {
      marginTop: "1vh"
    }
  });

class LoginDialog extends React.Component<IProps> {
  public componentWillUnmount() {
    this.props.initAuth();
  }

  private handleOnClose = () => {
    this.props.setIsDialogOpen(false);
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
        console.log("로그인 성공");
        // TODO: 유저정보가 persist되면 리로드로 바꾸기
        return this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        if (!err.response) return;
        //패스워드 혹은 이메일 틀릴때 예외처리
        console.log(err.response);
        if (err.response.data.message.includes("username"))
          this.props.setIsIncorrectEmail(true);
        if (err.response.data.message.includes("password"))
          this.props.setIsIncorrectPassword(true);
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
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Dialog
            open={this.props.isDialogOpen}
            onClose={this.handleOnClose}
            aria-labelledby="login-dialog-slide-title"
            aria-describedby="login-dialog-slide-description"
            disableBackdropClick={true}
            keepMounted
          >
            <Grid item xs={12}>
              <DialogTitle id="login-dialog-slide-title">
                <FormattedMessage id="logindialog_title" />
              </DialogTitle>
            </Grid>

            <DialogContent>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} className={classes.divider}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.otherPlatformAuthentication}
              >
                <Typography inline>
                  <FormattedMessage id="or" />
                </Typography>
                <IconButton>
                  <img
                    className={classes.facebookIcon}
                    src={facebookImg}
                    alt="facebook"
                  />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>
                  {this.props.isIncorrectPassword ? (
                    <FormattedMessage id="logindialog_incorrect_password" />
                  ) : this.props.isIncorrectEmail ? (
                    <FormattedMessage id="logindialog_notexists_email" />
                  ) : this.props.isPasswordError ? (
                    <FormattedMessage id="signup_err_password" />
                  ) : this.props.isEmailError ? (
                    <FormattedMessage id="signup_err_email" />
                  ) : (
                    <div />
                  )}
                </FormLabel>
              </Grid>
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
        </Grid>
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
