import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";
import { fetchRooms, setRooms, fetchRoomTotal, setRoomTotal } from "../../actions";
import { Room } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  rooms: state.rooms.rooms,
  isLoggedIn: state.auth.isLoggedIn,
  total: state.novel.total
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchRooms: (skip: number, limit: number) =>
    dispatch(fetchRooms(skip, limit)),
  setRooms: (rooms: Array<Room>) => dispatch(setRooms(rooms)),
  fetchRoomTotal: () => dispatch(fetchRoomTotal()),
  setRoomTotal: (total: number) => dispatch(setRoomTotal(total))
});

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
