const { configDefault } = require("../config/defaultConfigs.js");

const fs = require("fs");
const { homedir } = require('os');
const path = require("path");
const Command = require("../model/entities/Command.js");

const MAIN_PATH = path.resolve(homedir(), ".mqtt_js");
const COMMANDS_PATH = path.resolve(MAIN_PATH, "commands");
const CONFIG_FILE = path.resolve(MAIN_PATH, "config.json");

function createFoldersApp() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(MAIN_PATH)) {
            fs.mkdir(MAIN_PATH, e => {
                if (e) {
                    reject({ type: "ERRO", payload: e })
                }
                fs.mkdir(COMMANDS_PATH, error => {
                    if (error) {
                        reject({ type: "ERRO", payload: error })
                    }
                    resolve({ type: "OK", payload: "Pastas criadas!" })
                });
            })
        }
        else {
            if (!fs.existsSync(COMMANDS_PATH)) {
                fs.mkdir(COMMANDS_PATH, error => {
                    if (error) {
                        reject({ type: "ERRO", payload: error })
                    }
                    resolve({ type: "OK", payload: "Pastas criadas!" })
                });
            }
            else {
                resolve({ type: "OK", payload: "Pastas encontradas!" })
            }
        }
    })
}

function loadCommands() {
    return new Promise((resolve, reject) => {
        try {
            const commands = new Map();
            const files = fs.readdirSync(COMMANDS_PATH);
            const arrayErrados = [];
            files.forEach(file => {
                const fileRead = fs.readFileSync(path.resolve(COMMANDS_PATH, file));

                try {
                    let json = JSON.parse(fileRead);
                    if (json.id && json.command && json.name && json.path) {
                        commands.set(json.id, new Command(json.id, json.command, json.name, json.path))
                    }
                    else {
                        arrayErrados.push(file);
                    }
                } catch (error) {
                    arrayErrados.push(file);
                }
            });

            arrayErrados.length > 0 ? reject({ type: "WARNING", payload: arrayErrados }) : resolve({ type: "OK", payload: commands });
        } catch (error) {
            reject({ type: "ERRO", payload: error });
        }
    });
}

function createFileCommand(data) {
    return new Promise((resolve, reject) => {
        try {
            const randomId = require('random-id');
            let id = randomId(5, 'aA0');

            while (global.commands.get(id)) {
                id = randomId(5, "aA0");
            }

            let element = Array.from(global.commands.values()).filter(e => {
                return (e.command === data.command || e.name === data.name);
            })[0];

            const file = path.resolve(COMMANDS_PATH, data.name + ".json");

            const command = new Command(id, data.command, data.name, file);

            if (!element) {
                if (id && data.command && data.name && file) {
                    global.commands.set(id, command);
                    fs.writeFile(file, JSON.stringify(command), error => {
                        if (error) {
                            reject({ type: "ERRO", payload: error.message })
                        }
                        resolve({ type: "OK", payload: command });
                    })
                }
                else {
                    reject({ type: "WARNING", payload: `WARNING - Informações faltantes` });
                }
            }
            else {
                reject({ type: "WARNING", payload: `Comando: "${command.command}" já existe` });
            }
        } catch (error) {
            reject({ type: "ERRO", payload: error.message });
        }
    });
}

function getCommands() {
    return new Promise((resolve, reject) => {
        try {
            resolve({ type: "OK", payload: Array.from(global.commands.values()) });
        } catch (error) {
            reject({ type: "ERRO", payload: error });
        }
    });
}

function deleteCommand(id) {
    return new Promise((resolve, reject) => {
        try {
            const valor = global.commands.get(id);

            if (valor) {
                fs.unlink(valor.path, error => {
                    if (error) {
                        reject({ type: "ERRO", payload: error.message });
                    }

                    global.commands.delete(id);
                    resolve({ type: "OK", payload: valor })
                })
            }
            else {
                reject({ type: "WARNING", payload: "ATENÇÃO: Valor não encontrado!" })
            }
        } catch (error) {
            reject({ type: "ERRO", payload: error.message })
        }
    })
}

function updateCommand(data) {
    return new Promise((resolve, reject) => {
        if (data.id && data.command && data.name) {
            const valor = global.commands.get(data.id);
            if (valor) {//FIXME Fazer um jeito correto de atualizar e não criar depois apagar, isso ocasiona um erro de lógica
                createFileCommand(data).then(valueNext => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    deleteCommand(data.id).then(_ => {
                        resolve(valueNext);
                    }).catch(error => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                        reject(error);
                    });
                }).catch(error => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    reject(error);
                });
            }
            else {
                createFileCommand(data).then(value => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    resolve(value);
                }).catch(error => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    reject(error);
                });
            }
        }
        else {
            reject({ type: "WARNING", payload: `WARNING - Informações faltantes` });
        }
    });
}

function executeCommand(id) {
    return new Promise((resolve, reject) => {
        try {
            const command = global.commands.get(id);
            if (command) {
                command.execCommand().then(value => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    resolve(value);
                }).catch(error => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    reject(error);
                })
            }
            else {
                reject({ type: "WARNING", payload: `WARNING - Comando não encontrado` })
            }
        } catch (error) {
            reject({ type: "ERRO", payload: error.message })
        }
    })
}

function getConfig() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(CONFIG_FILE)) {
            fs.readFile(CONFIG_FILE, (error, data) => {
                try {
                    if (error) {
                        reject({ type: "ERRO", payload: error.message })
                    }

                    const json = JSON.parse(data);
                    if (json.topic && json.serverIp && json.user && json.pass && json.startup ? true : true) {
                        resolve({ type: "OK", payload: json })
                    }
                    else {
                        reject({ type: "WARNING", payload: `WARNING - Informações faltantes` });
                    }
                } catch (e) {
                    reject({ type: "ERRO", payload: e.message })
                }
            });
        }
        else {
            updateConfig(configDefault).then(value => {
                getConfig().then(value => {
                    resolve(value);
                }).catch(err => {
                    reject(err);
                });
            }).catch(error => {
                reject({ type: "ERRO", payload: error.message })
            })
        }
    })
}

function updateConfig(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(CONFIG_FILE, JSON.stringify(data), error => {
            if (error) {
                reject({ type: "ERRO", payload: error })
            }
            resolve({ type: "OK", payload: "STATUS_OK" });
        })
    });
}

module.exports = { updateConfig, createFoldersApp, loadCommands, createFileCommand, getCommands, deleteCommand, updateCommand, executeCommand, getConfig };