import {
  SET_COMMENT,
  FETCH_COMMENTS,
  PUSH_COMMENT,
  ICommentAction,
  UPDATE_COMMENT
} from "../actions";
import { newComment, Comment } from "../models";

export interface ICommentState {
  comment: Comment;
  comments: Array<Comment>;
  total: number;
}

const createEmpty = () =>
  ({
    comment: newComment(),
    comments: Array<Comment>(newComment()),
    total: 0
  } as ICommentState);

export const commentReducer = (
  state = createEmpty(),
  action: ICommentAction
) => {
  switch (action.type) {
    case PUSH_COMMENT: {
      return {
        ...state,
        comments: [action.comment, ...state.comments]
      } as ICommentState;
    }

    case SET_COMMENT: {
      return {
        ...state,
        comment: action.comment
      } as ICommentState;
    }

    case FETCH_COMMENTS: {
      return {
        ...state,
        comments: action.comments
      } as ICommentState;
    }

    case UPDATE_COMMENT: {
      const newComments: Array<Comment> = state.comments.map<Comment>(
        (comment: Comment) => {
          // 일치하지 않는 comment.id 는 무시함
          if (comment.id !== action.comment.id) return comment;
          // 좋아요 싫어요 중복 시
          if (comment.isLike == action.comment.isLike) {
            if (comment.isLike === 1) comment.like -= 1;
            if (comment.isLike === 0) comment.dislike -= 1;
            comment.isLike = null;
            // 처음으로 좋아요, 싫어요 눌렀을 때
          } else if (comment.isLike === null) {
            if (action.comment.isLike) comment.like += 1;
            else comment.dislike += 1;
            comment.isLike = action.comment.isLike;
            // 좋아요 싫어요 스위치 시
          } else {
            const cur = action.comment.isLike;
            const pre = comment.isLike;
            comment.isLike = action.comment.isLike;
            if (pre === 1 && cur === 0) {
              comment.like -= 1;
              comment.dislike += 1;
            }
            if (pre === 0 && cur === 1) {
              comment.like += 1;
              comment.dislike -= 1;
            }
          }

          return comment;
        }
      );

      return {
        ...state,
        comments: newComments
      } as ICommentState;
    }

    default:
      return state;
  }
};
