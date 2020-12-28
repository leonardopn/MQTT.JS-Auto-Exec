
import React from "react";
import "./config.css"
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconConfigDark from "../../img/config_dark_100.png"

export default props => {
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
                            <td><input type="text" name="ipServerMQTT" value="192.168.0.1"></input></td>
                        </tr>
                        <tr>
                            <td> <b><label for="userServerMQTT">Usuário: </label></b></td>
                            <td><input type="text" name="userServerMQTT" value="rasp_mqtt"></input></td>
                        </tr>
                        <tr>
                            <td><b><label for="passServerMQTT">Senha: </label></b></td>
                            <td><input type="password" name="passServerMQTT" value="192.168.0.1"></input></td>
                        </tr>
                        <tr>
                            <td><b><label for="topicServerMQTT">Tópico: </label></b></td>
                            <td><input type="text" name="topicServerMQTT" value="/devices/notebook"></input></td>
                        </tr>
                    </tbody>
                </table>
                <button>Testar conexão</button>
                <button>Salvar</button>
            </Card>

            <Card>
                <h3>Cliente</h3>
                <label for="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                <input type="checkbox" name="checkBoxOpenStartupSystem"></input>
            </Card>
        </div>
    )
}