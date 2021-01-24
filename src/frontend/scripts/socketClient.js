import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8889";

const socket = socketIOClient(ENDPOINT);

socket.on("FromAPI", data => {});
socket.emit("hello", "world");

export default socket;