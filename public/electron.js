export { }
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import startServer from "../src/backend/server"

require('v8-compile-cache');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

let mainWindow;

function startExtensionsDev(extensions) {
    extensions.forEach(extension => {
        installExtension(extension)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
    })

}

function createWindow() {
    startServer().then(value => {
        (isDev) && startExtensionsDev([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]);

        console.log("Comandos carregados: " + value.payload.size + "\n");

        mainWindow = new BrowserWindow({
            width: 800, height: 600, webPreferences: {
                nodeIntegration: true,
            },
        });
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