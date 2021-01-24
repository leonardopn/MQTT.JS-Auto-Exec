import types from "../actions/types"

const initialState = {
    status: true
}

export default function mqttReducer(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_STATUS_MQTT:
            return {
                ...state,
                status: action.payload
            };
        default: 
            return state;
    }
}