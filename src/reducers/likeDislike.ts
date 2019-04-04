import { FETCH_LIKEDISLIKE, ILikeDislikeAction } from "../actions";
import { LikeDislike, newLikeDislike } from "../models";

export interface ILikeDislikeState {
  likeDislikes: Array<LikeDislike>;
}

const createEmpty = () => ({
  likeDislikes: new Array<LikeDislike>(newLikeDislike())
});

export const likeDislikeReducer = (
  state = createEmpty(),
  action: ILikeDislikeAction
) => {
  switch (action.type) {
    case FETCH_LIKEDISLIKE: {
      return {
        likeDislikes: action.likeDislikes
      } as ILikeDislikeState;
    }

    default:
      return state;
  }
};
