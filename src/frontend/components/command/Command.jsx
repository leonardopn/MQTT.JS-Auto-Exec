import React, { useState } from "react";
import Card from "../card/Card";
import axios from "axios";
import { connect } from "react-redux";
import { getCommands } from "../../store/actions/commandsAction";
import { setLog } from "../../../backend/utils/LogUtils";
import DivFlex from "../divFlex/DivFlex";
import "./command.css"

const Command = props => {
    const [inputValueName, setValueInputName] = useState(props.name);
    const [inputValueCommand, setValueInputCommand] = useState(props.command);
    const [type, setType] = useState(props.type);

    function closeNewCommand() {
        props.deleteNewCommand("");
    }

    function resetValuesUpdate() {
        setValueInputName(props.name);
        setValueInputCommand(props.command);
        setType("CREATED")
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

    function updateCommand() {
        const data = {
            id: props.id,
            name: inputValueName,
            command: inputValueCommand,
        };

        axios.put("http://localhost:8888/updatecommand", data).then(_ => {
            props.getCommands();
            setLog(`Comando "${props.name}" atualizado!`);
        }).catch(error => {
            setLog(JSON.parse(error.request.response).payload);
        });
    }

    function testCommand() {
        axios.get("http://localhost:8888/execCommand/" + props.id).then(response => {
            setLog(`Comando "${props.name}" executado! Saída: ${response.data}`);
        }).catch(error => {
            setLog(JSON.parse(error.request.response).payload);
        });
    }

    switch (type) {
        case "NEW":
            return (
                <Card class="intern">
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
                    <button onClick={_ => addCommand()}>Criar</button>
                    <button onClick={_ => closeNewCommand()}>X</button>
                </Card>
            );
        case "UPDATE":
            return (
                <Card class="intern">
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
                    <button onClick={_ => updateCommand()}>Atualizar</button>
                    <button onClick={_ => resetValuesUpdate()}>Cancelar</button>
                </Card>
            )
        default:
            return (

                <div className="divCommandIntern">
                    <h2>ID: <b>{props.id}</b></h2>
                    <p><b>Título:</b> {props.name}</p>
                    <p><b>Comando:</b> {props.command}</p>
                    <p><b>Localização:</b> {props.folder}</p>
                    <br></br>
                    <DivFlex type="Center">
                        <button className="buttonCancel" onClick={_ => removeCommand()}>Excluir</button>
                        <button className="buttonTest" onClick={_ => testCommand()}>Executar</button>
                        <button className="buttonUpdate" onClick={_ => setType("UPDATE")}>Atualizar</button>
                    </DivFlex>
                </div>

            );
    }
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