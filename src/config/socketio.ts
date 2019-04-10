import io from "socket.io-client";
import config from "./";

const socketConfig = {
    forceNew: true // 소켓 재사용 여부
};
const socket = io(`${config.REACT_APP_SOCKET_URL}/mainpage`, socketConfig);

socket.on("connect", () => {
  console.log("소켓 연결됨", socket.id);
});

socket.on("reconnect_error", err => {
  console.log("리커넥트 에러", err);
  socket.close();
});

socket.on("reconnect_failed", () => {
  console.log("리커넥트 실패");
});

socket.on("ping", () => {
  console.log("ping");
});

socket.on("pong", latnecy => {
  console.log("pong", latnecy);
});

socket.on("reconnecting", attemptNumber => {
  console.log("리커넥트 중...", attemptNumber);
});

socket.on("reconnect_attempt", attemptNumber => {
  console.log("리커넥트 시도 중...", attemptNumber);
});

socket.on("reconnect", attemptNumber => {
  console.log("리커넥트 성공", attemptNumber);
});

socket.on("disconnect", reason => {
  console.log("디스커넥트", reason);
});

socket.on("error", err => {
  console.log("소켓 에러 발생", err);
});

export default socket;
