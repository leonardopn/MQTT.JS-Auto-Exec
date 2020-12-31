import axios from "axios";

function getConfigFromAPI() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8888/getConfig").then(value => {
            resolve(value.data);
        });
    })
}

export function getConfig() {
    return {
        type: "GET_CONFIG",
        payload: getConfigFromAPI().then(value => value)
    }
}