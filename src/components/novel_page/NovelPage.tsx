import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper
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
    root: {
      flexGrow: 1,
      height: "100%"
    },
    paper: {
      color: theme.palette.text.secondary,
      height: "100%"
    }
  });

class NovelPage extends React.Component<IProps> {
  public componentWillUnmount() {
    // TOOD: state 초기화 액션
  }

  public render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>test</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>test</Paper>
        </Grid>
      </Grid>
    );
  }
}

(NovelPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(NovelPage));
