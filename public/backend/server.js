const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./config/routes.js');
const { loadCommands, createFoldersApp } = require('./utils/DriveUtils.js');
const { startServerSocket } = require("./config/socketServer.js");

const serverExpress = express();

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}

serverExpress.use(bodyParser.urlencoded({ extended: true }));
serverExpress.use(bodyParser.json());
serverExpress.use(cors(corsOptions));
serverExpress.use(router);

const porta = 8888;

function loadDb() {
    return new Promise((resolve, reject) => {
        createFoldersApp().then(value => {
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
        try {
            startServerSocket().then(value => {
                serverExpress.listen(porta, async _ => {
                    loadDb().then(value => {
                        resolve(value);
                    }).catch(error => {
                        reject(error)
                    });
                });
            }).catch(error => {
                reject(error)
            })
        } catch (error) {
            reject({ type: "ERRO", payload: error })
        }
    })
}

module.exports = startServer;