import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import CreateRoomPage from "./CreateRoomPage";
import { setDesc, setWriterLimit, setTitle } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
  writerLimit: state.createRoom.writerLimit,
  title: state.createRoom.title,
  desc: state.createRoom.desc,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  setDesc: (desc: string) => dispatch(setDesc(desc)),
  setTitle: (title: string) => dispatch(setTitle(title)),
  setWriterLimit: (writerLimit: string) => dispatch(setWriterLimit(writerLimit))
});

export const CreateRoomPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomPage);
