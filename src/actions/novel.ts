export const SET_NOVEL = "SET_NOVEL";
export const FETCH_NOVELS = "FETCH_NOVELS";
export const PUSH_NOVEL = "PUSH_NOVEL";
export const FETCH_NOVEL_TOTAL = "FETCH_NOVEL_TOTAL";
export const SET_NOVEL_LIKE = "SET_NOVEL_LIKE";
export const SET_NOVEL_DISLIKE = "SET_NOVEL_DISLIKE";
export const UPDATE_NOVEL = "UPDATE_NOVEL";

import { Novel, newNovel } from "../models";
import axios from "axios";
import config from "../config";

export interface INovelAction {
  novel: Novel;
  novels: Array<Novel>;
  total: number;
  type: string;
  like: boolean;
}

export const setNovelLike = (like: boolean) => {
  return {
    like,
    type: SET_NOVEL_LIKE
  } as INovelAction;
};

export const setNovel = (novel: Novel) => {
  return {
    novel,
    type: SET_NOVEL
  } as INovelAction;
};

export const pushNovel = (novel: Novel) => {
  return {
    novel,
    type: PUSH_NOVEL
  } as INovelAction;
};

export const handleNovelCallCompleted = (
  novels: Array<Novel>
) => {
  return {
    novels,
    type: FETCH_NOVELS
  } as INovelAction;
};

export const updateNovel = (novel: Novel) => {
  return {
    novel,
    type: UPDATE_NOVEL
  }
}

export const fetchNovels = (
  skip: number = 0,
  limit: number = 30,
  roomId: string = "",
  userId: number = 0
) => (dispatch: any) => {
  let url = "";

  if (userId) {
    url = `${
      config.REACT_APP_SERVER_URL
    }/api/sentences?skip=${skip}&limit=${limit}&roomId=${roomId}&userId=${userId}`;
  } else {
    url = `${
      config.REACT_APP_SERVER_URL
    }/api/sentences?skip=${skip}&limit=${limit}&roomId=${roomId}`;
  }
  if (!url) return;

  axios
    .get(url)
    .then(res => {
      const novels: Array<Novel> = res.data.message as Array<Novel>;
      return dispatch(handleNovelCallCompleted(novels));
    })
    .catch(err => {
      if (!err.response) return;
      console.log(err.response);
      const novels: Array<Novel> = new Array<Novel>(newNovel());

      return dispatch(handleNovelCallCompleted(novels));
    });
};
