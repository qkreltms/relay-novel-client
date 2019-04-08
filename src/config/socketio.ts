import http from "http";
import express from "express";
const app = express();
// new http.Server(app);
import io from "socket.io-client";

export default () => {
  const room = io("/rooms");
  room.on("connection", socket => {
    socket.on("create", data => {
      console.log(data);
      socket.join("room");
      room.to("room").emit("create", data.roomId);
    });
  });
};
