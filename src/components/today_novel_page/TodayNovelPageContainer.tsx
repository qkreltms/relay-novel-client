import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import TodayNovelPage from "./TodayNovelPage";
import { fetchRooms, setRooms, setRoomTotal } from "../../actions";
import { Room } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  rooms: state.rooms.rooms,
  isLoggedIn: state.auth.isLoggedIn,
  roomTotal: state.rooms.roomTotal
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchRooms: (skip: number, limit: number) =>
    dispatch(fetchRooms(skip, limit)),
  setRooms: (rooms: Array<Room>) => dispatch(setRooms(rooms)),
  setRoomTotal: (total: number) => dispatch(setRoomTotal(total))
});

export const TodayNovelPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodayNovelPage);
