import { createStore, combineReducers } from "redux";
import configsReducer from "./reducers/configsReducer"
import viewReducer from "./reducers/viewReducer"
import terminalReducer from "./reducers/terminalReducer"

const reducers = combineReducers({
    configs: configsReducer,
    view: viewReducer,
    terminal: terminalReducer,
})

function storeConfig() {
    return createStore(reducers)
}

export default storeConfig;