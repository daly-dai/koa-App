const IO = require("socket.io"),
  { getFulldate } = require("../util");

// 引入user
const User = require("../models/User");
const { socketModel } = require("./scoketHandle");

function creatSocket(app) {
  const io = IO(app);
  //每个客户端socket连接时都会触发 connection 事件，在登录的时候进行scoketid的更新
  io.on("connection", (clientSocket) => {
    clientSocket.emit("receiveMsg", "连接整体的socket");

    clientSocket.on("login", async (data) => {
      // 每次链接的时候都会生成独特的scoketId
      const scoketId = clientSocket.conn.id;
      const id = data.id;

      User.findOneAndUpdate(
        { id },
        {
          scoketId,
        },
        (err, ret) => {
          if (err) {
            console.log("更新失败 ");
          } else {
            console.log("更新成功");
          }
        }
      );
    });

    //私聊
    clientSocket.on("sendPrivateMsg", async (data) => {
      console.log(data);
      const socketid = await getSocketIdById.getUserSocketId(data.to);
      console.log(socketid);

      io.to(socketid).emit("getPrivateMsg", data);
    });
  });
}

module.exports = creatSocket;
