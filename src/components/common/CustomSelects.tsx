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
import { Option } from "../../models/option";

interface IProps {
  classes: any;
  value: string;
  handleValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  formattedMessageId: string;
  options: Array<Option>;
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    }
  });
// TODO: 코드 리펙토링 id, value 
const CustomSelects: React.SFC<IProps> = props => {
  const classes = props.classes;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="genre">
        <FormattedMessage id={props.formattedMessageId} />
      </InputLabel>
      <Select native value={props.value} onChange={props.handleValueChange}>
        <option value="" />
        {props.options.map((o: Option, index: number) => (
          <FormattedMessage key={index} id={o.id}>
            {(text) => <option value={o.value}>{text}</option>}
          </FormattedMessage>
        ))}
      </Select>
    </FormControl>
  );
};

(CustomSelects as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomSelects);
