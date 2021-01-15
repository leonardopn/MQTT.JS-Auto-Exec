import React, { useState } from "react";
import Card from "../card/Card"


const Command = props => {
    let conteudoCommand = "";

    if (!props.isNew) {
        const conteudo = (
            <React.Fragment>
                <p>Id: {props.id}</p>
                <p>Título: {props.name}</p>
                <p>Comando: {props.command}</p>
                <p>Pasta: {props.folder}</p>
            </React.Fragment>
        )
        conteudoCommand = conteudo;
    } else {
        const conteudo = (
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
                            <td> <b><label htmlFor={"idComand" + props.id}>ID: </label></b></td>
                            <td><input type="text" name={"idComand" + props.id} value={props.id} className="inputDefault" ></input></td>
                        </tr>
                        <tr>
                            <td><b><label htmlFor={"nameComand" + props.id}>Título: </label></b></td>
                            <td> <input type="text" name={"nameComand" + props.id} value={props.name} className="inputDefault" ></input></td>
                        </tr>
                        <tr>
                            <td><b><label htmlFor={"scriptComand" + props.id}>Comando: </label></b></td>
                            <td>  <input type="text" name={"scriptComand" + props.id} value={props.command} className="inputDefault" ></input></td>
                        </tr>
                        <tr>
                            <td><b><label htmlFor={"folderComand" + props.id}>Localização: </label></b></td>
                            <td> <input type="text" name={"folderComand" + props.id} value={props.folder} className="inputDefault" ></input></td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
        conteudoCommand = conteudo;
    }

    return (
        <Card class="intern">
            {conteudoCommand}
        </Card>
    );
}

export default Command;