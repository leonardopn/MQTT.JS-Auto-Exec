import types from "../actions/types"

const initialState = {
    selectedView: 0
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