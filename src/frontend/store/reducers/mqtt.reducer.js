import types from "../actions/types"

const initialState = {
    status: true,
    timer: false
}

export default function mqttReducer(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_STATUS_MQTT:
            return {
                ...state,
                status: action.payload
            };
        case types.UPDATE_TIMER_MQTT:
            return {
                ...state,
                timer: action.payload
            };
        default:
            return state;
    }
}