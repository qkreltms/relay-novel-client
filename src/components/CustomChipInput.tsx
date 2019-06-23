import React from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import ChipInput from "material-ui-chip-input";

interface IProps {
  classes: any;
  allowDuplicates?: boolean;
  fullWidth?: boolean;
  formattedMessageId: string;
  placeholder?: string;
  onAdd: (chip: string) => void;
  onDelete: (chip: string, index: number) => void;
  value: Array<string>;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    inputRoot: {},
    input: {},
    chipContainer: {},
    label: {},
    helperText: {},
    chip: {}
  });

const CustomButton: React.SFC<IProps> = props => {
  return (
    <ChipInput
      placeholder={props.placeholder}
      allowDuplicates={props.allowDuplicates || false}
      classes={props.classes}
      fullWidth={props.fullWidth || false}
      label={<FormattedMessage id={props.formattedMessageId}/>}
      value={props.value}
      onAdd={props.onAdd}
      onDelete={props.onDelete}
    />
  );
};

(CustomButton as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomButton);
