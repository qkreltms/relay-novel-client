import {
  INovelAction,
  SET_NOVEL,
  PUSH_NOVEL,
  FETCH_NOVELS,
  FETCH_NOVEL_TOTAL,
  SET_NOVEL_LIKE,
  UPDATE_NOVEL
} from "../actions";
import { Novel, newNovel } from "../models";

export interface INovelState {
  novel: Novel;
  novels: Array<Novel>;
  total: number;
}

const createEmpty = () => ({
  novel: newNovel(),
  novels: new Array<Novel>(newNovel()),
  total: 0
});

export const novelReducer = (state = createEmpty(), action: INovelAction) => {
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

    // case FETCH_NOVEL_TOTAL: {
    //   return {
    //     ...state,
    //     total: action.total
    //   };
    // }

    // case SET_NOVEL_LIKE: {
    //   return {
    //     ...state,
    //     like: action.like
    //   };
    // }

    case UPDATE_NOVEL: {
      const newNovels: Array<Novel> = state.novels.map<Novel>(
        (novel: Novel) => {
          // 일치하지 않는 novel.id 는 무시함
          if (novel.id !== action.novel.id) return novel;
          // 좋아요 싫어요 중복 시
          if (novel.isLike == action.novel.isLike) {
            if (novel.isLike === 1) novel.like -= 1;
            if (novel.isLike === 0) novel.dislike -= 1;
            novel.isLike = null;
            // 처음으로 좋아요, 싫어요 눌렀을 때
          } else if (novel.isLike === null) {
            if (action.novel.isLike) novel.like += 1;
            else novel.dislike += 1;
            novel.isLike = action.novel.isLike;
            // 좋아요 싫어요 스위치 시
          } else {
            const cur = action.novel.isLike;
            const pre = novel.isLike;
            novel.isLike = action.novel.isLike;
            if (pre === 1 && cur === 0) {
              novel.like -= 1;
              novel.dislike += 1;
            }
            if (pre === 0 && cur === 1) {
              novel.like += 1;
              novel.dislike -= 1;
            }
          }

          return novel;
        }
      );

      return {
        ...state,
        novels: newNovels
      } as INovelState;
    }

    default:
      return state;
  }
};
