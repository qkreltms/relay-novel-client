import { INovelAction, SET_NOVEL, FETCH_NOVELS } from "../actions";
import { Novel, newNovel } from "../models";

export interface INovelState {
  novel: string;
  novels: Array<Novel>;
}

const createEmpty = () => ({
  novel: "",
  novels: Array<Novel>(newNovel())
});

export const NovelReducer = (state = createEmpty(), action: INovelAction) => {
  switch (action.type) {
    case SET_NOVEL: {
      return {
        novel: action.novel
      } as INovelState;
    }

    case FETCH_NOVELS: {
      return {
        novels: action.novels
      } as INovelState;
    }

    default:
      return state;
  }
};
