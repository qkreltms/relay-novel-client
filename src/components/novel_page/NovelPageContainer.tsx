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
} from "../../actions";
import { Novel } from "../../models";

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
  isLikeRoom: state.rooms.isLike
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
  postRoomIsLike: (roomId: string, userId: number, isLike: boolean) => dispatch(postRoomIsLike(roomId, userId, isLike))
});

export const NovelPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NovelPage);
