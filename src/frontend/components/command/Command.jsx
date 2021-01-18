import React, { useState } from "react";
import Card from "../card/Card";
import axios from "axios";
import { connect } from "react-redux";
import { getCommands } from "../../store/actions/commandsAction";
import { setLog } from "../../../backend/utils/LogUtils"

const Command = props => {
    let conteudoCommand = "";
    const [inputValueName, setValueInputName] = useState(props.name);
    const [inputValueCommand, setValueInputCommand] = useState(props.command);

    function closeNewCommand() {
        props.deleteNewCommand("");
    }

    function addCommand() {
        const data = {
            name: inputValueName,
            command: inputValueCommand
        };
        axios.post("http://localhost:8888/addcommand", data).then(_ => {
            props.getCommands();
            props.deleteNewCommand("");
            setLog(`Comando "${data.name}" criado!`);
        }).catch(error => {
            setLog(JSON.parse(error.request.response).payload);
        })
    }

    function removeCommand() {
        axios.delete("http://localhost:8888/deleteCommand/" + props.id).then(_ => {
            props.getCommands();
            setLog(`Comando "${props.name}" excluído!`);
        }).catch(error => {
            setLog(JSON.parse(error.request.response).payload);
        })
    }

    if (!props.isNew) {
        const conteudo = (
            <React.Fragment>
                <p>Id: {props.id}</p>
                <p>Título: {props.name}</p>
                <p>Comando: {props.command}</p>
                <p>Pasta: {props.folder}</p>
                <button onClick={e => removeCommand()}>Excluir</button>
            </React.Fragment>
        )
        conteudoCommand = conteudo;
    } else {
        const conteudo = (
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
                            <td><b><label htmlFor={"nameComand" + props.id}>Título: </label></b></td>
                            <td> <input type="text" name={"nameComand" + props.id} defaultValue={inputValueName} className="inputDefault" onChange={e => setValueInputName(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td><b><label htmlFor={"scriptComand" + props.id}>Comando: </label></b></td>
                            <td>  <input type="text" name={"scriptComand" + props.id} defaultValue={inputValueCommand} className="inputDefault" onChange={e => setValueInputCommand(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={e => addCommand()}>Criar</button>
                <button onClick={e => closeNewCommand()}>X</button>
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

const mapDispatchToProps = dispatch => {
    return (
        {
            getCommands() {
                const action = getCommands();
                action.payload.then(value => {
                    action.payload = value;
                    dispatch(action);
                });
            }
        }
    )
}

export default connect(null, mapDispatchToProps)(Command);