export const SET_NOVEL = "SET_NOVEL";
export const FETCH_NOVELS = "FETCH_NOVELS";
export const PUSH_NOVEL = "PUSH_NOVEL";

import { Novel, newNovel } from "../models";
import axios from "axios";
import config from "../config";
import axiosConfig from "../config/axios";

export interface INovelAction {
  novel: Novel;
  novels: Array<Novel>;
  type: string;
}

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
  novels: Array<Novel>,
  type: string
) => {
  return {
    novels,
    type
  };
};

export const fetchNovels = (
  skip: number = 0,
  limit: number = 30,
  roomId: string = "0"
) => (dispatch: any) => {
  axios
    .get(
      `${
        config.REACT_APP_SERVER_URL
      }/api/sentences?skip=${skip}&limit=${limit}&roomId=${roomId}`
    )
    .then(res => {
      if (!res.data) return;
      console.log("novel 데이터", res.data);
      const novels: Array<Novel> = res.data.message as Array<Novel>;

      return dispatch(handleNovelCallCompleted(novels, FETCH_NOVELS));
    })
    .catch(err => {
      console.log(err.response);
      const novels: Array<Novel> = new Array<Novel>(newNovel());

      return dispatch(handleNovelCallCompleted(novels, FETCH_NOVELS));
    });
};
