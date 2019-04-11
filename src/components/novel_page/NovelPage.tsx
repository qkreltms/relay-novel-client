import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Novel } from "../../models";
import { ThumbUp, ThumbDown } from "@material-ui/icons";

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
    }
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
            <Grid xs={3} item />
            <Grid xs={9} item>
              {/* limit 넘을시 disable 됨 */}
              <Button>글쓰기 참가</Button>
              <Button>구독</Button>
            </Grid>
          </Grid>
          <Grid container>
            {/* 댓글 */}
            <Grid xs={3} item>
              <Paper className={classes.paper}>댓글 들어갈 부분</Paper>
            </Grid>
            {/* 소설 글 */}
            <Grid xs={9} item>
              <List>
                {this.props.novels.map((novel, index) => (
                  <ListItem alignItems="flex-start" key={index} role={undefined}>
                    <ListItemText primary={<span>{novel.text}</span>} />
                    <ListItemSecondaryAction>
                      <Button>
                      <ThumbUp />
                      </Button>
                      <span>{novel.like}</span>
                      <Button>
                      <ThumbDown />
                      </Button>
                      <span>{novel.dislike}</span>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
