import axios from "axios";

function getConfigFromAPI() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8888/getConfig").then(value => {
            resolve(value.data);
        });
    })
}

const initialState = {
    serverIp: getConfigFromAPI().then(value => value.serverIp),
    user: "",
    pass: "",
    topic: "",
    startup: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_CONFIG":
            return {
                serverIp: action.payload.serverIp,
                user: action.payload.user,
                pass: action.payload.pass,
                topic: action.payload.topic,
                startup: action.payload.startup
            };
        default:
            return state;
    }
}