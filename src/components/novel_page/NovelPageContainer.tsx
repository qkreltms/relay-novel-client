import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NovelPage from "./NovelPage";
import { setNovel, fetchNovels, pushNovel, setOffset, fetchNovelTotal, fetchIsWriteable, setIsWriteable, setNovelTotal } from "../../actions";
import { Novel } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  novel: state.novel.novel,
  novels: state.novel.novels,
  offset: state.pagination.offset,
  total: state.novel.total,
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  isWriteable: state.rooms.isWriteable
});

const mapDispatchToProps = (dispatch: any) => ({
  setNovel: (novel: Novel) => dispatch(setNovel(novel)),
  fetchNovels: (skip: number, limit: number, roomId: string) =>
    dispatch(fetchNovels(skip, limit, roomId)),
  pushNovel: (novel: Novel) => dispatch(pushNovel(novel)),
  setOffset: (offset: number) => dispatch(setOffset(offset)),
  fetchTotal: (roomId: string) => dispatch(fetchNovelTotal(roomId)),
  setTotal: (total: number) => dispatch(setNovelTotal(total)),
  fetchIsWriteable: (roomId: string) => dispatch(fetchIsWriteable(roomId)),
  setIsWriteable: (writeable: boolean) => dispatch(setIsWriteable(writeable))
});

export const NovelPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NovelPage);
