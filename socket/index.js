const IO = require('socket.io'),
    {
        getFulldate
    } = require('../util');

// 引入user
const User = require("../models/User");

function creatSocket(app) {
    const io = IO(app);
    console.log(app, 9090);
    //每个客户端socket连接时都会触发 connection 事件
    io.on("connection", (clientSocket) => {
        clientSocket.emit("receiveMsg", '连接整体的socket');
        console.log('连接整体的socket');

        clientSocket.on("login", async data => {
            const scoketId = clientSocket.conn.id;
            const id = data.id;

            User.findOneAndUpdate({ id }, {
                scoketId
            }, (err, ret) => {
                if (err) {
                    console.log("更新失败 ");
                } else {
                    console.log("更新成功");
                }
            });
        })

        //私聊
        clientSocket.on("sendPrivateMsg", async data => {
            console.log(data, 9090);
            const arr = await User.findOne({ id: data.toUser });
            const RowDataPacket = arr[0];
            const scoketId = JSON.parse(JSON.stringify(RowDataPacket)).scoketId;
            io.to(scoketId).emit("getPrivateMsg", data);
        });
    });

    //单独的命名空间
    //命名空间：监听属性改变的，deviceInfo
    // const deviceIo = io.of('/deviceInfo');
    // let deviceId = '';
    // deviceIo.on("connection", function (clientSocket) {
    //     deviceId = clientSocket.handshake.query.id;
    //     clientSocket.emit("receiveMsg", '连接deviceInfo的socket');
    //     console.log('连接deviceInfo的socket');
    //     clientSocket.join(deviceId); //加入房间
    //     //deviceInfo下的room
    //     setInterval(function () {
    //         let time = getFulldate();
    //         clientSocket.to(deviceId).emit(`deviceParam`, `deviceParam ${deviceId} time:` + time);
    //     }, 5000)
    // });

    // const adminIo = io.of('/admin');
    // adminIo.on("connection", function (clientSocket) {
    //     clientSocket.emit("receiveMsg", '连接adminIo的socket');
    //     console.log('连接adminIo的socket');
    // });
}

module.exports = creatSocket