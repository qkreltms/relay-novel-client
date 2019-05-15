import React from "react";
import { FormattedMessage } from "react-intl";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  withStyles,
  Theme,
  createStyles,
  FormGroup
} from "@material-ui/core";
import { RadioContents } from "../../models";
import PropTypes from "prop-types";

interface IProps {
  classes: any;
  value: string;
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioContents: Array<RadioContents>;
  formattedMessageId: string;
}

const styles = (theme: Theme) => createStyles({
  radioLabel: {
    margin: "auto"
  }
});

const CustomRadioButtons: React.SFC<IProps> = props => {
  const { classes } = props;
  
  return (
    <FormGroup row>
      <FormLabel className={classes.radioLabel}>
        <FormattedMessage id={props.formattedMessageId} />
      </FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={props.value}
        onChange={props.handleValueChange}
        row
      >
        {props.radioContents.map((radioContent, index) => (
          <FormControlLabel
            key={index}
            value={radioContent.value}
            control={<Radio color="primary" checked={radioContent.value === props.value} />}
            label={radioContent.label}
            labelPlacement={radioContent.labelPlacement}
          />
        ))}
      </RadioGroup>
    </FormGroup>
  );
};

(CustomRadioButtons as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomRadioButtons);
