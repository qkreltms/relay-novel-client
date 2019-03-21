import { INicknameAction, SET_NICKNAME } from "../actions";

export interface INicknameState {
    nickname: string;
    isNicknameError: boolean;
}

const createEmpty = () => ({
    nickname: "",
    isNicknameError: false,
});

export const nicknameReducer = (state = createEmpty(), action: INicknameAction) => {
    switch (action.type) {
        case SET_NICKNAME: {
            return {
                nickname: action.nickname,
                isNicknameError: !validateNickname(action.nickname),
            } as INicknameState;
        }

        default:
            return state;
    }
};

const validateNickname = (nickname: string):boolean => {
    if (nickname.length >= 1 && nickname.length <= 30) {
        return true;
    }
    return false;
}
