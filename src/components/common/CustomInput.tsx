import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

interface IProps {
  classes: any;
  isError?: boolean;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formattedMessageId: string;
  name: string;
  multiline?: boolean;
  rows?: string | number;
}

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit
    },
    textField: {
      flexBasis: 200
    },
  });

const CustomInput: React.SFC<IProps> = props => {
  return (
    <FormControl
      className={classNames(props.classes.margin, props.classes.textField)}
    >
      <InputLabel error={props.isError} htmlFor={`adornment-${props.name}`}>
        <FormattedMessage id={props.formattedMessageId} />
      </InputLabel>
      <Input
        multiline={props.multiline || false}
        name={props.name}
        error={props.isError}
        id={`adornment-${props.name}`}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        rows={props.rows || 1}
      />
    </FormControl>
  );
};

(CustomInput as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomInput);
