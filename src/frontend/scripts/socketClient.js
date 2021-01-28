import socketIOClient from "socket.io-client";
import { setLog } from "../../backend/utils/LogUtils";
import store from "../../index";
import { updateStatusMQTT, updateTimerMQTT } from "../store/actions/mqtt.action";
const ENDPOINT = "http://localhost:8889";

const socket = socketIOClient(ENDPOINT);

socket.on("LOG_TERMINAL", data => {
    setLog(data)
});

socket.on("STATUS_MQTT", data => {
    store.dispatch(updateStatusMQTT(data));
});

socket.on("STATUS_TIMER_MQTT", data => {
    store.dispatch(updateTimerMQTT(data));
});

export default socket;