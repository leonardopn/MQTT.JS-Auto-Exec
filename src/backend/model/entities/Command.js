import { exec } from 'child_process';

module.exports = class Command {
    constructor(id, command, name, path) {
        this.id = id;
        this.command = command;
        this.name = name;
        this.path = path;
    }

    execCommand() {
        return new Promise((resolve, reject) => {
            exec(this.command, (erro, saida, saidaErro) => {
                if (erro) {
                    reject({ type: "ERRO", payload: erro.message + "\nSaída de erro da execução: " + saidaErro })
                    return;
                }
                if (saida) {
                    resolve({ type: "OK", payload: saida });
                    return
                }
                resolve({ type: "OK", payload: `Sem saída` });
                return
            });
        })
    }

    setCommand(command) {
        this.command = command;
    }
}