import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import NovelPage from "./NovelPage";
import { setNovel, fetchNovels } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
  novel: state.novel.novel,
  novels: state.novel.novels
});

const mapDispatchToProps = (dispatch: any) => ({
  setNovel: (msg: string) => dispatch(setNovel(msg)),
  fetchNovels: (skip: number, limit: number, roomId: number) => dispatch(fetchNovels(skip, limit, roomId))
});

export const NovelPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NovelPage);
