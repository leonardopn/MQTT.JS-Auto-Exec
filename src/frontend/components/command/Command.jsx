import React from "react";
import Card from "../card/Card"


const Command = props => {
    return (
        <Card class="intern">
            <p>Id: {props.id}</p>
            <p>Título: {props.name}</p>
            <p>Comando: {props.command}</p>
            <p>Pasta: {props.folder}</p>
        </Card>
    );
}

export default Command;