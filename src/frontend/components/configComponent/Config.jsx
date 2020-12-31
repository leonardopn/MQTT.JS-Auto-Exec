
import React, { useState } from "react";
import axios from "axios";
import "./config.css"
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconConfigDark from "../../img/config_dark_100.png"
import { connect } from "react-redux";
import { getConfig } from "../../store/actions/configs"

const Config = props => {
    let valor = "";
    function getConfig() {
        axios.get("http://localhost:8888/getConfig").then(value => {
            valor = value.data.serverIp
        });
    }
    getConfig();


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
                            <td><b><label for="ipServerMQTT">IP servidor: </label></b></td>
                            <td><input type="text" name="ipServerMQTT" value={props.ip} className="inputDefault"></input></td>
                        </tr>
                        <tr>
                            <td> <b><label for="userServerMQTT">Usuário: </label></b></td>
                            <td><input type="text" name="userServerMQTT" value={props.user} className="inputDefault"></input></td>
                        </tr>
                        <tr>
                            <td><b><label for="passServerMQTT">Senha: </label></b></td>
                            <td><input type="password" name="passServerMQTT" value={props.pass} className="inputDefault"></input></td>
                        </tr>
                        <tr>
                            <td><b><label for="topicServerMQTT">Tópico: </label></b></td>
                            <td><input type="text" name="topicServerMQTT" value={props.topic} className="inputDefault"></input></td>
                        </tr>
                    </tbody>
                </table>
                <button>Testar conexão</button>
                <button onClick={e => getConfig()}>Salvar</button>
                <p>{props.ip}</p>
            </Card>

            <Card>
                <h3>Cliente</h3>
                <label for="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                <input type="checkbox" name="checkBoxOpenStartupSystem" value={props.startup}></input>
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
                dispatch(action);
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);