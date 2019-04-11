import { combineReducers } from "redux";
import { ILocaleState, localeReducer } from "./locale";
import { AppbarReducer, IAppbarState } from "./menu";
import { IOpenState, openReducer } from "./open";
import { roomReducer, IRoomState } from "./room";
import { ICreateRoomState, createRoomReducer } from "./createRoom";
import { IAuthState, authReducer } from "./auth";
import { INovelState, NovelReducer } from "./novel";

export interface ICombineReducersState {
  appbar: IAppbarState;
  locale: ILocaleState;
  open: IOpenState;
  rooms: IRoomState;
  createRoom: ICreateRoomState;
  auth: IAuthState;
  novel: INovelState;
}

export const rootReducer = combineReducers<ICombineReducersState>({
  appbar: AppbarReducer,
  locale: localeReducer,
  open: openReducer,
  rooms: roomReducer,
  createRoom: createRoomReducer,
  auth: authReducer,
  novel: NovelReducer
});
