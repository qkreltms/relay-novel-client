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
import PasswordInput from "../common/PasswordInput";
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
  setPassword: (password: string) => void;
  setPasswordVisibility: (passwordVisibility: boolean) => void;
  setEmail: (email: string) => void;
  setIsEmailDuplicated: (isEmailDuplicated: boolean) => void;
  setNickname: (nickname: string) => void;
  passwordVisibility: boolean;
  password: string;
  email: string;
  nickname: string;
  isPasswordError: boolean;
  isNicknameError: boolean;
  isEmailError: boolean;
  isEmailDuplicated: boolean;
  match: any;
  location: any;
  history: any;
  classes: any;
}

export const SignupPage: React.SFC<IProps> = props => {
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    props.setPasswordVisibility(!props.passwordVisibility);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setEmail(event.target.value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setNickname(event.target.value);
  };

  const isEmpty = (): boolean => {
    if (props.nickname.length <= 0) return true;
    if (props.password.length <= 0) return true;
    if (props.email.length <= 0) return true;
    return false;
  };

  const handleSignupClick = () => {
    const body = {
      email: props.email,
      nickname: props.nickname,
      password: props.password
    };
    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/users/`, body)
      .then(res => {
        return props.history.push("/signup/success");
      })
      .catch(err => {
        if (err.response) {
          const message = err.response.data.message;
          if (message.includes("User")) {
            return props.setIsEmailDuplicated(true);
          }

          return props.setIsEmailDuplicated(false);
        }
        console.log(err);
      });
  };

  return (
    <div>
      <CustomInput
        isError={props.isEmailError}
        value={props.email}
        handleChange={handleEmailChange}
        formattedMessageId="signup_email"
        name="email"
      />

      <CustomInput
        isError={props.isNicknameError}
        value={props.nickname}
        handleChange={handleNicknameChange}
        formattedMessageId="signup_nickname"
        name="nickname"
      />

      <PasswordInput
        isPasswordError={props.isPasswordError}
        passwordVisibility={props.passwordVisibility}
        password={props.password}
        handlePasswordChange={handlePasswordChange}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      <CustomButton
        onClick={handleSignupClick}
        formattedMessageId="signup_btn"
        isDisable={
          isEmpty() ||
          props.isEmailError ||
          props.isEmailDuplicated ||
          props.isEmailError ||
          props.isNicknameError ||
          props.isPasswordError
        }
      />
      <FormLabel>
        {props.isEmailDuplicated ? (
          <FormattedMessage id="signup_duplicatedEmail" />
        ) : props.isPasswordError ? (
          <FormattedMessage id="signup_errPassword" />
        ) : props.isEmailError ? (
          <FormattedMessage id="signup_errEmail" />
        ) : props.isNicknameError ? (
          <FormattedMessage id="signup_errNickname" />
        ) : (
          <div />
        )}
      </FormLabel>
    </div>
  );
};

(SignupPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(SignupPage));
