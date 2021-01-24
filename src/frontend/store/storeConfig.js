import { createStore, combineReducers } from "redux";
import configsReducer from "./reducers/configsReducer"
import viewReducer from "./reducers/viewReducer"
import terminalReducer from "./reducers/terminalReducer"
import commandsReducer from "./reducers/commandsReducer"
import mqttReducer from "./reducers/mqtt.reducer"

const reducers = combineReducers({
    configs: configsReducer,
    view: viewReducer,
    terminal: terminalReducer,
    commands: commandsReducer,
    mqtt: mqttReducer
})

function storeConfig() {
    return createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

export default storeConfig;