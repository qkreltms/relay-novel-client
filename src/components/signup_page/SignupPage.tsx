import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage } from "react-intl";

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit,
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      flexBasis: 200,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  setPassword: (password: string) => void;
  setPasswordVisibility: (passwordVisibility: boolean) => void;
  passwordVisibility: boolean;
  password: string;
}

export const SignupPage: React.SFC<IProps> = (props) => {

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    props.setPasswordVisibility(!props.passwordVisibility);
  };

  return (
    <div>
      <FormControl
        className={classNames(props.classes.margin, props.classes.textField)}
      >
        <InputLabel htmlFor="adornment-password"><FormattedMessage id="signup_password" /></InputLabel>
        <Input
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
    </div>
  );
};

(SignupPage as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SignupPage);
