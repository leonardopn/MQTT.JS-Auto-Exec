import { Date } from "globalthis/implementation";
import React from "react";
import "./terminal.css"

export default props => {
    function generateDate() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let year = date.getFullYear()
        let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

        return `(${day}/${month}/${year}) ${hour}:${minute} - `;
    }

    let valor = (generateDate() + `Algum comando`)

    return (
        <textarea id="textAreaTerminal">
            {valor}
        </textarea>
    )
}