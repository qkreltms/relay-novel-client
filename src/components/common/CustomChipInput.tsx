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
  onChange: (chip: string) => void;
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
      allowDuplicates={props.allowDuplicates || false}
      classes={props.classes}
      fullWidth={props.fullWidth || false}
      label={<FormattedMessage id={props.formattedMessageId}/>}
      onChange={(chips: Array<string>) => {
          props.onChange(chips.join(''))
      }}
    />
  );
};

(CustomButton as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomButton);
