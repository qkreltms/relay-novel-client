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
import CustomButton from "../../components/CustomButton";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "25vh",
      textAlign: "center"
    }
  });

const NotFoundPage: React.SFC<IProps> = props => {
  const handleGoHomePageClick = () => {
    return props.history.push("/");
  };

  const { classes } = props;
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <FormattedMessage id="notfound_msg" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            onClick={handleGoHomePageClick}
            formattedMessageId="notfound_btn"
          />
        </Grid>
      </Grid>
    </div>
  );
};

(NotFoundPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(NotFoundPage));
