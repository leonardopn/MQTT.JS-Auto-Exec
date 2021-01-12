import { createStore, combineReducers } from "redux";
import configsReducer from "./reducers/configsReducer"
import viewReducer from "./reducers/viewReducer"

const reducers = combineReducers({
    configs: configsReducer,
    view: viewReducer
})

function storeConfig() {
    return createStore(reducers)
}

export default storeConfig;