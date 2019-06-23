import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  ListItem,
  ListItemText,
  List,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { Novel } from "../models";

interface IProps {
  classes: any;
  handleLikeDislikeBtnClick: (type: "LIKE" | "DISLIKE", sentenceId: number) => any;
  novels: Array<Novel>;
  isReadingMod?: boolean;
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

class CustomList extends React.Component<IProps> {
  private classes;

  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  public render() {

    return (
      <List disablePadding>
        {this.props.novels.map((novel, index) => (
          <div
            key={index}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<p className={this.classes.sentence}>{novel.text}</p>}
              />
            </ListItem>
            {this.props.isReadingMod || true ? (
              <div className={this.classes.sentenceActionButtons}>
                <RadioGroup aria-label="position" name="position" row>
                  <FormControlLabel
                    control={
                      <Radio
                        onClick={this.props.handleLikeDislikeBtnClick("LIKE", novel.id)}
                        checked={novel.isLike === 1}
                        checkedIcon={<ThumbUp />}
                        icon={<ThumbUp />}
                      />
                    }
                    label={novel.like}
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        onClick={this.props.handleLikeDislikeBtnClick("DISLIKE", novel.id)}
                        checked={novel.isLike === 0}
                        checkedIcon={<ThumbDown />}
                        icon={<ThumbDown />}
                      />
                    }
                    label={novel.dislike}
                    labelPlacement="bottom"
                    value="dislike"
                  />
                </RadioGroup>
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

(CustomList as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomList);
