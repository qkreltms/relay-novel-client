import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import CreateRoomPage from "./CreateRoomPage";
import { setCreateRoomDesc, setCreateRoomWriterLimit, setCreateRoomTitle, setCreateRoomTags, setCreateRoomGenre, setCreateRoomCoverImage, initCreateRoomState } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
  writerLimit: state.createRoom.writerLimit,
  title: state.createRoom.title,
  desc: state.createRoom.desc,
  isLoggedIn: state.auth.isLoggedIn,
  genre: state.createRoom.genre,
  tags: state.createRoom.tags,
  coverImage: state.createRoom.coverImage,
  user: state.auth.user,
  lang: state.locale.lang
});

const mapDispatchToProps = (dispatch: any) => ({
  setDesc: (desc: string) => dispatch(setCreateRoomDesc(desc)),
  setTitle: (title: string) => dispatch(setCreateRoomTitle(title)),
  setWriterLimit: (writerLimit: string) => dispatch(setCreateRoomWriterLimit(writerLimit)),
  setTags: (tags: string) => dispatch(setCreateRoomTags(tags)),
  setGenre: (genre: string) => dispatch(setCreateRoomGenre(genre)),
  setCoverImage: (coverImage: string) => dispatch(setCreateRoomCoverImage(coverImage)),
  initCreateRoomState: () => dispatch(initCreateRoomState()),
});

export const CreateRoomPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomPage);
