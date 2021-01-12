import types from "./types"

export function updateTextTextarea(text) {
    return {
        type: types.UPDATE_TEXT_TEXTAREA,
        payload: text
    }
}