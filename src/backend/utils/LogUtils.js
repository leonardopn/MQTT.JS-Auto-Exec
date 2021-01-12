import store from "../../index.js"
import { generateDate } from "./DateUtils"

import {updateTextTextarea} from "../../frontend/store/actions/terminal"

function setLog(text) {
    const terminal = store.getState().terminal;
    const textToDispacth = terminal.textTextArea + "\n\n" + generateDate() + text;
    store.dispatch(updateTextTextarea(textToDispacth));
}

export { setLog }