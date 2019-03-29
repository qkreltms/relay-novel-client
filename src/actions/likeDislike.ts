import { LikeDislike, newLikeDislike } from "../models";
import config from "../config";
import axios from "axios";

export const FETCH_LIKEDISLIKE = "FETCH_LIKEDISLIKE";

export interface ILikeDislikeAction {
  type: string;
  likeDislikes: Array<LikeDislike>;
}

const handleLikeDislikeCompleted = (likeDislikes: Array<LikeDislike>, type: string) => {
  return {
    likeDislikes,
    type
  } as ILikeDislikeAction;
};

export const fetchLikeDislikes = (roomName: string, skip: number, limit: number) => (dispatch: any) => {
  axios
    .get(`${config.REACT_APP_SERVER_URL}/rooms/likeDislike?room=${roomName}&skip=${skip}&limit=${limit}`)
    .then(res => {
      console.log(roomName, "likeDislike 데이터 받아옴")
      console.log(res.data)
      const likeDislikes: Array<LikeDislike> = res.data.message as Array<LikeDislike>;

      return dispatch(handleLikeDislikeCompleted(likeDislikes, FETCH_LIKEDISLIKE));
    })
    .catch(err => {
      console.log(err.response);
      const likeDislikes = new Array<LikeDislike>(newLikeDislike())

      return dispatch(handleLikeDislikeCompleted(likeDislikes, FETCH_LIKEDISLIKE));
    });
};
