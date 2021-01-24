import socketIOClient from "socket.io-client";
import { setLog } from "../../backend/utils/LogUtils";
import store from "../../index";
import { updateStatusMQTT } from "../store/actions/mqtt.action";
const ENDPOINT = "http://localhost:8889";

const socket = socketIOClient(ENDPOINT);

socket.on("LOG_TERMINAL", data => {
    setLog(data)
});

socket.on("STATUS_MQTT", data => {
    store.dispatch(updateStatusMQTT(data));
});

export default socket;