import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  Button,
  ListItem,
  ListItemText,
  List
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { Novel } from "../../models";

interface IProps {
  classes: any;
  handleThumbUpClick?: () => void;
  handleThumbDownClick?: () => void;
  novels: Array<Novel>;
  isSecondListVisible?: boolean;
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
    sentence: {
      wordWrap: "break-word",
      whiteSpace: "pre-wrap"
    },
    sentenceActionButtons: {
      textAlign: "end",
      padding: "0px 37px"
    }
  });

const CustomList: React.SFC<IProps> = props => {
  const { classes } = props;
  const isSecondListVisible = props.isSecondListVisible || false;

  return (
    <List disablePadding>
      {props.novels.map((novel, index) => (
        <div key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText 
              primary={<p className={classes.sentence}>{novel.text}</p>}
            />
          </ListItem>
          {isSecondListVisible ? (
            <div className={classes.sentenceActionButtons}>
              <Button>
                <ThumbUp fontSize="small" />
              </Button>
              <span>{novel.like}</span>
              <Button>
                <ThumbDown fontSize="small" />
              </Button>
              <span>{novel.dislike}</span>
            </div>
          ) : (
            <div />
          )}
        </div>
      ))}
    </List>
  );
};

(CustomList as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomList);
