import types from "../actions/types"

const initialState = {
    textTextArea: "Programa iniciado..."
}

export default function terminalReducer(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_TEXT_TEXTAREA:
            return {
                ...state,
                textTextArea: action.payload
            };
        default: 
            return state;
    }
}