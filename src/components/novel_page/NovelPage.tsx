import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Novel } from "../../models";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
  novel: string;
  novels: Array<Novel>;
  fetchNovels: (skip: number, limit: number, roomId: number) => void;
  setNovels: (msg: string) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing.unit * 2
    },
  });

class NovelPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.fetchNovels(0, 30, 50);
  }

  public componentWillUnmount() {
    // TOOD: state 초기화 액션
  }

  public render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container alignItems="stretch" direction="row">
            <Grid xs={3} item>
              <Paper className={classes.paper}>test1</Paper>
            </Grid>
            <Grid xs={9} item>
              <Paper className={classes.paper}>test2</Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={3} item>
              <Paper className={classes.paper}>test3</Paper>
            </Grid>
            <Grid xs={9} item>
              <Paper className={classes.paper}>test4</Paper>
            </Grid>
          </Grid>
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
