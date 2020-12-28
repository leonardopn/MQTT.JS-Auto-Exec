
import React from "react";
import "./config.css"
import Card from "../card/Card"

export default props => {
    return (
        <div id="divConfig">
            <h2>Configurações</h2>
            <Card>
                <h3>Servidor MQTT</h3>
                <label for="ipServerMQTT">IP: </label>
                <input type="text" name="ipServerMQTT"></input>
                <br></br>
                <label for="userServerMQTT">Usuário: </label>
                <input type="text" name="userServerMQTT"></input>
                <br></br>
                <label for="passServerMQTT">Senha: </label>
                <input type="password" name="passServerMQTT"></input>
                <br></br>
                <label for="topicServerMQTT">Tópico: </label>
                <input type="text" name="topicServerMQTT"></input>
            </Card>

            <Card>
                <h3>Cliente</h3>
                <label for="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                <input type="checkbox" name="checkBoxOpenStartupSystem"></input>
            </Card>
        </div>
    )
}