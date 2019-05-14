import { combineReducers } from "redux";
import { ILocaleState, localeReducer } from "./locale";
import { appbarReducer, IAppbarState } from "./menu";
import { IOpenState, openReducer } from "./open";
import { roomReducer, IRoomState } from "./room";
import { ICreateRoomState, createRoomReducer } from "./createRoom";
import { IAuthState, authReducer } from "./auth";
import { INovelState, novelReducer } from "./novel";
import { paginationReducer, IPaginationState } from "./pagination";
import { commentReducer, ICommentState } from "./comment";
import { ITabState, tabReducer } from "./tab";

export interface ICombineReducersState {
  appbar: IAppbarState;
  locale: ILocaleState;
  open: IOpenState;
  rooms: IRoomState;
  createRoom: ICreateRoomState;
  auth: IAuthState;
  novel: INovelState;
  pagination: IPaginationState;
  comment: ICommentState;
  tab: ITabState;
}

export const rootReducer = combineReducers<ICombineReducersState>({
  appbar: appbarReducer,
  locale: localeReducer,
  open: openReducer,
  rooms: roomReducer,
  createRoom: createRoomReducer,
  auth: authReducer,
  novel: novelReducer,
  pagination: paginationReducer,
  comment: commentReducer,
  tab: tabReducer
});
