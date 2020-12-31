const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const router = require('./config/routes');
const { loadCommands, createFoldersApp } = require('./utils/DriveUtils')

const server = express();

var corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(router);

const porta = 8888;

function loadDb() {
    return new Promise((resolve, reject) => {
        createFoldersApp().then(value => {
            console.log(value.payload);
            loadCommands().then(value => {
                global.commands = value.payload;
                resolve(value)
            }).catch(error => {
                reject(error)
            });
        }).catch(e => {
            reject(e)
        })
    })
}

function startServer() {
    return new Promise((resolve, reject) => {
        server.listen(porta, async _ => {
            console.log(`Backend escutando na porta ${porta}!`);
            console.log("Carregando comandos ...");
            loadDb().then(value => {
                resolve(value);
            }).catch(error => {
                reject(error)
            });
        });
    })
}

module.exports = startServer;