// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {remote} = require('electron');

//const Menu = require('electron').remote.Menu;
//const Tray = electron.Tray;
const {Tray, Menu} = remote;
//const notifier = require('node-notifier');
const path = require('path');

let trayIcon = new Tray(path.join('','assets/IT-Akademy.png'));

const trayMenuTemplate = [
    {
        label: 'Empty Application',
        enabled: false
    },

    {
        label: 'Settings',
        click: function () {
            console.log("Clicked on settings")
        }
    },

    {
        label: 'Help',
        click: function () {
            console.log("Clicked on Help")
            childWindow.show();
        }
    }
]

let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);

//**********************************************************************
// NOTIFICATION
//**********************************************************************

//const path = require('path');
/*
document.getElementById('notify').addEventListener('click', function(event){
//document.getElementById('notify').onclick = (event) => {
    notifier.notify ({
        title: 'My awesome title',
        message: 'Hello from electron, Mr. User!',
        icon: path.join('','/home/apprenant/Téléchargements/electrontest/assets/logo.png'),  // Absolute path (doesn't work on balloons)
        sound: true,  // Only Notification Center or Windows Toasters
        wait: true    // Wait with callback, until user action is taken against notification

    }, function (err, response) {
        // Response is response from notification
    });

    notifier.on('click', function (notifierObject, options) {
        console.log("You clicked on the notification")
    });

    notifier.on('timeout', function (notifierObject, options) {
        console.log("Notification timed out!")
    });
})*/
/*
notifier.notify ({
    title: 'title',
    message: 'Hello!',
    icon: path.join('','assets/logo.png'),  // Absolute path (doesn't work on balloons)
    sound: true,  // Only Notification Center or Windows Toasters
    wait: true    // Wait with callback, until user action is taken against notification

});*/

function notification(title, message){
    notifier.notify({
       title: title,
       message: message,
       //icon: (path.join('','/home/apprenant/Téléchargements/electrontest/assets/IT-Akademy.png'))
       icon: (path.join('','./assets/IT-Akademy.png'))
    })
}

//notification('title', 'Hello!');

// AUTRE METHODE
//Argument (titre, options en objet) ainsi que le body du texte et une icone !
/*let mySpam = new Notification('Une réponse a été postée !', {
    body: 'Clem dans le sujet «Electron, c\'est bien.»,',
    icon: '/home/apprenant/Téléchargements/electrontest/assets/IT-Akademy.png'
});

mySpam.addEventListener(('show'), function(event){
    alert("show");
})

mySpam.addEventListener('click', function(event){
    alert("ok!");
    var window = remote.getCurrentWindow();
    window.close();
})

mySpam.addEventListener('close', function(event){
    alert("close");
    //childWindow.destroy();

})*/

//**********************************************************************
// MENU
//**********************************************************************
//const Menu = require('electron').remote.Menu;

// On considère qu’on a une <div id="menu"> dans notre HTML
/*
document.getElementById('menu').addEventListener('contextmenu', (event) => {
    event.preventDefault();
const template = [
    {
        label: 'Ajouter aux favoris',
        click: () => {
        // TODO : ajouter aux favoris
        alert('Article bien ajouté aux favoris');
}
},
{
    label: 'Partager',
        submenu: [
    {
        label: 'Diaspora*',
        icon: 'assets/diaspora.png',
        click: () => {
        shareOnDiaspora();
}
},
    {
        label: 'GNU Social',
            icon: 'assets/gnusocial.png',
        click: () => {
        shareOnGnuSocial();
    }
    }
]
}
];
const menu = remote.Menu.buildFromTemplate(template);
menu.popup();
});*/


//************************************************************************
// BARRE DE NOTIFICATIONS
//************************************************************************
// On a les mêmes require que tout à l’heure …
/*
// A utiliser après READY et APP
const Tray = electron.Tray;

function createWindow () {

    const tray = new Tray('assets/logo.png');
    // Petit bonus : on affiche une bulle au survol.
    tray.setToolTip('Zeste de Savoir');
// Notre fichier continue avec l’initialisation de la fenêtre, etc.
}*/


//**************************************************************************
// INTERACTION DE LA BARRE DE NOTIFICATION
/*
const menu = Menu.buildFromTemplate([
    {
        label: 'Ouvrir les forums',
        click: () => {
        // cette méthode permet d’ouvrir une URL dans le navigateur par défaut
        electron.shell.openExternal('https://zestedesavoir.com/forums');
        }
    }
]);
tray.setContextMenu(menu);*/


/*

// Message entre les differentesprocessus
const ipc = require('electron').ipcRenderer;

let myNotification = new Notification('Title', {
    body: 'Lorem Ipsum Dolor Sit Amet'
});


const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', function () {
    ipc.send('close-window');
})

const minBtn = document.getElementById('minimize-btn');

minBtn.addEventListener('click', function () {
    ipc.send('minimize-window');
})

//**********************************************************************
// IPC
//**********************************************************************
/*document.getElementById('ipc').addEventListener('click', () => {
    ipc.send('log-error');
});*/

//**************************************************************************
// ENVOYER NOTIFICATION



//var icone = new tray;//.displayBalloon(spam);
/*
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()

    });
    mainWindow.on('show', () => {
        tray.setHighlightMode('always')
    });
    mainWindow.on('hide', () => {
        tray.setHighlightMode('never')
    });*//*
const tray = new Tray('assets/IT-Akademy.png');

const menu = remote.Menu.buildFromTemplate([
    {
        label: 'Ouvrir les forums',
        click: () => {
        // cette méthode permet d’ouvrir une URL dans le navigateur par défaut
        electron.shell.openExternal('https://zestedesavoir.com/forums');
}
}
]);
//Menu.setApplicationMenu(menu);
tray.setContextMenu(menu);

//const tray = new Tray('assets/IT-Akademy.png');

const contextMenu = Menu.buildFromTemplate([
    {label: 'Item', type: 'radio'},
    {label: 'Item', type: 'radio'},
    {label: 'Item', type: 'radio', checked: true},
    {label: 'Item', type: 'radio'},

]);

tray.setToolTip('Todo List');
tray.setContextMenu(contextMenu);*/