import { FETCH_ROOMS, IRoomAction } from "../actions";
import { Room, newRoom } from "../models";

export interface IRoomState {
    rooms: Array<Room>;
}

const createEmpty = () => ({
    rooms: new Array<Room>(newRoom()),
});

export const roomReducer = (state = createEmpty(), action: IRoomAction) => {
    switch (action.type) {
        case FETCH_ROOMS: {
            return {
                rooms: action.rooms,
            } as IRoomState;
        }

        default:
            return state;
    }
};
