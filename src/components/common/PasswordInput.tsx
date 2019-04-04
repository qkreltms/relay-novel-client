import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  withStyles,
  createStyles,
  Theme
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import PropTypes from "prop-types";

interface IProps {
  classes: any;
  isPasswordError: boolean;
  passwordVisibility: boolean;
  password: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordVisibility: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit
    },
    textField: {
      flexBasis: 200
    }
  });

const PasswordForm: React.SFC<IProps> = props => {
  return (
    <FormControl
      className={classNames(props.classes.margin, props.classes.textField)}
    >
      <InputLabel error={props.isPasswordError} htmlFor="adornment-password">
        <FormattedMessage id="signup_password" />
      </InputLabel>
      <Input
        name="password"
        error={props.isPasswordError}
        id="adornment-password"
        type={props.passwordVisibility ? "text" : "password"}
        value={props.password}
        onChange={props.handlePasswordChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.handlePasswordVisibility}
            >
              {props.passwordVisibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

(PasswordForm as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(PasswordForm);
