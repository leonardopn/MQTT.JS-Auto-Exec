import types from "./types"

export function updateStatusMQTT(status) {
    return {
        type: types.UPDATE_STATUS_MQTT,
        payload: status
    }
}