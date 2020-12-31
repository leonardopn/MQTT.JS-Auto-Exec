import { createStore, combineReducers } from "redux";
import configsReducer from "./reducers/configsReducer"

const reducers = combineReducers({
    configs: configsReducer,
})

function storeConfig() {
    return createStore(reducers)
}

export default storeConfig;