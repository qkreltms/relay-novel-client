import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NovelPage from "./NovelPage";
import {
  setNovel,
  fetchNovels,
  pushNovel,
  setOffset,
  fetchNovelTotal,
  fetchIsWriteable,
  setIsWriteable,
  setNovelTotal,
  fetchRoomAvailableSlot,
  fetchRoomSpaceLimitaion,
  updateNovel,
  setRoomIsLike,
  fetchRoomIsLike,
  postRoomIsLike,
} from "../../actions";
import { Novel } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  novel: state.novel.novel,
  novels: state.novel.novels,
  offset: state.pagination.offset,
  totalNumOfNovel: state.novel.total,
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  isWriteable: state.rooms.isWriteable,
  slot: state.rooms.slot,
  limit: state.rooms.limit,
  isLikeRoom: state.rooms.isLike
});

const mapDispatchToProps = (dispatch: any) => ({
  setNovel: (novel: Novel) => dispatch(setNovel(novel)),
  fetchNovels: (skip: number, limit: number, roomId: string, userId?: number) =>
    dispatch(fetchNovels(skip, limit, roomId, userId)),
  pushNovel: (novel: Novel) => dispatch(pushNovel(novel)),
  setOffset: (offset: number) => dispatch(setOffset(offset)),
  fetchNovelTotal: (roomId: string) => dispatch(fetchNovelTotal(roomId)),
  setNovelTotal: (total: number) => dispatch(setNovelTotal(total)),
  fetchIsWriteable: (roomId: string, userId: number) => dispatch(fetchIsWriteable(roomId, userId)),
  setIsWriteable: (writeable: boolean) => dispatch(setIsWriteable(writeable)),
  fetchRoomAvailableSlot: (roomId: string) =>
    dispatch(fetchRoomAvailableSlot(roomId)),
  fetchRoomSpaceLimitaion: (roomId: string) =>
    dispatch(fetchRoomSpaceLimitaion(roomId)),
  updateNovel: (novel: Novel) => dispatch(updateNovel(novel)),
  setRoomIsLike: (isLike: boolean) => dispatch(setRoomIsLike(isLike)),
  fetchRoomIsLike: (roomId: string, userId: number) => dispatch(fetchRoomIsLike(roomId, userId)),
  postRoomIsLike: (roomId: string, userId: number, isLike: boolean) => dispatch(postRoomIsLike(roomId, userId, isLike))
});

export const NovelPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NovelPage);
