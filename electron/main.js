const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


//const Tray = electron.Tray;
//const remote = require('electron').remote;


//variable global qui contiendra la fenetre principale
let mainWindow=null;
//let tray = null;

// initialisation de la fenetre
function createWindow () {

    //BrowserWindow represente une fenetre
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 500,
        icon: './assets/IT-Akademy.png',
        title: 'login', //'Task Organiser & Deployment Of',
        center: true//,
        //frame: false,  //bordure de la fenetre
        //show: false
    }); // on définit une taille pour notre fenêtre

    mainWindow.loadURL(`file://${__dirname}/main.html`); // on doit charger un chemin absolu

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    //mainWindow.show();

    const childWindow = new BrowserWindow({
        parent: mainWindow,
        width: 810,
        height: 456,
        //x: 400,
        //y: 400,
        icon: '/assets/logo.png',
        title: 'enfant',
        show: false
        //frame: false
    });

    childWindow.loadURL(`file://${__dirname}/start.html`);

    childWindow.on('close', function(event){
        childWindow.hide();
        event.preventDefault();
        //mainWindow.show();
    });

}


app.on('ready', ()=> {
    createWindow();

});

//Event lorsque toutes les fenetres sont fermées
app.on('window-all-closed', ()=> {
    if(process.platform !== 'darwin'){
        app.quit();// quitter l'application
    }
});


// On verifie que la fenetre n'existe pas encore
app.on('activate', () => {
    if(mainWindow === null){
        createWindow();
    }

});


const ipc = require('electron').ipcMain

ipc.on('close-window', function(event) {
    app.quit();
})

ipc.on('minimize-window', function(event) {
    mainWindow.minimize();
})

