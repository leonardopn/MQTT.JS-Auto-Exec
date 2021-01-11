import axios from "axios";
import types from "./types"

function getConfigFromAPI() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8888/getConfig").then(value => {
            resolve(value.data);
        }).catch((error) => {
            reject(error.response.data);
        });
    })
}

export function getConfig() {
    return {
        type: types.GET_CONFIG,
        payload: getConfigFromAPI()
    }
}

export function problemGetConfig(e) {
    return {
        type: types.PROBLEM_GET_CONFIG,
        payload: e
    }
}

export function updateIpConfig(value) {
    return {
        type: types.UPDATE_IP_CONFIG,
        payload: value
    }
}

export function updateUser(value) {
    return {
        type: types.UPDATE_USER_CONFIG,
        payload: value
    }
}

export function updatePass(value) {
    return {
        type: types.UPDATE_PASS_CONFIG,
        payload: value
    }
}

export function updateTopic(value) {
    return {
        type: types.UPDATE_TOPIC_CONFIG,
        payload: value
    }
}

export function updateStartUp(value) {
    return {
        type: types.UPDATE_STARTUP_CONFIG,
        payload: value
    }
}

export function resetConfig() {
    return {
        type: types.RESET_CONFIG,
        payload: ""
    }
}