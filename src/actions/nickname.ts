export const SET_NICKNAME = "SET_NICKNAME";

export interface INicknameAction {
    nickname: string;
    type: string;
}

export const setNickname = (nickname: string) => {
    return {
        nickname,
        type: SET_NICKNAME,
    } as INicknameAction;
};
