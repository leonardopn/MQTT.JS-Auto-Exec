const http = require("http");
const { Server } = require('socket.io');

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

function startServerSocket() {
    return new Promise((resolve, reject) => {
        try {
            io.on("connection", (socket) => {
                socket.emit("LOG_TERMINAL", "Cliente conectado ao backend!");

                socket.on("disconnect", () => {
                    socket.emit("LOG_TERMINAL", "Cliente desconectado do socket!");
                });
            });

            server.listen(8889)

            resolve({ type: "OK", payload: server })
        } catch (error) {
            reject({ type: "ERRO", payload: error })
        }
    })
}

module.exports = { startServerSocket, io };