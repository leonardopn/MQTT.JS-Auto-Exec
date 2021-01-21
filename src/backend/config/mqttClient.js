const mqtt = require('async-mqtt');
const {setLog} = require('../utils/LogUtils')

function getMQTTConnection(params) {
    const client = mqtt.connect(params.host, { username: params.user, password: params.pass, keepalive: 10, reconnectPeriod: 5000 });

    async function subscribeTopic() {
        setLog("Conexão feita com sucesso!");
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
        console.log(message.toString())
    });

    return client;
}

module.exports = { getMQTTConnection };