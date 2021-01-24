import socketIOClient from "socket.io-client";
import { setLog } from "../../backend/utils/LogUtils"
const ENDPOINT = "http://localhost:8889";

const socket = socketIOClient(ENDPOINT);

socket.on("LOG_TERMINAL", data => {
    setLog(data)
});

export default socket;