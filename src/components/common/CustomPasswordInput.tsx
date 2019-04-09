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
  isError?: boolean;
  isVisible: boolean;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVisibility: () => void;
  name: string;
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
      <InputLabel error={props.isError} htmlFor={`adornment-${name}`}>
        <FormattedMessage id="signup_password" />
      </InputLabel>
      <Input
        name={props.name}
        error={props.isError}
        id={`adornment-${name}`}
        type={props.isVisible ? "text" : "password"}
        value={props.value}
        onChange={props.handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={props.handleVisibility}
            >
              {props.isVisible ? <Visibility /> : <VisibilityOff />}
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
