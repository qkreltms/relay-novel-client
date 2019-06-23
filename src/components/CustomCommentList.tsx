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
import { Comment } from "../models";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

interface IProps {
  classes: any;
  handleLikeDislikeBtnClick: (
    type: "LIKE" | "DISLIKE",
    sentenceId: number
  ) => any;
  comments: Array<Comment>;
  comment: Comment;
  handleInputValueChange: () => void;
  handleSubmitButtonClick: () => void;
  isLoggedIn: boolean;
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

class CustomCommentList extends React.Component<IProps> {
  private classes;

  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  public render() {
    return (
      <div>
        {/* 댓글 입력 부분 */}
        {this.props.isLoggedIn ? (
          <div>
            <CustomInput
              name="comment"
              formattedMessageId="novelpage_input"
              value={this.props.comment.text}
              handleChange={this.props.handleInputValueChange}
              multiline
            />
            <CustomButton
              onClick={this.props.handleSubmitButtonClick}
              formattedMessageId="novelpage_btn"
            />
          </div>
        ) : (
          <div />
        )}

        <List disablePadding>
          {/* 댓글 */}
          {this.props.comments && this.props.comments.length > 0 ? (
            this.props.comments.map((comment, index) => (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <p className={this.classes.sentence}>{comment.text}</p>
                    }
                  />
                </ListItem>
                <div className={this.classes.sentenceActionButtons}>
                  <RadioGroup aria-label="position" name="position" row>
                    <FormControlLabel
                      control={
                        <Radio
                          onClick={this.props.handleLikeDislikeBtnClick(
                            "LIKE",
                            comment.id
                          )}
                          checked={comment.isLike === 1}
                          checkedIcon={<ThumbUp />}
                          icon={<ThumbUp />}
                        />
                      }
                      label={comment.like}
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          onClick={this.props.handleLikeDislikeBtnClick(
                            "DISLIKE",
                            comment.id
                          )}
                          checked={comment.isLike === 0}
                          checkedIcon={<ThumbDown />}
                          icon={<ThumbDown />}
                        />
                      }
                      label={comment.dislike}
                      labelPlacement="bottom"
                      value="dislike"
                    />
                  </RadioGroup>
                </div>
              </div>
            ))
          ) : (
            <div />
          )}
        </List>
      </div>
    );
  }
}

(CustomCommentList as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomCommentList);
