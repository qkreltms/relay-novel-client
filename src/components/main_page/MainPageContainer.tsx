import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";
import { fetchRooms } from "../../actions/room";

const mapStateToProps = (state: ICombineReducersState) => ({
    rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchRooms: (skip: number, limit: number) => dispatch(fetchRooms(skip, limit)),
});

export const MainPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPage);
