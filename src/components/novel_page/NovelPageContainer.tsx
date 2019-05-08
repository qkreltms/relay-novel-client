import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NovelPage from "./NovelPage";
import {
  setNovel,
  fetchNovels,
  pushNovel,
  setOffset,
  setNovelTotal,
  updateNovel,
  postRoomIsLike,
  setRoomIsLike,
  fetchRoomInfo,
  setComment,
  fetchComments,
  updateComment,
  pushComment,
} from "../../actions";
import { Novel, Comment } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  novel: state.novel.novel,
  novels: state.novel.novels,
  offset: state.pagination.offset,
  totalNumOfNovel: state.rooms.novelTotal,
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  isWriteable: state.rooms.isWriteable,
  joinedUserTotal: state.rooms.joinedUserTotal,
  writerLimit: state.rooms.writerLimit,
  isLikeRoom: state.rooms.isLike,
  tags: state.rooms.tags,
  title: state.rooms.title,
  genre: state.rooms.genre,
  desc: state.rooms.desc,
  coverImage: state.rooms.coverImage,
  like: state.rooms.like,
  createdAt: state.rooms.createdAt,
  comment: state.comment.comment,
  comments: state.comment.comments
});

const mapDispatchToProps = (dispatch: any) => ({
  setNovel: (novel: Novel) => dispatch(setNovel(novel)),
  fetchNovels: (skip: number, limit: number, roomId: string, userId?: number) =>
    dispatch(fetchNovels(skip, limit, roomId, userId)),
  pushNovel: (novel: Novel) => dispatch(pushNovel(novel)),
  setOffset: (offset: number) => dispatch(setOffset(offset)),
  setNovelTotal: (total: number) => dispatch(setNovelTotal(total)),
  updateNovel: (novel: Novel) => dispatch(updateNovel(novel)),
  setRoomIsLike: (isLike: boolean) => dispatch(setRoomIsLike(isLike)),
  fetchRoomInfo: (roomId: string, userId: number, isLoggedIn: boolean) => dispatch(fetchRoomInfo(roomId, userId, isLoggedIn)),
  postRoomIsLike: (roomId: string, userId: number, isLike: boolean) => dispatch(postRoomIsLike(roomId, userId, isLike)),
  setComment: (comment: Comment) => dispatch(setComment(comment)),
  fetchComments: (skip: number, limit: number, roomId: string, userId?: number) =>
  dispatch(fetchComments(skip, limit, roomId, userId)),
  updateComment: (comment: Comment) => dispatch(updateComment(comment)),
  pushComment: (comment: Comment) => dispatch(pushComment(comment))
});

export const NovelPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NovelPage);
