import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomButton from "../common/CustomButton";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    }
  });

const SignupSuccessPage: React.SFC<IProps> = props => {
  const handleGoHomePageClick = () => {
    return props.history.push("/");
  };

  return (
    <div>
      <FormattedMessage id="signupsuccess_success" />
      <CustomButton
        onClick={handleGoHomePageClick}
        formattedMessageId="signupsuccess_btn"
      />
    </div>
  );
};

(SignupSuccessPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(SignupSuccessPage));
