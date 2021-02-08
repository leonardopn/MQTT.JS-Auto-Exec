require('v8-compile-cache');
const startServer = require("./backend/server.js");
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    startServer().then(value => {
        console.log("Comandos carregados: " + value.payload.size + "\n");
        mainWindow = new BrowserWindow({
            width: 800, height: 600, webPreferences: {
                nodeIntegration: true,
            },
        });

        mainWindow.setMaximumSize(800, 600);
        mainWindow.setMinimumSize(800, 600);

        if (isDev) {
            const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
            [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS].forEach(extension => {
                installExtension(extension)
                    .then((name) => console.log(`Added Extension:  ${name}`))
                    .catch((err) => console.log('An error occurred: ', err));
            })
            mainWindow.loadURL('http://localhost:3000');
            mainWindow.webContents.openDevTools();
        }
        else {
            mainWindow.loadURL(`file://${path.resolve(__dirname, '..', 'build', 'index.html')}`)
        }

        mainWindow.on('closed', function () {
            mainWindow = null
        });
    }).catch(error => {
        console.log(error);
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