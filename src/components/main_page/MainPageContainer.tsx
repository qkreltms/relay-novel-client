import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import MainPage from "./MainPage";
import { fetchRooms } from "../../actions/room";
import { fetchLikeDislikes } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
    rooms: state.rooms.rooms,
    likeDislikes: state.likeDislikes.likeDislikes,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchRooms: (skip: number, limit: number) => dispatch(fetchRooms(skip, limit)),
    fetchLikeDislikes: (roomName: string, skip: number, limit: number) => dispatch(fetchLikeDislikes(roomName, skip, limit)),
});

export const MainPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPage);
