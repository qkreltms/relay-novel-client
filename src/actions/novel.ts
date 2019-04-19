export const SET_NOVEL = "SET_NOVEL";
export const FETCH_NOVELS = "FETCH_NOVELS";
export const PUSH_NOVEL = "PUSH_NOVEL";
export const SET_NOVEL_TOTAL = "SET_NOVEL_TOTAL";
export const FETCH_NOVEL_TOTAL = "FETCH_NOVEL_TOTAL";

import { Novel, newNovel } from "../models";
import axios from "axios";
import config from "../config";

export interface INovelAction {
  novel: Novel;
  novels: Array<Novel>;
  total: number;
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
  } as INovelAction;
};


export const setNovelTotal = (total: number) => {
  return {
    total,
    type: SET_NOVEL_TOTAL
  } as INovelAction;
};

export const fetchNovelTotalCompleted = (total: number) => {
  return {
    total,
    type: FETCH_NOVEL_TOTAL
  }
}

export const fetchNovelTotal = (roomId: string) => (dispatch: any) => {
  axios
    .get(
      `${
        config.REACT_APP_SERVER_URL
      }/api/sentences/total?roomId=${roomId}`
    )
    .then(res => {
      if (!res.data) return;
      const total: number = res.data.message[0].total;
      return dispatch(fetchNovelTotalCompleted(total));
    })
    .catch(err => {
      console.log(err.response);
      return dispatch(fetchNovelTotalCompleted(0));
    });
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
      const novels: Array<Novel> = res.data.message as Array<Novel>;

      return dispatch(handleNovelCallCompleted(novels, FETCH_NOVELS));
    })
    .catch(err => {
      console.log(err.response);
      const novels: Array<Novel> = new Array<Novel>(newNovel());

      return dispatch(handleNovelCallCompleted(novels, FETCH_NOVELS));
    });
};
