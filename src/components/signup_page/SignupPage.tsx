import {
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import axios from "axios";
import config from "../../config";
import { FormLabel } from "@material-ui/core";
import PasswordInput from "../common/PasswordInput";
import DefaultInput from "../common/DefaultInput";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    },
    margin: {
      margin: theme.spacing.unit
    },
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      flexBasis: 200
    }
  });

interface IProps extends WithStyles<typeof styles> {
  setPassword: (password: string) => void;
  setPasswordVisibility: (passwordVisibility: boolean) => void;
  setEmail: (email: string) => void;
  setIsEmailDuplicated: (isEmailDuplicated: boolean) => void;
  DuplicatedEmail: () => void;
  setNickname: (nickname: string) => void;
  passwordVisibility: boolean;
  password: string;
  email: string;
  nickname: string;
  isPasswordError: boolean;
  isNicknameError: boolean;
  isEmailError: boolean;
  isEmailDuplicated: boolean;
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

  const checkEmpty = ():boolean => {
    if (props.nickname.length <= 0) return true;
    if (props.password.length <= 0) return true;
    if (props.email.length <= 0) return true;
    return false;
  }

  const handleSignupOnClick = () => {
    const body = {
      email: props.email,
      nickname: props.nickname,
      password: props.password
    };
    axios
      .post(`${config.REACT_APP_SERVER_URL}/users/`, body)
      .then(res => {
        console.log(res);
        //회원가입 성공 화면이동 하기
      })
      .catch(err => {
        console.log(err.response.data);

        const message = err.response.data.message;
        if (message.includes("User")) {
          return props.setIsEmailDuplicated(true);
        }

        return props.setIsEmailDuplicated(false);
      });
  };

  return (
    <div>
      <DefaultInput
        classes={props.classes}
        isError={props.isEmailError}
        value={props.email}
        handleChange={handleEmailChange}
        formattedMessageId="signup_email"
        name="email"
      />

      <DefaultInput
        classes={props.classes}
        isError={props.isNicknameError}
        value={props.nickname}
        handleChange={handleNicknameChange}
        formattedMessageId="signup_nickname"
        name="nickname"
      />

      <PasswordInput
        classes={props.classes}
        isPasswordError={props.isPasswordError}
        passwordVisibility={props.passwordVisibility}
        password={props.password}
        handlePasswordChange={handlePasswordChange}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      <Button
        variant="contained"
        color="primary"
        className={props.classes.button}
        disabled={
          checkEmpty() ||
          props.isEmailError ||
          props.isEmailDuplicated ||
          props.isEmailError ||
          props.isNicknameError ||
          props.isPasswordError
        }
        onClick={handleSignupOnClick}
      >
        <FormattedMessage id="signup_signup" />
      </Button>
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

export default withStyles(styles)(SignupPage);
