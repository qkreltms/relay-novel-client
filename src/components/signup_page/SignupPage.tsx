import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import axios from "axios";
import config from "../../config";

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
  setNickname: (nickname: string) => void;
  passwordVisibility: boolean;
  password: string;
  email: string;
  nickname: string;
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

  const handleSignupOnClick = () => {
    const body = {
      email: props.email,
      nickname: props.nickname,
      password: props.password
    };
    axios
      .post(`http://localhost:3001/api/users/`, body)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <FormControl
        className={classNames(props.classes.margin, props.classes.textField)}
      >
        <InputLabel error={false} htmlFor="adornment-password">
          <FormattedMessage id="signup_password" />
        </InputLabel>
        <Input
          name="password"
          error={false}
          id="adornment-password"
          type={props.passwordVisibility ? "text" : "password"}
          value={props.password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={handlePasswordVisibility}
              >
                {props.passwordVisibility ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl
        className={classNames(props.classes.margin, props.classes.textField)}
      >
        <InputLabel error={false} htmlFor="adornment-email">
          <FormattedMessage id="signup_email" />
        </InputLabel>
        <Input
          name="email"
          error={false}
          id="adornment-email"
          type="text"
          value={props.email}
          onChange={handleEmailChange}
        />
      </FormControl>
      <FormControl
        className={classNames(props.classes.margin, props.classes.textField)}
      >
        <InputLabel error={false} htmlFor="adornment-nickname">
          <FormattedMessage id="signup_nickname" />
        </InputLabel>
        <Input
          name="nickname"
          error={false}
          id="adornment-nickname"
          type="text"
          value={props.nickname}
          onChange={handleNicknameChange}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={props.classes.button}
        disabled={false}
        onClick={handleSignupOnClick}
      >
        <FormattedMessage id="signup_signup" />
      </Button>
    </div>
  );
};

(SignupPage as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(SignupPage);
