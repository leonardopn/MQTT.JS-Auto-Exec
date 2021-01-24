import mqtt from 'async-mqtt';
import { io } from "../config/socketServer";

function achaComandoEExecuta(comando) {
    io.sockets.emit("LOG_TERMINAL", `Procurando o comando: "${comando}"`);
    let commandExists = false;
    global.commands.forEach(command => {
        if ((command.name === comando || command.command === comando)) {
            commandExists = true;
            io.sockets.emit("LOG_TERMINAL", `O comando: "${comando}" foi localizado e executado.`);
            command.execCommand().then(value => {
                io.sockets.emit("LOG_TERMINAL", `Comando "${command.name}" foi finalizado e sua saída é: ${value.payload}`);
            });
        }
    })

    if (!commandExists) {
        io.sockets.emit("LOG_TERMINAL", `Comando "${comando}" não foi encontrado.`);
    }
}

function getMQTTConnection(params) {
    const client = mqtt.connect(params.host, { username: params.user, password: params.pass, keepalive: 5, reconnectPeriod: 1000, connectTimeout: 5000 });
    async function subscribeTopic() {
        io.sockets.emit("LOG_TERMINAL", `Conexão ao servidor: ${params.host} feita com sucesso!`);
        try {
            client.subscribe("/devices/pc_gamer");
        } catch (e) {
            console.log(e.stack);
        }
    }

    async function errorConnect(error) {
        io.sockets.emit("LOG_TERMINAL", "ERRO - " + error.message);
    }

    async function reconnect() {
        io.sockets.emit("LOG_TERMINAL", `Tentando se re-conectar ao servidor MQTT no endereço: ${params.host}`);
    }

    async function offLine() {
        io.sockets.emit("LOG_TERMINAL", `Conexão com o servidor MQTT foi perdida.`);
    }

    client.on("connect", subscribeTopic);
    client.on("error", errorConnect);
    client.on("offline", offLine);
    client.on("reconnect", reconnect);
    client.on('message', function (_, message) {
        io.sockets.emit("LOG_TERMINAL", `A mensagem: "${message.toString()}" foi recebida do servidor MQTT.`);
        achaComandoEExecuta(message.toString());
    });

    return client;
}

export { getMQTTConnection };