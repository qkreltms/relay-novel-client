export const SET_COMMENT = "SET_COMMENT";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const PUSH_COMMENT = "PUSH_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

import axios from "axios";
import { Comment, newComment } from "../models";
import config from "../config";

export interface ICommentAction {
  comment: Comment;
  comments: Array<Comment>;
  type: string;
}

export const updateComment = (comment: Comment) => {
  return {
    comment,
    type: UPDATE_COMMENT
  }
}

export const setComment = (comment: Comment) => {
  return {
    comment,
    type: SET_COMMENT
  } as ICommentAction;
};

export const pushComment = (comment: Comment) => {
  return {
    comment,
    type: PUSH_COMMENT
  } as ICommentAction;
};

export const handleCommentCallCompleted = (
  comments: Array<Comment>,
) => {
  return {
    comments,
    type: FETCH_COMMENTS
  } as ICommentAction;
};

export const fetchComments = (
  skip: number = 0,
  limit: number = 30,
  roomId: string = "",
  userId: number = 0
) => (dispatch: any) => {
  let url = "";

  if (userId) {
    url = `${
      config.REACT_APP_SERVER_URL
    }/api/comments?skip=${skip}&limit=${limit}&roomId=${roomId}&userId=${userId}`;
  } else {
    url = `${
      config.REACT_APP_SERVER_URL
    }/api/comments?skip=${skip}&limit=${limit}&roomId=${roomId}`;
  }
  if (!url) return;

  axios
    .get(url)
    .then(res => {
      const comments: Array<Comment> = res.data.message as Array<Comment>;
      return dispatch(handleCommentCallCompleted(comments));
    })
    .catch(err => {
      if (!err.response) return;
      console.log(err.response);
      const comments: Array<Comment> = new Array<Comment>(newComment());

      return dispatch(handleCommentCallCompleted(comments));
    });
};