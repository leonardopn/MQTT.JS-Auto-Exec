const express = require('express')
const { configDefault, verificaObjetoDefault } = require("../config/defaultConfigs")
const router = express.Router();
const { deleteCommand,
    updateCommand,
    getCommands,
    createFileCommand,
    executeCommand,
    getConfig,
    updateConfig } = require("../utils/DriveUtils")

router.get('/getCommands', function (_, res) {
    getCommands().then(value => {
        res.send(value.payload).status(200);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.send(error.payload.message).status(404);
        }
        if (error.type === "WARNING") {
            res.send(error.payload).status(404);
        }
    })
});

router.post('/addCommand', function (req, res) {
    createFileCommand(req.body).then(value => {
        res.send(value.payload).status(200);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.send(error.payload.message).status(404);
        }
        if (error.type === "WARNING") {
            res.send(error.payload).status(404);
        }
    })
});

router.delete('/deleteCommand/:id', function (req, res) {
    deleteCommand(req.params.id).then(value => {
        res.send(value.payload).status(200);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.send(error.payload.message).status(404);
        }
        if (error.type === "WARNING") {
            res.send(error.payload).status(404);
        }
    })
});

router.put('/updateCommand', function (req, res) {
    updateCommand(req.body).then(value => {
        res.send(value.payload).status(200);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.send(error.payload.message).status(404);
        }
        if (error.type === "WARNING") {
            res.send(error.payload).status(404);
        }
    });
});

router.get('/execCommand/:id', function (req, res) {
    executeCommand(req.params.id).then(value => {
        res.send(value.payload).status(200);
    }).catch(error => {
        if (error.type === "ERRO") {
            res.send(error.payload.message).status(404);
        }
        if (error.type === "WARNING") {
            res.send(error.payload).status(404);
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

module.exports = router;