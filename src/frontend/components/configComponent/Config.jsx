
import React from "react";
import "./config.css"
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconConfigDark from "../../img/config_dark_100.png"
import axios from "axios";
import { connect } from "react-redux";
import { updateConfig, resetConfig, } from "../../store/actions/configs"

const { setLog } = require("../../../backend/utils/LogUtils")

const Config = props => {
    const [valueIP, setValueIP] = React.useState("");
    const [valueUser, setValueUser] = React.useState("");
    const [valuePass, setValuePass] = React.useState("");
    const [valueTopic, setValueTopic] = React.useState("");
    const [valueStartUp, setValueStartUp] = React.useState(false);
    const [valueProblem, setValueProblem] = React.useState("");
    const [valueTestMQTT, setValueTestMQTT] = React.useState("");

    React.useEffect(() => {
        setValueIP(props.configs.serverIp);
        setValueProblem(props.configs.problem.message);
        setValueUser(props.configs.user);
        setValuePass(props.configs.pass);
        setValueTopic(props.configs.topic);
        setValueStartUp(props.configs.startup);
    }, [props.configs]);

    function setConfig() {
        let data = {
            serverIp: valueIP,
            user: valueUser,
            pass: valuePass,
            topic: valueTopic,
            startup: valueStartUp
        };
        axios.put("http://localhost:8888/updateConfig", data).then(_ => {
            setLog("Configurações salvas!");
            props.updateConfig(data);
        }).catch(error => {
            setLog(error.response.data.type + " - " + error.response.data.payload);
        })
    }

    function testConnectionMQTT() {
        let data = {
            serverIp: valueIP,
            user: valueUser,
            pass: valuePass,
            topic: valueTopic,
            startup: valueStartUp
        };

        axios.post("http://localhost:8888/testServerMQTT", data).then(_ => {
            setValueTestMQTT("true");
        }).catch(error => {
            setValueTestMQTT("false");
        })
    }

    return (
        <div style={{
            position: "absolute", flex: 1, width: "100%",
            height: "100%"

        }}>
            <Card class="main" id="divConfig">
                <b>{valueProblem}</b>
                <DivFlex>
                    <img src={iconConfigDark} className="iconM" alt="config_icon"></img>
                    <h2>Configurações</h2>
                </DivFlex>
                <Card class={"intern"}>
                    <h3>Servidor MQTT</h3>
                    <br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td><b><label htmlFor="ipServerMQTT">IP servidor: </label></b></td>
                                <td><input type="text" name="ipServerMQTT" value={valueIP} className="inputDefault" onChange={e => setValueIP(e.target.value)}></input></td>
                            </tr>
                            <tr>
                                <td> <b><label htmlFor="userServerMQTT">Usuário: </label></b></td>
                                <td><input type="text" name="userServerMQTT" value={valueUser} className="inputDefault" onChange={e => setValueUser(e.target.value)}></input></td>
                            </tr>
                            <tr>
                                <td><b><label htmlFor="passServerMQTT">Senha: </label></b></td>
                                <td><input type="password" name="passServerMQTT" value={valuePass} className="inputDefault" onChange={e => setValuePass(e.target.value)}></input></td>
                            </tr>
                            <tr>
                                <td><b><label htmlFor="topicServerMQTT">Tópico: </label></b></td>
                                <td><input type="text" name="topicServerMQTT" value={valueTopic} className="inputDefault" onChange={e => setValueTopic(e.target.value)}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={_ => testConnectionMQTT()}>Testar conexão</button>
                    <p>Status: {valueTestMQTT}</p>
                </Card>
                <Card class={"intern"}>
                    <h3>Cliente</h3>
                    <label htmlFor="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                    <input type="checkbox" name="checkBoxOpenStartupSystem" onChange={e => setValueStartUp(e.target.checked)} checked={valueStartUp}></input>
                </Card>
                <button onClick={_ => setConfig()}>Salvar</button>
                <button onClick={_ => props.resetConfig()}>Configurações Padrão</button>
            </Card>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        configs: state.configs,
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            resetConfig() {
                const action = resetConfig();
                dispatch(action);
            },
            updateConfig(data) {
                const action = updateConfig(data);
                dispatch(action);
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);