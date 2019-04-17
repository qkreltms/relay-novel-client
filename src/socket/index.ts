import io from "socket.io-client";
import config from "../config";
export const mainPage = "mainpage";
export const novelPage = "novelpage";
export const socketConfig = {
  forceNew: true // 소켓 재사용 여부
};

export default (room: string, errHandler): SocketIOClient.Socket => {
  const socket = io(`${config.REACT_APP_SOCKET_URL}/${room}`, socketConfig);

  socket.on("connect", () => {
    console.log(`소켓 ${socket.id} 연결됨`);
  });

  socket.on("reconnect_error", err => {
    console.log("리커넥트 에러", err);
    socket.close();
  });

  socket.on("reconnect_failed", () => {
    console.log("리커넥트 실패");
  });

  // socket.on("ping", () => {
  //   console.log("ping");
  // });

  // socket.on("pong", latnecy => {
  //   console.log("pong", latnecy);
  // });

  socket.on("reconnecting", attemptNumber => {
    console.log(`리커넥트 ${attemptNumber}에서 실행 중...`);
  });

  socket.on("reconnect_attempt", attemptNumber => {
    console.log(`리커넥트 ${attemptNumber}에서 시도 중...`);
  });

  socket.on("reconnect", attemptNumber => {
    console.log(`리커넥트 ${attemptNumber}에서 성공`);
  });

  socket.on("disconnect", reason => {
    console.log("디스커넥트", reason);
  });

  socket.on("error", (err: Error) => {
    console.log("소켓 에러 발생", err);
    errHandler(err);
  });

  return socket;
};
