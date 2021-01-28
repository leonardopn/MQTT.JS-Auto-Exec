import mqtt from 'async-mqtt';
import { io } from "../config/socketServer";

let contadorReconnect = 1;

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

async function subscribeTopic(params) {
    try {
        if (params.client.connected) {
            contadorReconnect = 1;
            io.sockets.emit("LOG_TERMINAL", `Conexão ao servidor: ${params.serverIp} feita com sucesso!`);
            io.sockets.emit("STATUS_MQTT", true);
            params.client.subscribe(params.topic);
        }
    } catch (e) {
        console.log(e.stack);
    }
}

async function errorConnect(error) {
    io.sockets.emit("LOG_TERMINAL", "ERRO - " + error.message);
}

async function reconnect(params) {
    io.sockets.emit("STATUS_MQTT", false);
    if (contadorReconnect <= 3) {
        io.sockets.emit("LOG_TERMINAL", `Tentativa ${contadorReconnect} de reconexão ao servidor MQTT no endereço: ${params.serverIp}`);
        contadorReconnect++;
    }
    else {
        io.sockets.emit("LOG_TERMINAL", `Número máximo de tentativas de re-conexão foram feitas, tentando novamente em 30 segundos.`);
        io.sockets.emit("STATUS_TIMER_MQTT", true);
        params.client.end();
        contadorReconnect = 1;
    }
}

async function offLine() {
    io.sockets.emit("LOG_TERMINAL", `Servidor MQTT offline.`);
}

function getMQTTConnection(params) {
    return new Promise((resolve, reject) => {
        try {
            if (global.clientMQTT) {
                global.clientMQTT.end();
                contadorReconnect = 1;
            }

            const client = mqtt.connect(params.serverIp, { username: params.user, password: params.pass, keepalive: 5, reconnectPeriod: 1000, connectTimeout: 5000 });
            client.on("connect", () => {
                subscribeTopic({ client, ...params });
            });

            client.on("error", error => {
                errorConnect(error)
            });
            client.on("offline", offLine);
            client.on("reconnect", () => {
                reconnect({ client, ...params })
            });
            client.on('message', (_, message) => {
                io.sockets.emit("LOG_TERMINAL", `A mensagem: "${message.toString()}" foi recebida do servidor MQTT.`);
                achaComandoEExecuta(message.toString());
            });
            global.clientMQTT = client;
            resolve({ status: "OK", payload: "OK" });

        } catch (error) {
            reject({ status: "ERRO", payload: error });
        }
    })
}


export { getMQTTConnection };