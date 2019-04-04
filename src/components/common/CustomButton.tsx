import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  Button
} from "@material-ui/core";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

interface IProps {
  classes: any;
  isDisable?: boolean;
  onClick: () => void;
  formattedMessageId: string;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    }
  });

const CustomButton: React.SFC<IProps> = props => {
  return (
    <Button
      variant="contained"
      color="primary"
      className={props.classes.button}
      disabled={props.isDisable || false}
      onClick={props.onClick}
    >
      <FormattedMessage id={props.formattedMessageId} />
    </Button>
  );
};

(CustomButton as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomButton);
