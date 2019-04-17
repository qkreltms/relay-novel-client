export const SET_OFFSET = "SET_OFFSET";
export const SET_NOVEL_TOTAL = "SET_NOVEL_TOTAL";
import axios from "axios";
import config from "../config";

export interface IPaginationAction {
  offset: number;
  total: number;
  type: string;
}

export const setOffset = (offset: number) => {
  return {
    offset,
    type: SET_OFFSET
  } as IPaginationAction;
};

export const setNovelTotal = (total: number) => {
  return {
    total,
    type: SET_NOVEL_TOTAL
  } as IPaginationAction;
};

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

      return dispatch(setNovelTotal(total));
    })
    .catch(err => {
      console.log(err.response);
      return dispatch(setNovelTotal(0));
    });
};

export const handleTotalCallCompleted = (total: number) => {
  setNovelTotal(total)
}
