import types from "../actions/types"
import Terminal from "../../components/terminal/Terminal"

const initialState = {
    selectedView: <Terminal></Terminal>
}

export default function viewReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_VIEW:
            return {
                ...state,
                selectedView: action.payload
            };
        default: 
            return state;
    }
}