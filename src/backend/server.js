import express from "express"
import { getMQTTConnection } from "./config/mqttClient"
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './config/routes';
import { loadCommands, createFoldersApp } from './utils/DriveUtils';
import { startServerSocket } from "./config/socketServer";
import axios from "axios";

const serverExpress = express();

var corsOptions = {
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
        try {
            startServerSocket().then(value => {
                serverExpress.listen(porta, async _ => {
                    console.log(`Backend escutando na porta ${porta}!`);
                    console.log("Carregando comandos ...");
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

export default startServer;