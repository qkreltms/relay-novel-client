import React from "react";
import { FormattedMessage } from "react-intl";
import {
  FormControl,
  withStyles,
  Theme,
  createStyles,
  InputLabel,
  Select
} from "@material-ui/core";
import PropTypes from "prop-types";

interface IProps {
  classes: any;
  value: string;
  handleValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  formattedMessageId: string;
  options: Array<any>;
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    }
  });

const CustomSelects: React.SFC<IProps> = props => {
  const classes = props.classes;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="genre">
        <FormattedMessage id={props.formattedMessageId} />
      </InputLabel>
      <Select native value={props.value} onChange={props.handleValueChange}>
        <option value="" />
        {props.options.map(i => {
          <FormattedMessage id={i.id}>
            {(text: string) => <option value={i.value}>{text}</option>}
          </FormattedMessage>;
        })}
      </Select>
    </FormControl>
  );
};

(CustomSelects as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomSelects);
