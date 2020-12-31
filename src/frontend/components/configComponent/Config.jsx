
import React from "react";
import "./config.css"
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconConfigDark from "../../img/config_dark_100.png"
import { connect } from "react-redux";
import { getConfig, updateIpConfig, updatePass, updateStartUp, updateUser, updateTopic } from "../../store/actions/configs"

const Config = props => {

    const { getConfig } = props;

    React.useEffect(() => {
        getConfig();
    }, [getConfig]);

    return (
        <div id="divConfig">
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
                <button>Salvar</button>
            </Card>
            <Card>
                <h3>Cliente</h3>
                <label htmlFor="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                <input type="checkbox" name="checkBoxOpenStartupSystem" onChange={e => props.updateStartUp(e.target.checked)} checked={props.startup}></input>
            </Card>
        </div>
    )
}

const mapStateToProps = state => {
    return {
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
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);