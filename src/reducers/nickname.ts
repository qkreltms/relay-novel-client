import { INicknameAction, SET_NICKNAME } from "../actions";

export interface INicknameState {
    nickname: string;
}

const createEmpty = () => ({
    nickname: "",
});

export const nicknameReducer = (state = createEmpty(), action: INicknameAction) => {
    switch (action.type) {
        case SET_NICKNAME: {
            return {
                nickname: action.nickname,
            } as INicknameAction;
        }

        default:
            return state;
    }
};
