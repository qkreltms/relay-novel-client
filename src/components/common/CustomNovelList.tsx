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

interface IState {
  selectedIndex: number;
}

class CustomList extends React.Component<IProps, IState> {
  private classes;

  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      selectedIndex: -1
    };
  }

  private handleMouseEnter = (index: number) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    this.setState({
      selectedIndex: index
    });
  };

  private handleMouseLeave = () => {
    this.setState({
      selectedIndex: -1
    });
  };

  private isSecondListVisible = (index: number) => {
    if (this.state.selectedIndex === index) return true;
    return false;
  };

  public render() {
    return (
      <List disablePadding>
        {this.props.novels.map((novel, index) => (
          <div
            key={index}
            onMouseEnter={this.handleMouseEnter(index)}
            onMouseLeave={this.handleMouseLeave}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<p className={this.classes.sentence}>{novel.text}</p>}
              />
            </ListItem>
            {this.isSecondListVisible(index) ? (
              <div className={this.classes.sentenceActionButtons}>
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
  }
}

(CustomList as React.ComponentClass<IProps, IState>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomList);
