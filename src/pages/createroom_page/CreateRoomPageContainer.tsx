import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import CreateRoomPage from "./CreateRoomPage";
import { setCreateRoomDesc, setCreateRoomWriterLimit, setCreateRoomTitle, pushCreateRoomTag, setCreateRoomGenre, setCreateRoomCoverImage, initCreateRoomState, setIsTitleError, setIsGenreError, deleteCreateRoomTag } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
  writerLimit: state.createRoom.writerLimit,
  title: state.createRoom.title,
  desc: state.createRoom.desc,
  isLoggedIn: state.auth.isLoggedIn,
  genre: state.createRoom.genre,
  tags: state.createRoom.tags,
  coverImage: state.createRoom.coverImage,
  user: state.auth.user,
  lang: state.locale.lang,
  isTitleError: state.createRoom.isTitleError,
  isGenreError: state.createRoom.isGenreError
});

const mapDispatchToProps = (dispatch: any) => ({
  setDesc: (desc: string) => dispatch(setCreateRoomDesc(desc)),
  setTitle: (title: string) => dispatch(setCreateRoomTitle(title)),
  setWriterLimit: (writerLimit: string) => dispatch(setCreateRoomWriterLimit(writerLimit)),
  pushTag: (tag: string) => dispatch(pushCreateRoomTag(tag)),
  deleteTag: (tag: string) => dispatch(deleteCreateRoomTag(tag)),
  setGenre: (genre: string) => dispatch(setCreateRoomGenre(genre)),
  setCoverImage: (coverImage: string) => dispatch(setCreateRoomCoverImage(coverImage)),
  initCreateRoomState: () => dispatch(initCreateRoomState()),
  setIsTitleError: (isError: boolean) => dispatch(setIsTitleError(isError)),
  setIsGenreError: (isError: boolean) => dispatch(setIsGenreError(isError))
});

const CreateRoomPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomPage);

export default CreateRoomPageContainer;
