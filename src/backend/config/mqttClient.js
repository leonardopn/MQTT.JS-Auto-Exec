import mqtt from 'async-mqtt';
import { io } from "../config/socketServer";

function achaComandoEExecuta(comando) {
    global.commands.forEach(command => {
        if ((command.name === comando || command.command === comando)) {
            command.execCommand();
        }
    })
}

function getMQTTConnection(params) {
    const client = mqtt.connect(params.host, { username: params.user, password: params.pass, keepalive: 5, reconnectPeriod: 1000, connectTimeout: 5000 });
    async function subscribeTopic() {
        console.log("Conexão feita com sucesso!");
        try {
            client.subscribe("/devices/pc_gamer");
        } catch (e) {
            console.log(e.stack);
        }
    }

    async function errorConnect(error) {
        console.log(error.message);
        console.log("Deu erro");
    }

    async function reconnect() {
        console.log("Tentando Re-conexão");
    }

    async function offLine() {
        console.log("Sem conexão");
    }

    async function close() {
        console.log("Conexão fechada!");
    }

    client.on("connect", subscribeTopic);
    client.on("error", errorConnect);
    client.on("close", close);
    client.on("offline", offLine);
    client.on("reconnect", reconnect);
    client.on('message', function (topic, message) {
        console.log(message.toString());
        achaComandoEExecuta(message.toString());
    });

    return client;
}

export { getMQTTConnection };