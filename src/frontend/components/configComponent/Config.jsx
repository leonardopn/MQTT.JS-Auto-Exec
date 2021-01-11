
import React from "react";
import "./config.css"
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconConfigDark from "../../img/config_dark_100.png"
import axios from "axios";
import { connect } from "react-redux";
import { getConfig, updateIpConfig, updatePass, updateStartUp, updateUser, resetConfig, updateTopic, problemGetConfig } from "../../store/actions/configs"

const Config = props => {

    const { getConfig } = props;

    React.useEffect(() => {
        getConfig();
    }, [getConfig]);

    function setConfig() {
        let data = { ...props.configs };
        delete data.problem;//Dando problema
        axios.put("http://localhost:8888/updateConfig", data).then(value => {
            console.log(value.data);
        }).catch(error => {
            console.log(error.response.data);
        })
    }

    return (
        <div id="divConfig">
            <p className="problem"><b>{props.problem.message}</b></p>
            <DivFlex>
                <img src={iconConfigDark} className="iconM" alt="config_icon"></img>
                <h2>Configurações</h2>
            </DivFlex>
            <Card>
                <h3>Servidor MQTT</h3>
                <br></br>
                <table>
                    <tbody>
                        <tr>
                            <td><b><label htmlFor="ipServerMQTT">IP servidor: </label></b></td>
                            <td><input type="text" name="ipServerMQTT" value={props.ip} className="inputDefault" onChange={e => props.updateIp(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td> <b><label htmlFor="userServerMQTT">Usuário: </label></b></td>
                            <td><input type="text" name="userServerMQTT" value={props.user} className="inputDefault" onChange={e => props.updateUser(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td><b><label htmlFor="passServerMQTT">Senha: </label></b></td>
                            <td><input type="password" name="passServerMQTT" value={props.pass} className="inputDefault" onChange={e => props.updatePass(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td><b><label htmlFor="topicServerMQTT">Tópico: </label></b></td>
                            <td><input type="text" name="topicServerMQTT" value={props.topic} className="inputDefault" onChange={e => props.updateTopic(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                </table>
                <button>Testar conexão</button>
            </Card>
            <Card>
                <h3>Cliente</h3>
                <label htmlFor="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                <input type="checkbox" name="checkBoxOpenStartupSystem" onChange={e => props.updateStartUp(e.target.checked)} checked={props.startup}></input>
            </Card>
            <button onClick={_ => setConfig()}>Salvar</button>
            <button onClick={_ => props.resetConfig()}>Configurações Padrão</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        configs: state.configs,
        problem: state.configs.problem,
        ip: state.configs.serverIp,
        user: state.configs.user,
        pass: state.configs.pass,
        topic: state.configs.topic,
        startup: state.configs.startup
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            getConfig() {
                const action = getConfig();
                action.payload.then(value => {
                    action.payload = value;
                    dispatch(action);
                }).catch(error => {
                    const actionProblem = problemGetConfig("ATENÇÃO - Servidor não tratou bem a requisição, configurações padrões carregadas!");
                    dispatch(actionProblem);
                })
            },
            updateIp(value) {
                const action = updateIpConfig(value);
                dispatch(action);
            },
            updateUser(value) {
                const action = updateUser(value);
                dispatch(action);
            },
            updatePass(value) {
                const action = updatePass(value);
                dispatch(action);
            },
            updateTopic(value) {
                const action = updateTopic(value);
                dispatch(action);
            },
            updateStartUp(value) {
                const action = updateStartUp(value);
                dispatch(action);
            },
            resetConfig() {
                const action = resetConfig();
                dispatch(action);
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);