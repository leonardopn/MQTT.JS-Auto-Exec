require('v8-compile-cache');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const startServer = require('../src/backend/server.js')

let mainWindow;

function createWindow() {
    startServer().then(value => {
        console.log("Comandos carregados: " + value.payload.size + "\n");
        mainWindow = new BrowserWindow({ width: 800, height: 600 });
        mainWindow.setMaximumSize(800, 600)
        mainWindow.setMinimumSize(800, 600)

        mainWindow.loadURL('http://localhost:3000');

        mainWindow.webContents.openDevTools();

        mainWindow.on('closed', function () {
            mainWindow = null
        });
    }).catch(error => {
        if (error.type === "ERRO") {
            console.log(error.payload.message);
        }
        if (error.type === "WARNING") {
            console.log("Pelo menos um arquivo de comando está fora do padrão! Por favor, arrume: ", error.payload);
        }
        process.exit(0)
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});