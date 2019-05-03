import {
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import config from "../../config";
import { FormLabel } from "@material-ui/core";
import CustomPasswordInput from "../common/CustomPasswordInput";
import CustomInput from "../common/CustomInput";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../common/CustomButton";

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit
    },
    root: {
      display: "flex",
      flexWrap: "wrap"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  initAuth: () => void;
  setPassword: (password: string) => void;
  setPasswordVisibility: (passwordVisibility: boolean) => void;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setIsEmailError: (isError: boolean) => void;
  setIsPasswordError: (isError: boolean) => void;
  setIsEmailDuplicated: (isDuplicated: boolean) => void;
  setIsNicknameError: (isError: boolean) => void;
  isEmailDuplicated: boolean;
  isDialogOpen: boolean;
  passwordVisibility: boolean;
  password: string;
  email: string;
  nickname: string;
  isPasswordError: boolean;
  isNicknameError: boolean;
  isEmailError: boolean;
  isIncorrectEmail: boolean;
  match: any;
  location: any;
  history: any;
  classes: any;
}

class SignupPage extends React.Component<IProps> {
  public componentWillUnmount() {
    this.props.initAuth();
  }

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

  private handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setNickname(event.target.value);
  };

  private handleSignupClick = () => {
    if (this.props.nickname.length === 0) this.props.setIsNicknameError(true); 
    if (this.props.password.length === 0) this.props.setIsPasswordError(true); 
    if (this.props.email.length === 0) this.props.setIsEmailError(true); 

    if (this.props.nickname.length === 0 || this.props.password.length === 0 || this.props.email.length === 0) return;
    
    const body = {
      email: this.props.email,
      nickname: this.props.nickname,
      password: this.props.password
    };
    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/auth/local`, body)
      .then(res => {
        return this.props.history.push("/signup/success");
      })
      .catch(err => {
        console.log(err.response);
        if (!err.response) return;

        const message = err.response.data.message;
        if (typeof message === "string" && message.includes("User")) return this.props.setIsEmailDuplicated(true);
        else return this.props.setIsEmailDuplicated(false);
      });
  };

  public render() {
    return (
      <div>
        <CustomInput
          isError={this.props.isDialogOpen ? false : this.props.isEmailError}
          value={this.props.isDialogOpen ? "" : this.props.email}
          handleChange={this.handleEmailChange}
          formattedMessageId="signup_email"
          name="email"
        />

        <CustomInput
          isError={this.props.isDialogOpen ? false : this.props.isNicknameError}
          value={this.props.isDialogOpen ? "" : this.props.nickname}
          handleChange={this.handleNicknameChange}
          formattedMessageId="signup_nickname"
          name="nickname"
        />

        <CustomPasswordInput
          name="signup_password_input"
          isError={this.props.isDialogOpen ? false : this.props.isPasswordError}
          isVisible={this.props.passwordVisibility}
          value={this.props.isDialogOpen ? "" : this.props.password}
          handleChange={this.handlePasswordChange}
          handleVisibility={this.handlePasswordVisibility}
        />

        <CustomButton
          onClick={this.handleSignupClick}
          formattedMessageId="signup_btn"
        />
        <FormLabel>
          {this.props.isDialogOpen ? (
            <div />
          ) : this.props.isEmailDuplicated ? (
            <FormattedMessage id="signup_duplicated_email" />
          ) : this.props.isPasswordError ? (
            <FormattedMessage id="signup_err_password" />
          ) : this.props.isEmailError ? (
            <FormattedMessage id="signup_err_email" />
          ) : this.props.isNicknameError ? (
            <FormattedMessage id="signup_err_nickname" />
          ) : (
            <div />
          )}
        </FormLabel>
      </div>
    );
  }
}

(SignupPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(SignupPage));
