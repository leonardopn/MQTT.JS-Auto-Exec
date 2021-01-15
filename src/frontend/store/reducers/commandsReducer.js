import types from "../actions/types"

const initialState = {
    arrayCommands: []
}

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_COMMANDS:
            return {
                ...state,
                arrayCommands: action.payload
            };
        default:
            return state;
    }
}