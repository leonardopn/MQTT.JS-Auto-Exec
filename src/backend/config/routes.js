import { getMQTTConnection, testConnection } from "./mqttClient";
import express from 'express'
import { configDefault, verificaObjetoDefault } from "../config/defaultConfigs"
const router = express.Router();
import {
    deleteCommand,
    updateCommand,
    getCommands,
    createFileCommand,
    executeCommand,
    getConfig,
    updateConfig
} from "../utils/DriveUtils";

router.get("/", (req, res) => {
    res.status(200).send({ response: "I am alive" });
});

router.get('/getCommands', function (_, res) {
    getCommands().then(value => {
        res.status(200).send(value.payload);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.status(404).send(error.payload.message);
        }
        if (error.type === "WARNING") {
            res.status(404).send(error.payload);
        }
    })
});

router.post('/addCommand', function (req, res) {
    createFileCommand(req.body).then(value => {
        res.status(200).send(value.payload);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.status(404).send(error);
        }
        if (error.type === "WARNING") {
            res.status(404).send(error);
        }
    })
});

router.delete('/deleteCommand/:id', function (req, res) {
    deleteCommand(req.params.id).then(value => {
        res.status(200).send(value.payload);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.status(404).send(error);
        }
        if (error.type === "WARNING") {
            res.status(404).send(error);
        }
    })
});

router.put('/updateCommand', function (req, res) {
    updateCommand(req.body).then(value => {
        res.send(value.payload).status(200);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.status(404).send(error);
        }
        if (error.type === "WARNING") {
            res.status(404).send(error);
        }
    });
});

router.get('/execCommand/:id', function (req, res) {
    executeCommand(req.params.id).then(value => {
        res.status(200).send(value.payload);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.status(404).send(error);
        }
        if (error.type === "WARNING") {
            res.status(404).send(error);
        }
    });
});

router.get('/getConfig', function (_, res) {
    getConfig().then(value => {
        res.status(200).send(value.payload);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.status(404).send(error);
        }
        if (error.type === "WARNING") {
            res.status(500).send(error);
        }
    })
});

router.put('/updateConfig', function (req, res) {
    if (verificaObjetoDefault(configDefault, req.body)) {
        updateConfig(req.body).then(value => {
            res.status(200).send(value);
        }).catch(error => {
            if (error.type === "ERRO") {
                res.status(404).send(error);
            }
        });
    } else {
        res.status(404).send({ type: "WARNING", payload: "Requisição com body vazio" });
    }
});

router.post('/startServerMQTT', function (req, res) {
    getMQTTConnection(req.body).then(value => {
        res.status(200).send(value);
    }).catch(error => {
        res.status(404).send(error);
    });
});

router.post('/testServerMQTT', function (req, res) {
    testConnection(req.body).then(value => {
        res.status(200).send(value);
    }).catch(error => {
        res.status(404).send(error);
    });
});

export default router;