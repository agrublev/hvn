/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process.
 * You can start electron renderer process from here and
 * communicate with the other processes through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this
 * file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some
 * performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, globalShortcut } from 'electron';
import MenuBuilder from './menu';

if (require('electron-squirrel-startup')) app.quit();
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
) {
    require('electron-debug')();
    const path = require('path');
    const p = path.join(__dirname, '..', 'app', 'node_modules');
    require('module').globalPaths.push(p);
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application
    // in memory even after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        show: false,
        transparent: true,
        width: 1024,
        hasShadow: true,
        titleBarStyle: 'customButtonsOnHover',
        height: 728
    });
    mainWindow.setOpacity(0.8);

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
    // Register a 'CommandOrControl+X' shortcut listener.
    const ret = globalShortcut.register('Alt+Space', () => {
        // remote.BrowserWindow.getAllWindows()[0].minimize();
        mainWindow.restore();
        mainWindow.focus();
        mainWindow.webContents.send('ready'); // send to renderer
        // mainWindow.loadURL(mainWindow.webContents.getURL() + "#52sd" + Math.random())
    });

    if (!ret) {
        console.log('registration failed');
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('Alt+Space'));
    mainWindow.webContents.on('will-navigate', (event, url) => {
        event.preventDefault();
        require('electron').shell.openExternal(url);
        return false;
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();
});
