import { INovelAction, SET_NOVEL, PUSH_NOVEL, FETCH_NOVELS, SET_NOVEL_TOTAL, FETCH_NOVEL_TOTAL } from "../actions";
import { Novel, newNovel } from "../models";

export interface INovelState {
  novel: Novel;
  novels: Array<Novel>;
  total: number;
}

const createEmpty = () => ({
  novel: newNovel(),
  novels: Array<Novel>(newNovel()),
  total: 0
});

export const NovelReducer = (state = createEmpty(), action: INovelAction) => {
  switch (action.type) {
    case PUSH_NOVEL: {
      return {
        ...state,
        novels: [...state.novels, action.novel]
      } as INovelState;
    }

    case SET_NOVEL: {
      return {
        ...state,
        novel: action.novel
      } as INovelState;
    }

    case FETCH_NOVELS: {
      return {
        ...state,
        novels: action.novels
      } as INovelState;
    }

    case SET_NOVEL_TOTAL: {
      return {
        ...state,
        total: action.total
      } as INovelState;
    }

    case FETCH_NOVEL_TOTAL: {
      return {
        ...state,
        total: action.total
      }
    }
    default:
      return state;
  }
};
