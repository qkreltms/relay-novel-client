import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomButton from "../common/CustomButton";
import { LoginDialogContainer } from "../common/login_dialog";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    },
    root: {
      paddingTop: "25vh",
      textAlign: "center"
    }
  });

const SignupSuccessPage: React.SFC<IProps> = props => {
  const handleGoHomePageClick = () => {
    return props.history.push("/");
  };

  const handleLoginClick = () => {
    return props.setIsDialogOpen(true);
  };

  const { classes } = props;
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <FormattedMessage id="signupsuccess_success" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            onClick={handleGoHomePageClick}
            formattedMessageId="signupsuccess_btn"
          />
          <CustomButton
            onClick={handleLoginClick}
            formattedMessageId="signupsuccess_login"
          />
        </Grid>
      </Grid>
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
