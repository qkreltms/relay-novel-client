import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";
import { fetchRooms, fetchLikeDislikes, setRooms } from "../../actions";
import { Room } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  rooms: state.rooms.rooms,
  likeDislikes: state.likeDislikes.likeDislikes,
  isLoggedIn: state.login.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchRooms: (skip: number, limit: number) =>
    dispatch(fetchRooms(skip, limit)),
  fetchLikeDislikes: (roomName: string, skip: number, limit: number) =>
    dispatch(fetchLikeDislikes(roomName, skip, limit)),
  setRooms: (rooms: Array<Room>) => dispatch(setRooms(rooms))
});

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
