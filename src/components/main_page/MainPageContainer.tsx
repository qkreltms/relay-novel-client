import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";
import { fetchRooms, setRooms } from "../../actions";
import { Room } from "../../models";

const mapStateToProps = (state: ICombineReducersState) => ({
  rooms: state.rooms.rooms,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchRooms: (skip: number, limit: number) =>
    dispatch(fetchRooms(skip, limit)),
  setRooms: (rooms: Array<Room>) => dispatch(setRooms(rooms))
});

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
