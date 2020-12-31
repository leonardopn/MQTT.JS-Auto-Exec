import types from "../actions/types"

const initialState = {
    problem: {
        message: "", status: false
    },
    serverIp: "",
    user: "",
    pass: "",
    topic: "",
    startup: false
}

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CONFIG:
            return {
                serverIp: action.payload.serverIp,
                user: action.payload.user,
                pass: action.payload.pass,
                topic: action.payload.topic,
                startup: action.payload.startup,
                problem: { message: "", status: false },
            };
        case types.PROBLEM_GET_CONFIG:
            return {
                ...state,
                problem: { message: action.payload, status: false },
            };
        case types.UPDATE_IP_CONFIG:
            return {
                ...state,
                serverIp: action.payload
            };
        case types.UPDATE_PASS_CONFIG:
            return {
                ...state,
                pass: action.payload
            };
        case types.UPDATE_STARTUP_CONFIG:
            return {
                ...state,
                startup: action.payload
            };
        case types.UPDATE_TOPIC_CONFIG:
            return {
                ...state,
                topic: action.payload
            };
        case types.UPDATE_USER_CONFIG:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}