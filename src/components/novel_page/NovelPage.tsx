import React from "react";
import { FormattedMessage } from "react-intl";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
}

const styles = (theme: Theme) => createStyles({});

const NovelPage: React.SFC<IProps> = props => {
  console.log(props);
  console.log(props.match);

  return <div>소설 페이지</div>;
};

(NovelPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(NovelPage));
