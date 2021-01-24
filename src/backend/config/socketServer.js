import http from "http"
const server = http.createServer();

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

function startServerSocket() {
    return new Promise((resolve, reject) => {
        try {
            io.on("connection", (socket) => {
                console.log("New client connected");

                socket.on("hello", (arg) => {
                    console.log(arg); 
                });

                socket.on("disconnect", () => {
                    console.log("Client disconnected");
                });
            });

            server.listen(8889, _ => {
                console.log("Servidor socket aberto em: 8889");
            });

            resolve({ type: "OK", payload: server })
        } catch (error) {
            reject({ type: "ERRO", payload: error })
        }
    })
}
export default startServerSocket;