require('v8-compile-cache');
const startServer = require("./backend/server.js");
const path = require('path');
const electron = require('electron');
const nativeImage = electron.nativeImage;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const os = require('os');
const icon = nativeImage.createFromPath(os.platform() === "linux" ? __dirname + '/icon.png' : __dirname + '/icon.ico');

let mainWindow;

function createAbout() {
    const about = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            nodeIntegration: true,
        },
        icon: icon
    });
    if (!isDev) {
        about.loadURL(`file://${path.resolve(__dirname, '..', 'build', 'about.html')}`)
    }
    else {
        about.loadURL(`file://${path.resolve(__dirname, 'about.html')}`)
    }
    return about;
}

function createWindow() {
    startServer().then(_ => {
        mainWindow = new BrowserWindow({
            width: 800, height: 600, webPreferences: {
                nodeIntegration: true,
            },
            icon: icon
        });

        electron.Menu.setApplicationMenu(
            electron.Menu.buildFromTemplate(
                [{
                    label: 'Sair',
                    click: function () {
                        process.exit(0);
                    }
                },
                {
                    label: 'Ajuda',
                    submenu: [{
                        role: 'about', click: () => {
                            createAbout().show();
                        }
                    },
                    ],
                }]
            )
        )

        tray = new electron.Tray(icon);
        const contextMenu = electron.Menu.buildFromTemplate([
            {
                label: 'MQTT.JS Auto Exec',
                enabled: false
            },
            {
                label: 'Abrir',
                click: () => {
                    mainWindow.show(true);
                }
            },
            {
                label: 'About',
                click: () => {
                    createAbout().show();
                }
            },
            {
                label: 'Fechar',
                click: function () {
                    process.exit(0);
                }
            }
        ])
        tray.setToolTip('MQTT.JS Auto Exec');
        tray.setTitle('MQTT.JS Auto Exec');
        tray.setContextMenu(contextMenu)

        mainWindow.setMaximumSize(800, 600);
        mainWindow.setMinimumSize(800, 600);

        mainWindow.on('minimize', function (event) {
            event.preventDefault();
            mainWindow.hide();
        });

        mainWindow.on('close', function (event) {
            if (!app.isQuiting) {
                event.preventDefault();
                mainWindow.hide();
            }
            return false;
        })

        if (isDev) {
            const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
            [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS].forEach(extension => installExtension(extension));
            mainWindow.loadURL('http://localhost:3000');
            mainWindow.webContents.openDevTools();
        }
        else {
            mainWindow.loadURL(`file://${path.resolve(__dirname, '..', 'build', 'index.html')}`)
        }

    }).catch(_ => {
        process.exit(0);
    });
}

app.on('ready', createWindow);