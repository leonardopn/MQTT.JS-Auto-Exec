const fs = require("fs");
const home = require('os').homedir();
const Command = require("../model/entities/Command")

const folderApp = home + "/.mqtt_js/";

function createFoldersApp() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(folderApp)) {
            fs.mkdir(folderApp, e => {
                if (e) {
                    reject({ type: "ERRO", payload: e })
                }
                fs.mkdir(folderApp + "commands/", error => {
                    if (error) {
                        reject({ type: "ERRO", payload: error })
                    }
                    resolve({ type: "OK", payload: "Pastas criadas!" })
                });
            })
        }
        else {
            if (!fs.existsSync(folderApp + "commands/")) {
                fs.mkdir(folderApp + "commands/", error => {
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
            let commands = new Map();
            let files = fs.readdirSync(folderApp + "commands/");
            let arrayErrados = [];

            files.forEach(file => {
                let fileRead = fs.readFileSync(folderApp + "commands/" + file);
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
                console.log(id);
                id = randomId(5, "aA0");
            }

            let element = Array.from(global.commands.values()).filter(e => {
                return (e.command === data.command || e.name === data.name);
            })[0];

            let file = folderApp + "commands/" + data.name + ".json";

            let command = new Command(id, data.command, data.name, file);

            if (!element) {
                if (id && data.command && data.name && file) {
                    global.commands.set(id, command);
                    fs.writeFile(file, JSON.stringify(command), error => {
                        if (error) {
                            reject({ type: "ERRO", payload: error })
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
            reject({ type: "ERRO", payload: error });
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
            let valor = global.commands.get(id);

            if (valor) {
                fs.unlink(valor.path, error => {
                    if (error) {
                        reject({ type: "ERRO", payload: error });
                    }

                    global.commands.delete(id);
                    resolve({ type: "OK", payload: valor })
                })
            }
            else {
                reject({ type: "WARNING", payload: "<p>ATENÇÃO: Valor não encontrado</p>" })
            }
        } catch (error) {
            reject({ type: "ERRO", payload: error })
        }
    })
}

function updateCommand(data) {
    return new Promise((resolve, reject) => {
        if (data.id && data.command && data.name) {
            let valor = global.commands.get(data.id);
            if (valor) {
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
            reject({ type: "WARNING", payload: `<p>WARNING - Informações faltantes</p>` });
        }
    });
}

function executeCommand(id) {
    return new Promise((resolve, reject) => {
        try {
            let command = global.commands.get(id);
            if (command) {
                command.execCommand().then(value => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    resolve(value);
                }).catch(error => {//NOTE não utiliza padrão de payload pq ele já recebe um payload
                    reject(error);
                })
            }
            else {
                reject({ type: "WARNING", payload: `<p>WARNING - Comando não encontrado</p>` })
            }
        } catch (error) {
            reject({ type: "ERRO", payload: error })
        }
    })
}

function getConfig() {
    return new Promise((resolve, reject) => {
        fs.readFile(folderApp + "config.json", (error, data) => {
            try {
                if (error) {
                    reject({ type: "ERRO", payload: error.message })
                }

                let json = JSON.parse(data);
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
    })
}

function updateConfig(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(folderApp + "config.json", JSON.stringify(data), error => {
            if (error) {
                reject({ type: "ERRO", payload: error })
            }
            resolve({ type: "OK", payload: "STATUS_OK" });
        })
    });
}

module.exports = { updateConfig, createFoldersApp, loadCommands, createFileCommand, getCommands, deleteCommand, updateCommand, executeCommand, getConfig };