import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

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

const NotfoundPage: React.SFC<IProps> = props => {
  const handleOnClick = () => {
    return props.history.push("/");
  };

  return (
    <div>
      <FormattedMessage id="notfound_msg" />
      <Button
        variant="contained"
        color="primary"
        className={props.classes.button}
        onClick={handleOnClick}
      >
        <FormattedMessage id="notfound_gohomepage" />
      </Button>
    </div>
  );
};

(NotfoundPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(NotfoundPage));
