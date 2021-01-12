import types from "./types"

export function updateView(view) {
    return {
        type: types.SET_VIEW,
        payload: view
    }
}