import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCommands } from "../../store/actions/commandsAction";
import { setLog } from "../../scripts/LogUtils";
import DivFlex from "../divFlex/DivFlex";
import "./command.css";
import { useSpring, animated as a } from 'react-spring';

const Command = props => {
    const [inputValueName, setValueInputName] = useState(props.name);
    const [inputValueCommand, setValueInputCommand] = useState(props.command);
    const [type, setType] = useState(props.type);

    const { transform, opacity } = useSpring({
        opacity: type === "CREATED" || type === "NEW" ? 1 : 0,
        transform: `perspective(1000px) rotateX(${type === "CREATED" || type === "NEW" ? 0 : 0}deg)`,
        config: { mass: 1, tension: 1000, friction: 50 }
    })

    function closeNewCommand() {
        props.closeNewCommand();
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
            closeNewCommand();
            setLog(`Comando "${data.name}" criado!`);
            props.getCommands();
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
            setType("CREATED");
            setTimeout(() => {
                props.getCommands();
            }, 400)

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
                <div className="divCommandIntern">
                    <DivFlex type="Center">
                        <b><label htmlFor={"nameComand" + props.id}>Título: </label></b>
                        <input type="text" name={"nameComand" + props.id} defaultValue={inputValueName} className="inputDefault" onChange={e => setValueInputName(e.target.value)}></input>
                    </DivFlex>
                    <DivFlex type="Center">
                        <b><label htmlFor={"scriptComand" + props.id}>Comando: </label></b>
                        <input type="text" name={"scriptComand" + props.id} defaultValue={inputValueCommand} className="inputDefault" onChange={e => setValueInputCommand(e.target.value)}></input>

                    </DivFlex>
                    <br></br>
                    <DivFlex type="Center">
                        <button className="buttonUpdate buttonOfCommand" onClick={_ => addCommand()}>Criar</button>
                        <button className="buttonCancel buttonOfCommand" onClick={_ => closeNewCommand()}>Cancelar</button>
                    </DivFlex>
                </div>
            );
        case "UPDATE":
            return (
                <a.div className="divCommandIntern" style={{ opacity: opacity.interpolate(o => 1 - o), transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} >
                    <div id="divSpringRotacionada">
                        <DivFlex type="Center">
                            <h2>ID: {props.id}</h2>
                        </DivFlex>
                        <DivFlex>
                            <input placeholder="Insira o nome do comando." type="text" name={"nameComand" + props.id} defaultValue={inputValueName} className="inputDefault" onChange={e => setValueInputName(e.target.value)}></input>
                            <input placeholder="Insira o comando que será executado" type="text" name={"scriptComand" + props.id} defaultValue={inputValueCommand} className="inputDefault" onChange={e => setValueInputCommand(e.target.value)}></input>
                        </DivFlex>
                        <br></br>
                        <DivFlex type="Center">
                            <button className="buttonCancel" onClick={_ => resetValuesUpdate()}>Cancelar</button>
                            <button className="buttonUpdate" onClick={_ => updateCommand()}>Atualizar</button>
                        </DivFlex>
                    </div>
                </a.div>
            )
        default:
            return (
                <a.div className="divCommandIntern" style={{ opacity, transform }} >
                    <DivFlex type="Center">
                        <h2>ID: {props.id}</h2>
                    </DivFlex>
                    <p><b>Título:</b> {props.name}</p>
                    <p><b>Comando:</b> {props.command}</p>
                    <p><b>Localização:</b> {props.folder}</p>
                    <br></br>
                    <DivFlex type="Center">
                        <button className="buttonCancel" onClick={_ => removeCommand()}>Excluir</button>
                        <button className="buttonTest" onClick={_ => testCommand()}>Executar</button>
                        <button className="buttonUpdate" onClick={_ => setType("UPDATE")}>Atualizar</button>
                    </DivFlex>
                </a.div>
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