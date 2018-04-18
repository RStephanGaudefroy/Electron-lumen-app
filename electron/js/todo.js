//*************************************
// SCRIPT POUR LA TODO LIST
//*************************************

var user = {};

// Si le locoalStorage existe
if(typeof localStorage!='undefined') {
    if(!localStorage.getItem('user'))
    {
        localStorage.setItem('user', JSON.stringify(user));

        registerApp();

        //document.getElementById('btnInputConnexion').classList.add("hidden");
    }
    else
    {
        user = JSON.parse(localStorage.getItem('user'));

        if(user.user.token)
        {
            listApp(user);
            contentApp();
        }

        else
        {
            registerApp();
        }
    }
}

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
//var CSRF_TOKEN = document.getElementsByName('csrf-token').item(0).getAttribute('content');
//var CSRF_TOKEN = document.getElementById('crsf-token').getAttribute('content');


document.addEventListener('click', function(event){

//**************************************************
// REGISTER
//**************************************************

    // Charger formulaire Register
    if(event.target.tagName == "P" && event.target.id == "pRegister")
    {
        registerApp();
    }

    // Enregistrement (AJAX)
    if(event.target.tagName == "INPUT" && event.target.id == "btnInputRegister")
    {
        var nom = document.getElementById('txtInputSurname').value;
        var prenom = document.getElementById('txtInputName').value;
        var email = document.getElementById('txtInputEmail').value;
        var password = document.getElementById('txtInputPassword').value;
        var secure = document.getElementById('txtInputSecure').value;

        if(nom.length == 0 || prenom.length == 0 || email.length == 0 || password.length == 0 || secure.length == 0 )
        {
            if(nom.length == 0)
            {
                errorInput(document.getElementById('txtInputName'));
            }
            else
            {
                valideInput(document.getElementById('txtInputName'));
            }

            if(prenom.length == 0)
            {
                errorInput(document.getElementById('txtInputSurname'));
            }
            else
            {
                valideInput(document.getElementById('txtInputSurname'));
            }

            if(email.length == 0)
            {
                errorInput(document.getElementById('txtInputEmail'));
            }
            else
            {
                valideInput(document.getElementById('txtInputEmail'));
            }

            if(password.length == 0)
            {
                errorInput(document.getElementById('txtInputPassword'));
            }
            else
            {
                valideInput(document.getElementById('txtInputPassword'));
            }

            if(secure.length == 0)
            {
                errorInput(document.getElementById('txtInputSecure'));
            }
            else
            {
                valideInput(document.getElementById('txtInputSecure'));
            }
        }

        else
        {
            if(password == secure)
            {
                //**********************************************
                //AJAX
                //**********************************************

                var htmlRender = "";
                const req = new XMLHttpRequest();

                req.onreadystatechange = function(event) {
                    // XMLHttpRequest.DONE === 4
                    if (this.readyState === XMLHttpRequest.DONE) {
                        if (this.status === 200) {

                            objet = this.responseText.toString();
                            //debugger;
                            var data = JSON.parse(objet);

                            htmlRender += "";

                            //Chargement de la page de connexion
                            loginApp();

                            var msgNotifie = new Notification('Inscription', {
                                body: 'Votre inscription a été prise en compte. \nVeuillez consulter votre boîte mail '+email+' pour finaliser l\'inscription.',
                                icon: './assets/IT-Akademy.png'
                            });

                        }
                        else {
                            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                        }
                    }
                };

                req.onerror = function(request,error) {
                    // There was a connection error of some sort
                        alert("error;");
                        console.log(request);
                };

                req.open('POST', 'http://192.168.33.10:8000/user/register', true);
                req.setRequestHeader("Content-Type", "application/json");
                req.send(JSON.stringify({
                    _token: CSRF_TOKEN,
                    message: $('getinfo').val(),
                    'name': prenom,
                    'surname': nom,
                    'email': email,
                    'password': password,}));

                //**********************************************
            }
            else
            {
                alert("Vos mots de passe ne correspondent pas.");
                errorInput(document.getElementById('txtInputPassword'));
                errorInput(document.getElementById('txtInputSecure'));
            }
        }
    }


//***************************************************
// LOGIN
//***************************************************

    // Charger formulaire Login
    if(event.target.tagName == "P" && event.target.id == "pLogin")
    {
        loginApp();
    }

    // Connexion (AJAX)
    if(event.target.tagName == "INPUT" && event.target.id == "btnInputLogin")
    {
        var data = {
            nom: "NOM",
            prenom: "PRENOM",
            img: "./assets/logo-square.png",
            inbox: 5,
            assigne: 8,
            today: 8,
            week: 16,
        };

        var email = document.getElementById('txtInputEmail').value;
        var password = document.getElementById('txtInputPassword').value;

        if(email.length == 0 || password.length == 0)
        {
            if(email.length == 0)
            {
                errorInput(document.getElementById('txtInputEmail'));
            }
            else
            {
                valideInput(document.getElementById('txtInputEmail'));
            }

            if(password.length == 0)
            {
                errorInput(document.getElementById('txtInputPassword'));
            }
            else
            {
                valideInput(document.getElementById('txtInputPassword'));
            }
        }

        //**********************************************
        //AJAX LOGIN
        //**********************************************

        else
        {
            var htmlRender = "";
            const req = new XMLHttpRequest();

            req.onreadystatechange = function(event) {
                // XMLHttpRequest.DONE === 4
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var data = JSON.parse(this.responseText);

                        htmlRender += "";
                        localStorage["user"] = JSON.stringify(data); //Stephan
                        //debugger;

                        listApp(data);
                        contentApp();

                        var msgNotifie = new Notification('Bienvenue '+data.people.surname+'!', {
                            body: 'Vous avez '+data.inbox+' messages dans votre boîte. \nAujourd\'hui vous avez '+data.today+' tâches à effectuer.',
                            icon: '/home/apprenant/Téléchargements/electrontest/assets/IT-Akademy.png'
                        });
                        //addTask(); //Stephan
                    }
                    else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                        errorInput(document.getElementById('txtInputEmail'));
                        errorInput(document.getElementById('txtInputPassword'));
                    }
                }
            };

            console.log(email, password);
            req.open('POST','http://192.168.33.10:8000/user/login',true);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({
                _token: CSRF_TOKEN,
                message: $('getinfo').val(),
                'email': email,
                'password': password,
            }));
        }
    }

//***************************************************
// LOGOUT
//***************************************************

    if(event.target.id == "imgLogout" || event.target.id == "pLogout")
    {

        var htmlRender = "";
        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);

                    htmlRender += "";
                    localStorage["user"] = "";
                    //debugger;
                    //var objet = {};
                    //objet.people = data;
                    loginApp();


                }
                else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                }
            }
        };

        req.open('POST','http://192.168.33.10:8000/user/logout',true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            //message:document.querySelector(".getinfo").value,
            message: $('getinfo').val(),
        }));
    }

//***************************************************
// FOLDERS
//***************************************************

    if(event.target.tagName == "INPUT" && event.target.value == "Ajout Dossier")
    {
        //Ajout Dossier
        var dataUser = JSON.parse(localStorage.user);

        var dossier = document.getElementById('txtInputFolder').value;

        if(dossier.length == 0)
        {
            errorInput(document.getElementById('txtInputFolder'));
        }

        else
        {
            var htmlRender = "";
            const req = new XMLHttpRequest();

            //***************************************************
            // AJAX CREATE FOLDER
            //***************************************************
            req.onreadystatechange = function(event) {
                // XMLHttpRequest.DONE === 4
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var data = JSON.parse(this.responseText);

                        htmlRender += "";

                        // Local Storage Update
                        dataUser.folder.push(data);
                        localStorage["user"] = JSON.stringify(dataUser);

                        // Display
                        listApp(dataUser);
                        document.querySelector('[data-use="options"]').innerHTML = htmlRender;


                        var msgNotifie = new Notification('Nouveau Dossier !', {
                            body: 'Votre dossier '+dossier+' a bien été créé.',
                            icon: '/home/apprenant/Téléchargements/electrontest/assets/IT-Akademy.png'
                        });

                    }
                    else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                        errorInput(document.getElementById('txtInputFolder'));
                    }
                }
            };

            req.open('POST', 'http://192.168.33.10:8000/user/createFolder', true);
            req.setRequestHeader("Content-Type", "application/json");
            //req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send(JSON.stringify({
                _token: CSRF_TOKEN,
                //message:document.querySelector(".getinfo").value,
                message: $('getinfo').val(),
                'token' : dataUser.user.token,
                'USERS_id' : dataUser.user.id,
                'name': dossier,
            }));
        }
    }

    /*****/

    if(event.target.tagName == "INPUT" && event.target.id == "btnNewFolder")
    {
        addFolder2();
    }

    if(event.target.className == "newFolder")
    {
        addFolder2();
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddFolder")
    {
        /*
         var dataUser = JSON.parse(localStorage.user);
         console.log(dataUser.token);
         // Create Folder
         var dossier = document.getElementById('txtInputFolder').value;
         console.log(dossier);
         const req = new XMLHttpRequest();
         req.onreadystatechange = function(event) {
         if (this.readyState === XMLHttpRequest.DONE) {
         if (this.status === 200) {
         var data = JSON.parse(this.responseText);
         htmlRender += "";

         debugger;
         } else {
         console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

         errorInput(document.getElementById('txtInputEmail'));
         errorInput(document.getElementById('txtInputPassword'));
         }
         }
         };
         req.open('POST','http://192.168.33.10:8000/user/createFolder',true);
         req.setRequestHeader("Content-Type", "application/json");
         req.send(JSON.stringify({
         _token: CSRF_TOKEN,
         //message:document.querySelector(".getinfo").value,
         message: $('getinfo').val(),
         'token' : dataUser.token,
         'folder' : dossier
         }));
         */
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnModFolder")
    {
        alert('');
        var folder = document.getElementById('selectFolder');

        var data = {
            folder:{
                id: folder.options[folder.selectedIndex].value,
                value: folder.options[folder.selectedIndex].text
            }
        };
        if(data.folder.id != '')
            addFolder2(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnUpdateFolder")
    {
        // Test puis Ajax
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnDelFolder")
    {
        // Test puis Ajax
    }

    if(event.target.className == "menuFolder")
    {
        var test = "";
        debugger;
        //event.target.parentNode.childElementCount
        event.target.parentNode.children[1].classList.toggle('hidden');
        listApp();
    }

//***************************************************
// LISTS
//***************************************************

    // AJAX ADD LIST
    if(event.target.tagName == "INPUT" && event.target.id == "btnAddList")
    {
        var dataUser = JSON.parse(localStorage.user);

        var selectFolder = document.getElementById("selectFolder");
        var FOLDERS_id = selectFolder.options[selectFolder.selectedIndex].value;

        var selectPriority = document.getElementById("selectPriority");
        var PRIORITIES_id = selectPriority.options[selectPriority.selectedIndex].value;

        var name = document.getElementById('txtInputName').value;
        var date_start = document.getElementById('dateInputStart').value;
        var date_end = document.getElementById('dateInputEnd').value;
        var color = document.getElementById('txtInputColor').value;

        debugger;

        if(name.length == 0)
        {
            errorInput(document.getElementById('txtInputName'));
        }

        else
        {
            var htmlRender = "";
            const req = new XMLHttpRequest();

            //***************************************************
            // AJAX CREATE LIST
            //***************************************************
            req.onreadystatechange = function(event) {
                // XMLHttpRequest.DONE === 4
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var data = JSON.parse(this.responseText);

                        debugger;

                        htmlRender += "";

                        // Local Storage Update
                        dataUser.list.push(data);
                        localStorage["user"] = JSON.stringify(dataUser);

                        // Display
                        listApp(dataUser);
                        document.querySelector('[data-use="options"]').innerHTML = htmlRender;


                        var msgNotifie = new Notification('Nouvelle Liste !', {
                            body: 'Votre liste '+name+' a bien été créé.',
                            icon: '/home/apprenant/Téléchargements/electrontest/assets/IT-Akademy.png'
                        });

                    }
                    else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                        errorInput(document.getElementById('txtInputName'));
                    }
                }
            };

            req.open('POST', 'http://192.168.33.10:8000/user/createList', true);
            req.setRequestHeader("Content-Type", "application/json");
            //req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send(JSON.stringify({
                _token: CSRF_TOKEN,
                //message:document.querySelector(".getinfo").value,
                message: $('getinfo').val(),
                'token' : dataUser.user.token,
                'USERS_id' : dataUser.user.id,
                'FOLDERS_id': FOLDERS_id,
                'PRIORITIES_id' : PRIORITIES_id,
                'name' : name,
                'date_start' : date_start,
                'date_end' : date_end,
                'color' : color
            }));
        }
    }

    if(event.target.className == "newList")
    {
        if(event.target.tagName == 'IMG')
        {
            var data = {'folder':{'id':event.target.parentNode.firstElementChild.value}};
            console.log(data);

            addList(data);
        }
        else if(event.target.tagName == 'P')
        {
            var data = {'folder':{'id':event.target.firstElementChild.value}};
            console.log(data);
            addList(data);
        }
        else{
            addList();
        }
    }

    if(event.target.className == "updateList")
    {
        //var test = "";

        // id event.target.parentNode.firstElementChild.value
        // folder id
        // event.target.parentNode.parentNode.parentNode.children[1].firstElementChild.firstElementChild.value
        if(event.target.tagName == 'P')
        {
            var data = {
                'folder':{'id':event.target.parentNode.parentNode.parentNode.children[1].firstElementChild.firstElementChild.value},
                'list':{'id':event.target.parentNode.firstElementChild.value}
            };
            console.log(data);
            addList(data);
        }
        else{
            addList();
        }
        debugger;
    }

    if(event.target.className == "showList")
    {

        var LISTS_id = event.target.parentElement.firstElementChild.value;

        var dataUser = JSON.parse(localStorage.user);

        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);
                    debugger;
                    //var dataUser = JSON.parse(localStorage.user);
                    //console.log(dataUser.token);
                    htmlRender += "";

                    dataUser.show = data;
                    //dataUser.task = [data.tasks.object];
                    localStorage["user"] = JSON.stringify(dataUser);
                    debugger;

                    showList(LISTS_id);
                }
                else
                {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };

        req.open('POST', 'http://192.168.33.10:8000/user/getList', true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            message: $('getinfo').val(),
            'id_parent': parent_id,
            'LISTS_id' : LISTS_id,
            'USERS_id' : dataUser.user.id,
            'id' : LISTS_id
        }));
    }


//***************************************************
// TASKS
//***************************************************

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddTask") //btnAddTask
    {

        var dataUser = JSON.parse(localStorage.user);
        console.log(dataUser.user.token);

        var lists_id = null;
        if(document.getElementById('hideInputList') && document.getElementById('hideInputList').value != "")
        {
            lists_id = document.getElementById('hideInputList').value;
        }

        var parent_id = null;
        // Technique utillisé avant d'avoir intégré le select
        if(document.getElementById('hideInputParent') && document.getElementById('hideInputParent').value != "")
        {
            parent_id = document.getElementById('hideInputParent').value;
            //debugger;

            for(var i =0; i< dataUser.show.task.length; i++)
            {
                if(parent_id == dataUser.show.task[i].id)
                {
                    lists_id = dataUser.show.task[i].LISTS_id;
                }
            }


        }

        var parent = document.getElementById('selectParent');
        parent_id = parent.options[parent.selectedIndex].value;

        if(parent_id == "")
        {
            parent_id = null;
        }

        var name = document.getElementById('txtInputName').value;
        var date_start = document.getElementById('dateInputStart').value;
        var date_end = document.getElementById('dateInputEnd').value;

        var frequency = document.getElementById('selectFrequency');
        var frequency_id = frequency.options[frequency.selectedIndex].value;

        var priority = document.getElementById('selectPriority');
        var priority_id = priority.options[priority.selectedIndex].value;

        var description = document.getElementById('txtInputDescription').value;
        var tags = document.getElementById('selectTags').value;

        // ETAT
        //var state = document.getElementById('txtInputPNumber').value;

        //ORDER
        //var order = document.getElementById('txtInputPNumber').value;

        var pathway_number = document.getElementById('txtInputPNumber').value;
        var pathway_type = document.getElementById('txtInputPType').value;
        var pathway_name = document.getElementById('txtInputPName').value;
        var complement = document.getElementById('txtInputComplement').value;
        var code = document.getElementById('txtInputCode').value;
        var city = document.getElementById('txtInputCity').value;
        var country = document.getElementById('txtInputCountry').value;

        var associate = [];

        // RECUPERER LES COLLABORATEURS
        if(document.querySelector('[data-use="users-task"]').children.length>0)
        {
            for(var i=0; i<document.querySelector('[data-use="users-task"]').children.length; i++)
            {
                associate.push(document.querySelector('[data-use="users-task"]').children[i].firstChild.value);
            }
        }

        //**********************************************
        // AJAX CREATE TASK
        //**********************************************

        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);
                    var dataUser = JSON.parse(localStorage.user);
                    console.log(data);

                    alert("ajax add task");

                    dataUser.task.push(data);
                    localStorage["user"] = JSON.stringify(dataUser);

                    debugger;
                    showTask(data.id);
                }
                else
                {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };

        req.open('POST', 'http://192.168.33.10:8000/user/createTask', true);
        req.setRequestHeader("Content-Type", "application/json");
        console.log(date_start, date_end);
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            message: $('getinfo').val(),
            'id_parent': parent_id,
            'LISTS_id' : lists_id,
            'USERS_id' : dataUser.user.id,
            'name': name,
            'startDate': date_start,
            'endDate': date_end,
            'frequency_id': frequency_id,
            'priority_id': priority_id,
            'description': description,
            'associate' : associate
        }));

        //**********************************************

    }

    if(event.target.className == "newTask")
    {
        if(event.target.tagName == 'IMG')
        {
            var data = {'list':{'id':event.target.parentNode.firstElementChild.value}};
            console.log(data);
            addTask(data);
        }
        else{
            addTask();
        }
            //debugger;

    }

    if(event.target.className == "showTask")
    {
        var parent_task = event.target.parentElement.firstElementChild.value;
        //debugger;

        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);

                    var dataUser = JSON.parse(localStorage.user);
                    //console.log(dataUser.token);
                    htmlRender += "";

                    // TODO a vérifier!!
                    dataUser.show = data;
                    //dataUser.show.team = data.team;

                    localStorage["user"] = JSON.stringify(dataUser);

                    //debugger;
                    showTask(parent_task);
                }
                else
                {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };

        req.open('POST', 'http://192.168.33.10:8000/user/getTaskChild', true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            message: $('getinfo').val(),
            //'id_parent': parent_id,
            //'USERS_id' : dataUser.user.id,
            'id' : parent_task
        }));
    }

    if(event.target.className == "updateTask")
    {
        alert("updateTask");
    }

    if(event.target.className == "newChildTask")
    {
        var id = event.target.parentElement.firstElementChild.value;

        var data = {'task_parent':{'id_parent':id}};

        addTask(data);

    }


//***************************************************
// PRIORITIES
//***************************************************


    if(event.target.tagName == "INPUT" && event.target.id == "btnNewPriority")
    {
        addPriority();
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddPriority")
    {
        //*******************************************
        // AJAX ADD PRIORITY
        //*******************************************
        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);

                    //htmlRender += "";
                    //debugger;

                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    errorInput(document.getElementById('txtInputPriority'));
                }
            }
        };

        req.open('POST', 'http://192.168.33.10:8000/user/createPriority', true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            message: $('getinfo').val(),
            'token' : dataUser.token,
            'priority': priority,
        }));
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnModPriority")
    {
        var priority = document.getElementById('selectPriority');

        var data = {
                priority:{
                    id: priority.options[priority.selectedIndex].value,
                    value: priority.options[priority.selectedIndex].text
                }
            };
        if(data.priority.id != '')
            addPriority(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnUpdatePriority")
    {
        // Test puis Ajax
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnDelPriority")
    {
        // Test puis Ajax
    }


//***************************************************
// FREQUENCY
//***************************************************


    if(event.target.tagName == "INPUT" && event.target.id == "btnNewFrequency")
    {
        addFrequency();
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddFrequency")
    {
        //*******************************************
        // AJAX ADD FREQUENCY
        //*******************************************
        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    //htmlRender += "";
                    //debugger;

                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    errorInput(document.getElementById('txtInputFrequency'));
                }
            }
        };

        req.open('POST', 'http://192.168.33.10:8000/user/createFrequency', true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            message: $('getinfo').val(),
            'token' : dataUser.token,
            'frequency': frequency,
        }));
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnModFrequency")
    {
        var frequency = document.getElementById('selectFrequency');

        var data = {
            frequency:{
                id: frequency.options[frequency.selectedIndex].value,
                value: frequency.options[frequency.selectedIndex].text
            }
        };
        if(data.frequency.id != '')
            addFrequency(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnUpdateFrequency")
    {
        // Test puis Ajax
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnDelFrequency")
    {
        // Test puis Ajax
    }


//***************************************************
// STATUS
//***************************************************

    if(event.target.tagName == "INPUT" && event.target.id == "btnNewStatus")
    {
        addStatus();
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddStatus")
    {
        // Test puis AJAX
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnModStatus")
    {
        var status = document.getElementById('selectStatus');

        var data = {
            status:{
                id: status.options[status.selectedIndex].value,
                value: status.options[status.selectedIndex].text
            }
        };
        if(data.status.id != '')
            addStatus(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnUpdateStatus")
    {
        // Test puis Ajax
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnDelStatus")
    {
        // Test puis Ajax
    }


//***************************************************
// STATES
//***************************************************

    if(event.target.tagName == "INPUT" && event.target.id == "btnNewState")
    {
        addState();
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddState")
    {
        // Test puis AJAX
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnModState")
    {
        var state = document.getElementById('selectState');

        var data = {
            state:{
                id: state.options[state.selectedIndex].value,
                value: state.options[state.selectedIndex].text
            }
        };
        if(data.state.id != '')
            addState(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnUpdateState")
    {
        // Test puis Ajax
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnDelState")
    {
        // Test puis Ajax
    }

//***************************************************
// TAGS
//***************************************************

    if(event.target.tagName == "INPUT" && event.target.id == "btnNewTag")
    {
        var data= {};
        addTag(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnAddTag")
    {
        // Test puis AJAX
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnModTag")
    {
        var tag = document.getElementById('selectTag');

        var data = {
            tag:{
                id: tag.options[tag.selectedIndex].value,
                value: tag.options[tag.selectedIndex].text
            }
        };
        if(data.tag.id != '')
            addTag(data);
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnUpdateTag")
    {
        // Test puis Ajax
    }

    if(event.target.tagName == "INPUT" && event.target.id == "btnDelTag")
    {
        // Test puis Ajax
    }

    //****************************************************
    if(event.target.tagName == "DIV" && event.target.className == "menuFolder")
    {
        //debugger;

        //if(event.target.className == "menuFolder") {
            //event.target.lastChild.classList.remove('hidden');
            if (event.target.lastChild.classList.contains('hidden')) {
                event.target.lastChild.classList.remove('hidden');
            }
            else
                event.target.lastChild.classList.add('hidden');
        //}
    }

    if(event.target.tagName == "IMG" && event.target.id == "imgSettings")
    {
        settingsApp();
    }


//*****************************************************
// UPLOAD IMAGE
//*****************************************************

    if(event.target.tagName == "INPUT" && event.target.id == "btnInputUploadImage")
    {
        debugger;
        var image = document.getElementById('fileInputImage');
        var preview = document.getElementById('filePreviewImage');

        preview.src = image.files[0].path;

        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                alert(xhr.responseText);
            }
        };
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.sendAsBinary(image.files[0]);
    }

//******************************************************
// PROFILE
//******************************************************

    if(/*event.target.tagName == "IMG" && */event.target.id == "imgProfile")
    {
        var data = JSON.parse(localStorage.getItem('user'));
        addProfil(data);
    }

//******************************************************
// TEAM MATE
//******************************************************

    /*if(event.target.tagName == "INPUT" && event.target.id == "txtInputTeamMate")
    {
        var searchTeam = document.getElementById('txtInputTeamMate').value;

        if(searchTeam.length >= 3)
        {
            document.querySelector('[data-use="team"]').innerHTML += searchTeam;
        }
    }*/

    if(event.target.className == "divAddTeam")
    {
        var searchUser = "";
        if(event.target.tagName == "DIV")
        {
            searchUser = event.target.firstChild.value;
        }
        else if(event.target.tagName == "P")
        {
            searchUser = event.target.parentElement.firstElementChild.value;
        }


        // data use users-task && "<span class='focus-border'></span>"+
        var htmlRender = "";
        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);
                    //evdebugger;

                    htmlRender +=
                        "<div class='divDelTeam'>" +
                            "<input type='hidden' value='"+data.id+"'/>"+
                            "<p class='divDelTeam'><img src='./assets/essential/149452.svg' width='32px' alt='"+data.surname+" "+data.name+"'/>" +
                            data.name+" "+data.surname+
                            "<img src='./assets/essential/149146_lightcoral.svg' width='32px' alt='"+data.surname+" "+data.name+"' /></p>" +
                        "</div>";

                    document.querySelector('[data-use="users-task"]').innerHTML += htmlRender;

                }
                else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                    errorInput(document.getElementById('txtInputTeamMate'));
                }
            }
        };

        req.open('POST','http://192.168.33.10:8000/user/search/user',true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            //message:document.querySelector(".getinfo").value,
            message: $('getinfo').val(),
            'search': searchUser,
        }));

    }


    if(event.target.className == "divDelTeam")
    {
        var searchUser = "";

        if(event.target.tagName == "DIV")
        {
            searchUser = event.target.firstChild.value;
        }
        else if(event.target.tagName == "P")
        {
            var test = "";
            debugger;
            searchUser = event.target.parentElement.firstElementChild.value;
        }
        //debugger;

        if(event.target.tagName == "DIV")
        {
            event.target.remove();
        }
        else if(event.target.tagName == "P")
        {
            event.target.parentElement.remove();
        }


        //AJAX a faire

        // data use users-task && "<span class='focus-border'></span>"+
        /*var htmlRender = "";
        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);

                    debugger;


                    htmlRender +=
                        "<div class='divDelTeam'>" +
                        "<input type='hidden' value='"+data.name.id+"'/>"+
                        "<img src='./assets/essential/149452.svg' width='32px' alt='"+data.surname+" "+data.name+"'/>" +
                        "<p>"+data.name+" "+data.surname+"</p>" +
                        "<img src='./assets/essential/149146_lightcoral.svg' width='32px' alt='"+data.surname+" "+data.name+"' />" +
                        "</div>";

                    document.querySelector('[data-use="users-task"]').innerHTML += htmlRender;

                }
                else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                    errorInput(document.getElementById('txtInputTeamMate'));
                }
            }
        };

        req.open('POST','http://192.168.33.10:8000/user/search/user',true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            _token: CSRF_TOKEN,
            //message:document.querySelector(".getinfo").value,
            message: $('getinfo').val(),
            'search': searchUser,
        }));*/

    }

//******************************************************
// CALENDAR
//******************************************************

    if(event.target.tagName == "IMG" && event.target.id == "imgCalendar")
    {
        //alert("Laétitia is working on...");
        var userData = JSON.parse(localStorage.user);

        $.ajax({
            'url': 'http://192.168.33.10:8000/user/getTask',
            'type': 'POST',
            'data': {
                _token: CSRF_TOKEN,
                message: $(".getinfo").val(),
                'id': userData.user.id
            },
            success: function (data) {
                localStorage["calendar"] = JSON.stringify(data);
                debugger;
                userData.task = data.task;
                localStorage["user"] = JSON.stringify(userData);

            }
        });

        calendarApp();
    }

//******************************************************
// THEME
//******************************************************

    if(event.target.tagName == "IMG" && event.target.id == "imgTheme")
    {
        themeApp();
    }

//******************************************************
// MESSAGES
//******************************************************
    if(event.target.tagName == "IMG" && event.target.id == "imgMessenger")
    {
       alert("Messenger is not implemented yet.");
        // messagesApp();
    }


//******************************************************
// CALLBACK
//******************************************************
    if(event.target.tagName == "IMG" && event.target.id == "imgCallBack")
    {
        alert("Call Back is not implemented yet.");
        // callbackApp();
    }

//*****************************************************
// ASIDE TO DO
//*****************************************************
    if(event.target.className == "todoInbox")
    {
        alert("I don't know ! Not implemented yet.");
        //
    }

    if(event.target.className == "todoAssigned")
    {
        alert("Don't have work for you... not implemented yet.");
        //
    }

    if(event.target.className == "todoToday")
    {
        alert("Today... is a nice day ! Not implemented yet.");
    }

    if(event.target.className == "todoWeek")
    {
        alert("Maybe the best Week... or not! Not implemented yet.");
    }


})





//*******************************************************************************
// LISTENER KEYDOWN EVENT
//*******************************************************************************


// keyup down press
document.addEventListener('keypress', function(event){

//******************************************************
// TEAM MATE
//******************************************************

    if(event.target.id == "txtInputTeamMate")
    {
        var searchTeam = document.getElementById('txtInputTeamMate').value;

        if(searchTeam.length >= 2)
        {
            var htmlRender = "";
            const req = new XMLHttpRequest();

            req.onreadystatechange = function(event) {
                // XMLHttpRequest.DONE === 4
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var data = JSON.parse(this.responseText);

                        //debugger;

                        /*for(var i=0; i<data.length; i++)
                        {
                            htmlRender += "<div><img src='./assets/essential/149452.svg' width='32px' alt='"+data[i].surname+" "+data[i].name+"'/><p>"+data[i].name+" "+data[i].surname+"</p></div>"
                        }*/

                        for(var i=0; i<data.name.length; i++)
                        {
                            htmlRender +=
                                "<div class='divAddTeam'>" +
                                    "<input type='hidden' value='"+data.name[i].id+"'/>"+
                                    "<p class='divAddTeam'><img src='./assets/essential/149452.svg' width='32px' alt='"+data.name[i].surname+" "+data.name[i].name+"'/>" +
                                    data.name[i].name+" "+data.name[i].surname +
                                    /*"<object id='imageSVG' data='./assets/essential/149145.svg' width='32px' type='image/svg+xml' fill='lightseagreen' ></object>"+
                                    "<img src='./assets/essential/149145.svg' width='32px' alt='"+data.name[i].surname+" "+data.name[i].name+"' fill='lightseagreen' color='lightseagreen' />" +*/
                                    "<img src='./assets/essential/149145_lightseagreen.svg' width='32px' alt='"+data.name[i].surname+" "+data.name[i].name+"' /></p>" +
                                "</div>"
                        }

                        //

                        for(var i=0; i<data.surname.length; i++)
                        {
                            htmlRender +=
                                "<div class='divAddTeam'>" +
                                    "<input type='hidden' value='"+data.surname[i].id+"'/>"+
                                    "<img src='./assets/essential/149452.svg' width='32px' alt='"+data.surname[i].surname+" "+data.surname[i].name+"'/>" +
                                    "<p>"+data.surname[i].name+" "+data.surname[i].surname+"</p>" +
                                    "<img src='./assets/essential/149145_lightseagreen.svg' width='32px' alt='"+data.surname[i].surname+" "+data.surname[i].name+"'/>" +
                                "</div>"
                        }



                        document.querySelector('[data-use="team"]').innerHTML = htmlRender;

                    }
                    else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                        errorInput(document.getElementById('txtInputTeamMate'));
                    }
                }
            };

            req.open('POST','http://192.168.33.10:8000/user/search/team',true);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({
                _token: CSRF_TOKEN,
                //message:document.querySelector(".getinfo").value,
                message: $('getinfo').val(),
                'search': searchTeam,
            }));
        }
    }

//******************************************************
// MESSAGES
//******************************************************

    if(event.target.id == "txtInputMessage" && event.keyCode == 13)
    {
        var messageUser = document.getElementById('txtInputMessage').value;

        if(messageUser.length >= 2)
        {
            var htmlRender = "";
            const req = new XMLHttpRequest();

            req.onreadystatechange = function(event) {
                // XMLHttpRequest.DONE === 4
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var data = JSON.parse(this.responseText);

                        //debugger;

                        document.querySelector('[data-use="team"]').innerHTML = htmlRender;

                    }
                    else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);

                        errorInput(document.getElementById('txtInputMessage'));
                    }
                }
            };

            req.open('POST','http://192.168.33.10:8000/user/msg/add',true);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({
                _token: CSRF_TOKEN,
                //message:document.querySelector(".getinfo").value,
                message: $('getinfo').val(),
                'messageUser': messageUser,
            }));
        }
    }
})



//*****************************************************************************
// FUNCTIONS
//*****************************************************************************



//***************************************
// REGISTER
//***************************************
// Création du formulaire de Register
function registerApp()
{
    var htmlList = "";
    var htmlContent = "";

    htmlList += "<h2><i>Bienvenue</i></h2>";
    htmlList += "<p>Créez un compte afin de pouvoir accéder au gestionnaire de tâches.</p>";
    htmlList += "<p>Vous pourrez compléter votre profil par la suite.</p>";

    htmlList += "<br>";
    htmlList += "<p id='pLogin'>Déjà un compte ? Cliquez ici pour vous connecter.</p>";
    //htmlList += "<div data-use='login' id='pLogin'><p>Déjà un compte ? Cliquez ici pour vous connecter.</p></div>";


    htmlContent +=
        "<div>" +
            "<h2 class=''><i>Inscription</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputName' name='txtInputName' class='effect-16' type='text' placeholder='Prénom' pattern='[A-Za-z].{2,}' title='Votre prénom doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputName'>Identifiant</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputSurname' name='txtInputSurname' class='effect-16' type='text' placeholder='Nom' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères' required />"+
                "<label for='txtInputSurname'>Identifiant</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputEmail' name='txtInputEmail' class='effect-16' type='email' placeholder='Email' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' required />"+ //https://www.w3schools.com/tags/att_input_pattern.asp
                "<label for='txtInputEmail'>Identifiant</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputPassword' name='txtInputPassword' class='effect-16' type='password' placeholder='Mot de passe' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Votre mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et une minuscule au minimum.' required/>"+
                "<label for='txtInputPassword'>Mot de passe</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputSecure' name='txtInputSecure' class='effect-16' type='password' placeholder='Mot de passe' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Votre mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et une minuscule au minimum.' required/>"+
                "<label for='txtInputSecure'>Mot de passe</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+


            "<input class='button buttonGreen' type='text' id='btnInputRegister' value='Inscription' />"+
        "</div>";

    document.querySelector('[data-use="list"]').innerHTML = htmlList;
    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
}


//***************************************
// LOGIN
//***************************************
// Création du formulaire de Login
function loginApp()
{
    var htmlList = "";
    var htmlContent = "";

    htmlList += "<h2><i>Bienvenue</i></h2>";
    htmlList += "<p>Connectez vous afin de pouvoir accéder au gestionnaire de tâches.</p>";

    htmlList += "<br>";
    htmlList += "<p id='pRegister'>Pas de compte ? Cliquez ici pour créer un compte.</p>";

    htmlContent +=
        "<div>" +
            "<h2 class=''><i>Identification</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputEmail' name='txtInputEmail' class='effect-16' type='email' placeholder='Email' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' required />"+ //https://www.w3schools.com/tags/att_input_pattern.asp
                "<label for='txtInputEmail'>Identifiant</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputPassword' name='txtInputPassword' class='effect-16' type='password' placeholder='Mot de passe' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Votre mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et une minuscule au minimum.' required/>"+
                "<label for='txtInputPassword'>Mot de passe</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<input class='button buttonGreen' type='text' id='btnInputLogin' value='Connexion' />"+
        "</div>";

    document.querySelector('[data-use="list"]').innerHTML = htmlList;
    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
}


//***************************************
// TABLES CRUD
//***************************************
function settingsApp()
{
    var htmlContent = "";
    var htmlSettings = "";
    var htmlOptions = "";

    var nbPriorite = 4;
    var nbFrequence = 7;
    var nbStatus = 5;
    var nbDossier = 8;

    var nbStates = 2;

    //**************stephan
    var user = localStorage.getItem("user");
    var userConnect = JSON.parse(user);
    var token = userConnect.token;

    //****************************************************************
    //  AJAX FOR DEMAND INFO ON PRORITIES, FREQUENCY AND PARENT TASK
    //****************************************************************

    const req = new XMLHttpRequest();
    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                // data content object Priority and frequency
                var data = JSON.parse(this.responseText);
                console.log(data);

                userData = JSON.parse(localStorage.getItem("user"));

                userData.frequency = data.frequency;
                userData.priority = data.priority;
                userData.states = data.states;
                userData.status = data.status;
                userData.tags = data.tags;
                userData.task = data.task;


                // Local Storage Update
                //dataUser.folder.push(data);
                localStorage["user"] = JSON.stringify(userData);
                //debugger;


            }
            else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    //req.open('GET', 'http://192.168.33.10:8000/user/getTaskParent', true);
    req.open('GET', 'http://192.168.33.10:8000/user/getTaskInfo', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
        _token: CSRF_TOKEN, message:$(".getinfo").val(),
        //message:document.querySelector(".getinfo").value,
        message: $('getinfo').val(),
    }));

    var data = JSON.parse(localStorage.getItem("user"));
    //*******************

    htmlContent +=
        "<div data-use='settings'></div>";

    htmlContent +=
        "<div data-use='options'></div>";

    //*******************************************************
    htmlSettings +=
        "<div>" +
            "<h2 class='' ><i>Settings</i></h2>";

    //PRIORITES-------------------------------------------------------
    htmlSettings +=
            "<div>" +
                "Priorités<select id='selectPriority'>";

    for(var i=0; i<data.priority.length; i++)
    {
        htmlSettings += "<option value='"+data.priority[i].id+"' >"+data.priority[i].name+"</option>";
    }

    htmlSettings +=
                "</select>"+
                "<input class='button buttonBlue' type='text' id='btnModPriority' value='Modifier Priorité' />"+
                "<input class='button buttonGreen' type='text' id='btnNewPriority' value='Ajouter Priorité' />"+
            "</div>";


    //FREQUENCES---------------------------------------------------------
    htmlSettings +=
            "<div>" +
                "Fréquences<select id='selectFrequency'>";

    for(var i=0; i<data.frequency.length; i++)
    {
        htmlSettings += "<option value='"+data.frequency[i].id+"' >"+data.frequency[i].name+"</option>";
    }

    htmlSettings +=
                "</select>"+
                "<input class='button buttonBlue' type='text' id='btnModFrequency' value='Modifier Fréquence' />"+
                "<input class='button buttonGreen' type='text' id='btnNewFrequency' value='Ajouter Fréquence' />"+
            "</div>";

    //STATUS---------------------------------------------------------
    htmlSettings +=
            "<div>" +
                "Status<select id='selectStatus'>";

    for(var i=0; i<data.status.length; i++)
    {
        htmlSettings += "<option value='"+data.status[i].id+"' >"+data.status[i].name+"</option>";
    }

    htmlSettings +=
                "</select>"+
                "<input class='button buttonBlue' type='text' id='btnModStatus' value='Modifier Status' />"+
                "<input class='button buttonGreen' type='text' id='btnNewStatus' value='Ajouter Status' />"+
            "</div>";

    //DOSSIERS---------------------------------------------------------
    htmlSettings +=
            "<div>" +
                "Dossier<select id='selectFolder'>";

    for(var i=0; i<data.folder.length; i++)
    {
        htmlSettings += "<option value='"+data.folder[i].id+"' >"+data.folder[i].name+"</option>";
    }

    htmlSettings +=
                "</select>"+
                "<input class='button buttonBlue' type='text' id='btnModFolder' value='Modifier Dossier' />"+
                "<input class='button buttonGreen' type='text' id='btnNewFolder' value='Ajouter Dossier' />"+
            "</div>";

    //STATES---------------------------------------------------------
    htmlSettings +=
            "<div>" +
                "Etat<select id='selectState'>";

    for(var i=0; i<data.states.length; i++)
    {
        htmlSettings += "<option value='"+data.states[i].id+"' >"+data.states[i].name+"</option>";
    }

    htmlSettings +=
                "</select>"+
                "<input class='button buttonBlue' type='text' id='btnModState' value='Modifier Etat' />"+
                "<input class='button buttonGreen' type='text' id='btnNewState' value='Ajouter Etat' />"+
            "</div>";

    //TAGS---------------------------------------------------------
    htmlSettings +=
            "<div>" +
                "Tag<select id='selectTag'>";

    for(var i=0; i<data.tags.length; i++)
    {
        htmlSettings += "<option value='"+data.tags[i].id+"' >"+data.tags[i].name+"</option>";
    }

    htmlSettings +=
                "</select>"+
                "<input class='button buttonBlue' type='text' id='btnModTag' value='Modifier Tag' />"+
                "<input class='button buttonGreen' type='text' id='btnNewTag' value='Ajouter Tag' />"+
            "</div>";

    //AUTRES MODIFICATIONS A APPORTER


    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
    document.querySelector('[data-use="settings"]').innerHTML = htmlSettings;
    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;

}


//****************************************
// THEME
//****************************************
// Theme de l'application
function themeApp()
{
    // Modification des valeurs les plus courantes utilisés en css
    // A faire si on a le temps...

    $("").css("background-color","");
    /************************LIST***********************/

    $("div[data-use='list']").css("background-color", " #3d8499");
    $("div[data-use='list'] ul li").css("color","#3d8499");
    $("div[data-use='list'] ul li:hover ").css("background-color","#3d8499");
    $("div[data-use='app'] div:hover").css("background-color"," #3d8499");
    $("div[data-use='todo'] div:hover").css("background-color"," #3d8499");
    $("div[data-use='folders'] div:hover").css("background-color"," #3d8499");
    $("h2").css("color","#a3234a") ;
    $("h2::before").css("background-color","#3d8499") ;
    $("h2 i").css("background-color","#3d8499") ;
    $("").css("background-color","");
    $("").css("background-color","");
    $("").css("background-color","");


    /************************CONTENT***********************/

    $("div[data-use='content']").css("background-color","#b9ddde") ;
    $("div[data-use='content'] h2 ").css("color","#cc144c") ;
    $("div[data-use='content'] h2:before").css("background-color","#b9ddde");
    $("div[data-use='content'] h2 i").css("background-color","#b9ddde");
    $("div[data-use='options'] h2 i").css("background-color","#b9ddde");
    $("div[data-use='setings'] div:h2 i ").css("background-color","#b9ddde");
    $("").css("background-color","");


    /************************BUTTON***********************/

    $("button").css("background-color","#4CAF50");
    $("#button").css("color","white");

    $("#buttonGreen").css("background-color","darkcyan");
    $("#buttonGreen").css("color","black");
    $("#buttonGreen:hover").css("background-color","lightseagreen");
    $("#buttonGreen:hover").css("color","white");

    $("#buttonBlue").css("background-color","darkcyan");
    $("#buttonBlue").css("color","black");
    $("#buttonBlue:hover").css("background-color","lightsskyblue");
    $("#buttonBlue:hover").css("color","white");

    $("#buttonRed").css("background-color","#9b2217");
    $("#buttonRed").css("color","black");
    $("#buttonRed:hover").css("background-color","#9b2217");
    $("#buttonRed:hover").css("color","white");

    $("").css("background-color","");


}


//*****************************************
// CALENDAR
//*****************************************
function calendarApp()
{
    // Generer un calendrier du mois avec sur chaque date le nombre de taches
    var userConnect = JSON.parse(localStorage.getItem("user"));
    var id = userConnect.user.id;
    var htmlContent =
        "<div data-use='size' id='calendar'>" +
        "</div>";

    document.querySelector('[data-use="content"]').innerHTML = htmlContent;

    var test = [];
    /*test.push({
            title: 'Long Event',
            start: '2018-03-07',
            end: '2018-03-10',
            color: 'purple' // override!
        });*/

    /*******************************************/

    var jsonCalendar = JSON.parse(localStorage.calendar);

    //alert(jsonCalendar.task.length);

    for(var i=0; i<jsonCalendar.task.length; i++)
    {
        test.push({
            title: jsonCalendar.task[i].name,
            start: jsonCalendar.task[i].date_start,
            end: jsonCalendar.task[i].date_end,
            color: 'green'
        });
    }



    /********************************************/


    $('#calendar').fullCalendar({

            Object: false,
            header: {
                left:'',
                center: 'prev, title, next',
                right: 'agendaDay,month,agendaWeek',

            },
        //eventColor: '#b9ddde',
        eventLimit: true,
        eventSources: [ test

            /*// your event source
            {
                events: [ // put the array in the `events` property
                    {
                        title  : 'event1',
                        start  : '2018-03-11'
                    },
                    {
                        title  : 'event2',
                        start  : '2018-03-15',
                        end    : '2018-03-17'
                    },
                    {
                        title  : 'event3',
                        start  : '2010-01-09T12:30:00',
                    }
                ],
                color: 'black',     // an option!
                textColor: 'yellow' // an option!
            }

            // any other event sources...*/

        ]

    });

}


//******************************************
// TASKS TO DO
//******************************************
// ligne de la side bar indiquant le nombre de tache du jour
function todayTask()
{
    // renvoi le nombre de taches du jour
    // peut etre faire une popup aussi
    // et peut etre une div en hidden dans le content
}

function weekTask()
{
    // renvoi le nombre de taches de la semaine
    // peut etre faire une popup aussi
    // et peut etre une div en hidden dans le content
}


//*******************************************
// USER PROFILE
//*******************************************
// Profile Utilisateur (USER+PEOPLE+ADRESS)
function addProfil(data={})
{
    var htmlContent = "";

    var id = ((data.user) ? data.user.id : "");

    var idPeople = ((data.people) ? data.people.id : "");
    var name = ((data.people && data.people.name !=null) ? data.people.name : "");
    var surname = ((data.people && data.people.surname !=null) ? data.people.surname : "");
    var birth = ((data.people && data.people.birth !=null) ? data.people.birth : "");
    var phone = ((data.people && data.people.phone !=null) ? data.people.phone : "");
    var image = ((data.people && data.people.image !=null) ? data.people.image : "");

    var idAdress = ((data.adress && data.adress.id !=null) ? data.adress.id : "");
    var pathway_number = ((data.adress && data.adress.pathway_number !=null) ? data.adress.pathway_number : "");
    var pathway_type = ((data.adress && data.adress.pathway_type !=null) ? data.adress.pathway_type : "");
    var pathway_name = ((data.adress && data.adress.pathway_name !=null) ? data.adress.pathway_name : "");
    var complement = ((data.adress && data.adress.complement !=null) ? data.adress.complement : "");
    var code = ((data.adress && data.adress.code !=null) ? data.adress.code : "");
    var city = ((data.adress && data.adress.city !=null) ? data.adress.city : "");
    var country = ((data.adress && data.adress.country !=null) ? data.adress.country : "");





    htmlContent +=
        "<div>" +
        "<h2 class=''><i>Profil</i></h2>"+

        // PRENOM
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputName' name='txtInputName' class='effect-16' type='text' placeholder='Prénom' value='"+surname+"' pattern='[A-Za-z].{2,}' title='Votre prénom doit au moins contenir 2 caractères' required/>"+
        "<label for='txtInputName'>Prénom</label>"+
        "<span class='focus-border'></span>"+
        "</div>"+

        //NOM
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputSurname' name='txtInputSurname' class='effect-16' type='text' placeholder='Nom' value='"+name+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères' required />"+
        "<label for='txtInputSurname'>Nom</label>"+
        "<span class='focus-border'></span>"+
        "</div>"+

        //DATE DE NAISSANCE
        "<div class='col-3 input-effect'>" +
        "<input id='dateInputBirth' name='dateInputBirth' class='effect-16' type='date' value='"+birth+"' placeholder='Date de naissance' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<label for='dateInputBirth'>Date de Naissance</label>"+
        "<span class='focus-border'></span>"+
        "</div>"+

        //ADRESSE
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputPNumber' name='txtInputPNumber' class='effect-16' type='text' placeholder='Numéro de voie' value='"+pathway_number+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<input id='txtInputPType' name='txtInputPType' class='effect-16' type='text' placeholder='Type de Voie' value='"+pathway_type+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<input id='txtInputPName' name='txtInputPName' class='effect-16' type='text' placeholder='Nom de Voie' value='"+pathway_name+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<input id='txtInputComplement' name='txtInputComplement' class='effect-16' type='text' placeholder='Complément' value='"+complement+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<input id='txtInputCode' name='txtInputCode' class='effect-16' type='text' placeholder='Code Postal' value='"+code+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<input id='txtInputCity' name='txtInputCity' class='effect-16' type='text' placeholder='Ville' value='"+city+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<input id='txtInputCountry' name='txtInputCountry' class='effect-16' type='text' placeholder='Pays' value='"+country+"' pattern='[A-Za-z].{2,}' title='Votre nom doit au moins contenir 2 caractères' />"+
        "</div>"+

        //TELEPHONE
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputPhone' name='txtInputPhone' class='effect-16' type='text' value='"+phone+"' placeholder='Téléphone' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<label for='txtInputPhone'>Téléphone</label>"+
        "<span class='focus-border'></span>"+
        "</div>"+

        //IMAGE
        "<div class='col-3 input-effect'>" +
        "<img src='"+image+"' width='60px' height='60px' alt='image preview' id='filePreviewImage'>"+
        "<input id='fileInputImage' name='fileInputImage' class='effect-16' type='file' accept='image/*' title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<label for='fileInputImage'>Image</label>"+
        "<span class='focus-border'></span>"+
        "<input class='button buttonBlue' type='text' id='btnInputUploadImage' value='Upload' />"+
        "</div>";

    if(data.people == null )
    {
        htmlContent +=  "<input class='button buttonGreen' type='text' id='btnAddPeople' value='Ajout Profil' />";

    }
    else
    {
        htmlContent += "<div class='col-3 input-effect'><input class='button buttonBlue' type='text' id='btnUpdatePeople' value='Mettre à jour Profil' /></div>";
        //htmlOptions += "<input class='button buttonRed' type='text' id='btnDelPeople' value='Supprimer Profil' />"
    }

    htmlContent +=
        "</div>";

    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
}


//********************************************
// MESSENGER
//********************************************
// Fonctionnalité message à finir
function message(idTask)
{
    var htmlContent = "";

    htmlContent +=
        "<div>";


    // boucle
    // ou fonction AJAX à prevoir
    // if iduser = user => photo+nom+data+bloc message
    // sinon bloc message+date+nom+photo
    //  <div>
    //  "<img src='"+image+"' width='60px' height='60px' alt='image preview' id='filePreviewImage'>"+

    htmlContent +=
        "</div>";

    htmlContent +=
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputMessage' name='txtInputMessage' class='effect-16' type='text' placeholder='Message' />"+
        "<label for='txtInputMessage'>Message</label>"+
        "<input class='button buttonBlue' type='text' id='btnUpdatePeople' value='Mettre à jour Profil' />"+
        "</div>";


}


//********************************************
// SIDE BAR
//********************************************
// Crée le rendu de la barre latérale lors de la connexion
function listApp(data={})
{
    var htmlList = "";

    var htmlApp = "";
    var htmlTodo = "";
    var htmlFolders = "";

    var id = ((data.people) ? data.people.id : "");
    var name = ((data.people) ? data.people.name : "");
    var surname = ((data.people) ? data.people.surname : "");

    var nbDossier = ((data.folder) ? data.folder.length : 0);
    //var nbTache = 3;


    data.assets = {
        img: "./assets/essential/149452.svg",
        imgmail: "./assets/ui/747314.svg",
        imgmsg: "./assets/ui/747313.svg",
        imgsettings: "./assets/essential/149294.svg",
        imgfolder: "./assets/essential/149325.svg",
        imgopenfolder: "./assets/ui/747320.svg",
        imgclosefolder: "./assets/essential/747317.svg",
        imgcallback: "./assets/essential/149301.svg",
        imgaddtask: './assets/essential/149411.svg',
        imgmodtask: './assets/essential/149368.svg',
        imgsee: './assets/essential/149099.svg',
        imgadd: './assets/essential/149145.svg',
        imglogout: './assets/essential/149462.svg',
        imgcalendar: './assets/essential/149363.svg',
        imgtheme: './assets/essential/improvement.svg',
        inbox: 5,
        assigne: 8,
        today: 8,
        week: 16,
    };

    // User token
    var dataUser = JSON.parse(localStorage.user);
    console.log(dataUser.token);

    // condition ternaire pour status


    htmlList +=
        "<div data-use='app'></div>"+
        "<h2><i>TODO</i></h2>"+
        "<div data-use='todo'></div>"+
        "<h2><i>REPERTOIRE</i></h2>"+
        "<div data-use='folders'></div>";

    htmlApp +=
        "<div>" +
            "<img id='imgSettings' src='"+data.assets.imgsettings+"' width='32px' alt='Settings'/>"+
            "<img id='imgCalendar' src='"+data.assets.imgcalendar+"' width='32px' alt='Calendrier'/>"+
            "<img id='imgCallBack' src='"+data.assets.imgcallback+"' width='32px' alt='Rappel'/>"+
            "<img id='imgMessenger' src='"+data.assets.imgmsg+"' width='32px' alt='Messagerie'/>"+
            "<img id='imgTheme' src='"+data.assets.imgtheme+"' width='32px' alt='Theme'/>"+

        "</div>"+
        "<div><p id='pLogout'><img id='imgLogout' src='"+data.assets.imglogout+"' width='16px' alt='Se déconnecter'/>Se déconnecter</p></div>"+
        "<div>"+
            "<p id='imgProfile'><img src='"+data.assets.img+"' width='64px' alt='"+surname+" "+name+"'/>"+dataUser.status[dataUser.user.STATUS_id-1].name+"<br>"+surname+" "+name+"</p></div>"+
        "</div>";


    htmlTodo +=
        "<div data-use='menulist' class='menuLine todoInbox'>" +
            "<p class='todoInbox' ><img class='todoInbox' src='"+data.assets.img+"' width='16px' alt='image inbox'/>" + "INBOX " + data.assets.inbox+"</p>"+
        "</div>"+
        "<div data-use='menulist' class='menuLine'>" +
            "<p class='todoAssigned'><img src='"+data.assets.img+"' width='16px' alt='image assigné'/>" + "ASSIGNE " + data.assets.assigne+"</p>"+
        "</div>"+
        "<div data-use='menulist' class='menuLine'>" +
            "<p class='todoToday' ><img src='"+data.assets.img+"' width='16px' alt='image today'/>" + "AUJOURD'HUI " + data.assets.today+"</p>"+
        "</div>"+
        "<div data-use='menulist' class='menuLine'>" +
            "<p class='todoWeek' ><img src='"+data.assets.img+"' width='16px' alt='image semaine'/>" + "SEMAINE " + data.assets.week+"</p>"+
        "</div>";



    // Affichage des dossiers de l'utilisateur
    // PAS OPTIMISE DU TOUT, ALGORITHME A REVOIR
    for(var i=0; i<data.folder.length; i++){
        htmlFolders +=
            "<div data-use='menulist' class='menuLine menuFolder'>"+
                "<p class='menuFolder'><img src='"+data.assets.imgfolder+"' width='16px' alt='ajouter dossier'/>"+
                data.folder[i].name+
                "<img src='"+data.assets.imgopenfolder+"' width='16px' alt='"+data.folder[i].name+"' /></p>"+

            //"</div>"+
                /*"<div class='menuul hidden'>"+
                "<ul class='hidden'>"+*/
            //"<div class='menulist' class='menuLine'>"+

                    "<div><p class='newList'>AJOUT LIST" +
                        "<input type='hidden' value='"+data.folder[i].id+"' />"+
                        "<img src='"+data.assets.imgaddtask+"' width='16px' alt='Dossier "+i+"' />" +
                    "</p></div>";
        for(var j=0; j<data.list.length; j++){
            //debugger;
            if(data.list[j].FOLDERS_id == data.folder[i].id)
            {
                htmlFolders +=
                    "<div><p>"+data.list[j].name+
                        "<input type='hidden' value='"+data.list[j].id+"' />"+
                        "<img class='showList' src='"+data.assets.imgsee+"' width='16px' alt='Regarder "+i+"' />" +
                        "<img class='updateList' src='"+data.assets.imgmodtask+"' width='16px' alt='Modifier "+i+"' />" +
                        "<img class='newTask' src='"+data.assets.imgaddtask+"' width='16px' alt='Ajouter "+i+"' /></p>" +
                    "</div>";
            }
        }

        htmlFolders +=
                //"</ul>"+
                //"</div>"+
            "</div>";
    }

    // Ajouter DOSSIER
    htmlFolders +=
        "<div class='newFolder' data-use='menulist' class='menuLine'>" +
            "<p class='newFolder'><img src='"+data.assets.imgfolder+"' width='16px' alt='ajouter dossier'/>"+
            "Nouveau Dossier"+
            "<img src='"+data.assets.imgadd+"' width='16px' alt='ajouter dossier'/></p>"+
        "</div>";

    document.querySelector('[data-use="list"]').innerHTML = htmlList;
    document.querySelector('[data-use="app"]').innerHTML = htmlApp;
    document.querySelector('[data-use="todo"]').innerHTML = htmlTodo;
    document.querySelector('[data-use="folders"]').innerHTML = htmlFolders;
}


//********************************************
// CONTENT
//********************************************
function contentApp()
{
    var htmlContent = "";
    var htmlSettings = "";
    var htmlOptions = "";

    htmlContent +=
        "<div data-use='settings'></div>";

    htmlContent +=
        "<div data-use='options'></div>";

    htmlSettings +=
        "<div>"+
            "<h2 class='newFolder' ><i class='newFolder'>Ajouter Dossier</i></h2>"+
            "<h2 class='newList' ><i class='newList'>Ajouter Liste</i></h2>"+
            "<h2 class='newTask' ><i class='newTask'>Ajouter Tâche</i></h2>"+
        "</div>";

    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
    document.querySelector('[data-use="settings"]').innerHTML = htmlSettings;
    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// FOLDERS
//*********************************************
// // Affiche Formulaire PRIORITY depuis la bar latérale
function addFolder()
{
    var htmlContent = "";

    // Essayer de mettre le plus de champs afin de personnaliser le dossier

    htmlContent +=
        "<div>" +
            "<h2 class=''><i>Dossier</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputFolder' name='txtInputFolder' class='effect-16' type='text' placeholder='Dossier' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputFolder'>Nouveau Dossier</label>"+
                "<span class='focus-border'></span>"+
            "</div>"+

            "<input class='button buttonGreen' type='text' id='btnInputAddFolder' value='Ajout Dossier' />"+
        "</div>";

    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
}

// Affiche Formulaire FOLDER depuis SETTINGS
function addFolder2(data={})
{
    var htmlOptions = "";

    var id = ((data.folder) ? data.folder.id : "");
    var text = ((data.folder) ? data.folder.value : "");

    // Essayer de mettre le plus de champs afin de personnaliser le dossier

    htmlOptions +=
        "<div>" +
            "<h2 class=''><i>Dossier</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputFolder' name='"+id+"' class='effect-16' type='text' value='"+text+"' placeholder='Dossier' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputFolder'>Dossier</label>"+
                "<span class='focus-border'></span>"+
            "</div>";

            //"<input class='button buttonGreen' type='text' id='btnInputAddFolder' value='Ajout Dossier' />"+

    if(data.folder == null )
    {
        htmlOptions +=  "<input class='button buttonGreen' type='text' id='btnAddFolder' value='Ajout Dossier' />";

    }
    else
    {
        htmlOptions += "<input class='button buttonBlue' type='text' id='btnUpdateFolder' value='Mettre à jour Dossier' />";
        htmlOptions += "<input class='button buttonRed' type='text' id='btnDelFolder' value='Supprimer Dossier' />"
    }

    htmlOptions +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// LISTS
//*********************************************
// Formulaire de création de liste
function addList(data={})
{
    var htmlContent = "";

    // User token
    var dataUser = JSON.parse(localStorage.user);
    console.log(dataUser.token);
    debugger;
    var id = ((data.list) ? data.list.id : "");
    var name = ((data.list) ? data.list.name : "");

    var color = ((data.list) ? data.list.color : "");
    var date_start = ((data.list) ? data.list.date_start : "");
    var date_end = ((data.list) ? data.list.date_end : "");

    var idFolder = ((data.folder) ? data.folder.id : "");
    //var textFolder = ((data.folder) ? data.folder.value : "");

    var idPriority = ((data.priority) ? data.priority.id : "");
    var textPriority = ((data.priority) ? data.priority.value : "");

    var nbPriority = 3;

    // DOSSIER PARENT
    htmlContent +=
        "<div>" +
        "<h2 class=''><i>Nouvelle Liste de Tâches</i></h2>"+
        "<div>" +
        "<select id='selectFolder'>";

    /*if(idFolder != "")
     {
     htmlContent += "<option value='"+idFolder+"' selected >"+textFolder+"</option>";
     }*/

    for(var i=0; i < dataUser.folder.length; i++)
    {
        if(idFolder != "" && dataUser.folder[i].id == idFolder)
            htmlContent += "<option value='"+dataUser.folder[i].id+"' selected>"+dataUser.folder[i].name+"</option>";
        else
            htmlContent += "<option value='"+dataUser.folder[i].id+"' >"+dataUser.folder[i].name+"</option>";
    }

    // NAME
    htmlContent +=
        "</select>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputName' name='txtInputName' class='effect-16' type='text' value='"+name+"' placeholder='Nom' required/>"+
        "<label for='txtInputName'>Nom de la Liste</label>"+
        "<span class='focus-border'></span>"+
        "</div>";

    // DATE START / DATE END
    htmlContent +=
        "<div><input id='dateInputStart' type='datetime-local' value='"+date_start+"' /></div>"+
        "<div><input id='dateInputEnd' type='datetime-local' value='"+date_end+"' /></div>";

    // PRIORITY
    htmlContent +=
        "<div>" +
        "Priorité<select id='selectPriority'>";
    if(idPriority != "")
    {
        htmlContent += "<option value='"+idPriority+"' selected='selected'>"+textPriority+"</option>";

    }
    for(var i=0; i<dataUser.priority.length; i++){
        htmlContent += "<option value='"+dataUser.priority[i].id+"' >"+dataUser.priority[i].name+"</option>";
    }

    htmlContent +=
        "</select>"+
        "</div>";

    // COLOR LIST
    htmlContent +=
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputColor' name='txtInputColor' class='effect-16' type='text' value='"+color+"' placeholder='Couleur' required/>"+
        "<label for='txtInputColor'>Couleur de la Liste</label>"+
        "<span class='focus-border'></span>"+
        "</div>";

    if(data.list == null )
    {
        htmlContent +=  "<input class='button buttonGreen' type='text' id='btnAddList' value='Ajout Liste' />";

    }
    else
    {
        // LIST COLOR
        /*htmlContent +=
         "<div class='col-3 input-effect'>" +
         "<input id='txtInputColor' name='txtInputColor' class='effect-16' type='text' value='"+color+"' placeholder='Couleur' required/>"+
         "<label for='txtInputColor'>Couleur de la Liste</label>"+
         "<span class='focus-border'></span>"+
         "</div>";*/

        htmlContent += "<input class='button buttonBlue' type='text' id='btnUpdateList' value='Mettre à jour Liste' />";
        htmlContent += "<input class='button buttonRed' type='text' id='btnDelList' value='Supprimer Liste' />"
    }

    htmlContent +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlContent;
}

// Afficher les taches associées à cette liste
function showList(LISTS_id)
{
    var htmlContent = "";
    var htmlSettings = "";
    var htmlOptions = "";

    // var id
    // var name

    var data = JSON.parse(localStorage.user);
    //debugger;
    data.assets = {
        img: "./assets/essential/149452.svg",
        imgmail: "./assets/ui/747314.svg",
        imgmsg: "./assets/ui/747313.svg",
        imgsettings: "./assets/essential/149294.svg",
        imgfolder: "./assets/essential/149325.svg",
        imgopenfolder: "./assets/ui/747320.svg",
        imgclosefolder: "./assets/essential/747317.svg",
        imgcallback: "./assets/essential/149301.svg",
        imgaddtask: './assets/essential/149411.svg',
        imgmodtask: './assets/essential/149368.svg',
        imgsee: './assets/essential/149099.svg',
        imgadd: './assets/essential/149145.svg',
        imglogout: './assets/essential/149462.svg',
        imgcalendar: './assets/essential/149363.svg',
        inbox: 5,
        assigne: 8,
        today: 8,
        week: 16,
    };


    htmlContent +=
        "<div data-use='settings'></div>";

    htmlContent +=
        "<div data-use='options'></div>";

    htmlSettings +=
        "<div>"+
            "<h2><i>"+data.show.list.name+"</i></h2>";
    // IL FAUT ABSOLUEMENT RENVOYER LE NOMBRE DE TACHES, LEURS ID ET NOM EN AJAX
    for(var i=0; i<data.show.task.length; i++)
    {
        htmlSettings +=
            "<div><p>"+data.show.task[i].name+
                "<input type='hidden' value='"+data.show.task[i].id+"' />"+
                "<img class='showTask' src='"+data.assets.imgsee+"' width='16px' alt='Regarder Tache' />" +
                "<img class='updateTask' src='"+data.assets.imgmodtask+"' width='16px' alt='Modifier Tache' />" +
                "<img class='newChildTask' src='"+data.assets.imgaddtask+"' width='16px' alt='Ajouter Sous Tache' /></p>" +
            "</div>";
    }

    htmlSettings +=
        "</div>";

    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
    document.querySelector('[data-use="settings"]').innerHTML = htmlSettings;
    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// TASKS
//*********************************************
// Faire l'Ajout et l'Update + manque la boucle selected tags
function addTask(data={})
{
    // User token
    var dataUser = JSON.parse(localStorage.user);
    console.log(dataUser.token);

    var LISTS_id = ((data.list) ? data.list.id : "");

    //**********************************************************
    // AJAX for find Frequency, Priority and Parent Task
    //**********************************************************
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var data = JSON.parse(this.responseText);
                userData = JSON.parse(localStorage.getItem("user"));

                userData.frequency = data.frequency;
                userData.priority = data.priority;
                userData.states = data.states;
                userData.status = data.status;
                userData.tags = data.tags;
                userData.task = data.task;


                localStorage["user"] = JSON.stringify(userData);

                debugger;

            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    // TODO route a modifier pour avoir seulement les taches de la liste

    req.open('GET','http://192.168.33.10:8000/user/getTaskInfo',true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
        _token: CSRF_TOKEN,
        message: $('getinfo').val(),
        'token' : dataUser.user.token,
        'USERS_id' : dataUser.user.id,
        'LISTS_id' : LISTS_id,
    }));

    dataUser = JSON.parse(localStorage.user);


    var htmlContent = "";
    var htmlOptions = "";

    //var LISTS_id = ((data.list) ? data.list.id : "");

    var id = ((data.task) ? data.task.id : "");
    var id_parent = ((data.task) ? data.task.id_parent : "");
    var task_parent = ((data.task_parent) ? data.task_parent.id_parent: "");

    var name = ((data.task) ? data.task.name : "");
    var order = ((data.task) ? data.task.order : "");
    var date_start = ((data.task) ? data.task.date_start : "");
    var date_end = ((data.task) ? data.task.date_end : "");
    var description = ((data.task) ? data.task.description : "");

    var idFrequency= ((data.frequency) ? data.frequency.id : "");
    var textFrequency = ((data.frequency) ? data.frequency.value : "");

    var idPriority = ((data.priority) ? data.priority.id : "");
    var textPriority = ((data.priority) ? data.priority.value : "");

    // tableau de tag !!
    var tags = ((data.tags) ? data.tags : "");

    var idAdress = ((data.adress) ? data.adress.id : "");
    var pathway_number = ((data.adress) ? data.adress.pathway_number : "");
    var pathway_type = ((data.adress) ? data.adress.pathway_type : "");
    var pathway_name = ((data.adress) ? data.adress.pathway_name : "");
    var complement = ((data.adress) ? data.adress.complement : "");
    var code = ((data.adress) ? data.adress.code : "");
    var city = ((data.adress) ? data.adress.city : "");
    var country = ((data.adress) ? data.adress.country : "");


    debugger;


    var nbTask = 5;

    // LIST
    if(LISTS_id != "")
    {
        htmlContent += "<input id='hideInputList' type='hidden' value='"+LISTS_id+"' />";
    }

    // PARENT
    if(id_parent != "")
    {
        htmlContent += "<input id='hideInputParent' type='hidden' value='"+id_parent+"' />";
    }
    else if(task_parent != "")
    {
        htmlContent += "<input id='hideInputParent' type='hidden' value='"+task_parent+"' />";
    }

    htmlContent +=
        "<div>" +
        "<h2 class=''><i>Nouvelle Tâche</i></h2>"+
        "<div>" +
        "<select id='selectParent'>" +
        "<option value='' selected='selected'>Sans Parent</option>";

    // TODO Récupérer le nom du parent
    for(var i=0; i<dataUser.task.length; i++)
    {
        if(id_parent != "" && dataUser.task[i].id == id_parent)
        {
            //htmlContent += "<option value='"+id_parent+"' selected >"+Parent+"</option>";
            htmlContent += "<option value='"+dataUser.task[i].id+"' selected>"+dataUser.task[i].name+"</option>";

        }
        else if(task_parent != "" && dataUser.task[i].id == task_parent)
        {
            //htmlContent += "<option value='"+id_parent+"' selected >"+Parent+"</option>";
            htmlContent += "<option value='"+dataUser.task[i].id+"' selected>"+dataUser.task[i].name+"</option>";

        }
        htmlContent += "<option value='"+dataUser.task[i].id+"' >"+dataUser.task[i].name+"</option>";
    }

    htmlContent +=
        "</select>"+
        "</div>";


    // NAME
    htmlContent +=
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputName' name='txtInputName' class='effect-16' type='text' value='"+name+"' placeholder='Nom' required/>"+
        "<label for='txtInputName'>Nom de la tâche</label>"+
        "<span class='focus-border'></span>"+
        "</div>";

    // DATE START / DATE END
    htmlContent +=
        "<div><input id='dateInputStart' type='datetime-local' value='"+date_start+"' /></div>"+
        "<div><input id='dateInputEnd' type='datetime-local' value='"+date_end+"' /></div>";


    // FREQUENCY
    htmlContent +=
        "<div>" +
        "Repeter<select id='selectFrequency'>";

    if(idFrequency != "")
    {
        htmlContent += "<option value='"+idFrequency+"' selected='selected'>"+textFrequency+"</option>";
    }

    for(var i=0; i<dataUser.frequency.length; i++){
        htmlContent += "<option value='"+dataUser.frequency[i].id+"' >"+dataUser.frequency[i].name+"</option>";
    }

    htmlContent +=
        "</select>"+
        "</div>";

    // PRIORITY
    htmlContent +=
        "<div>" +
        "Priorité<select id='selectPriority'>";

    if(idPriority != "")
    {
        htmlContent += "<option value='"+idPriority+"' selected='selected'>"+textPriority+"</option>";
    }


    for(var i=0; i<dataUser.priority.length; i++){
        htmlContent += "<option value='"+dataUser.priority[i].id+"' >"+dataUser.priority[i].name+"</option>";
    }

    htmlContent +=
        "</select>"+
        "</div>";

    // DESCRIPTION
    htmlContent +=
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputDescription' name='txtInputDescription' class='effect-16' type='text' value='"+description+"' placeholder='Description' required/>"+
        "<label for='txtInputDescription'>Description</label>"+
        "<span class='focus-border'></span>"+
        "</div>";


    // TAGS
    htmlContent +=
        "<div>" +
        "Tags<select id='selectTags' multiple>" +
        "<option value='none' selected='selected'>Non</option>"+
        "<option value='high'>Haute</option>";

    // TODO Faire une boucle pour les selected

    for(var i=0; i<nbTask; i++){
        htmlContent += "<option value='"+i+"' >Option "+i+"</option>";
    }

    htmlContent +=
        "</select>"+
        "</div>";

    //ADRESSE
    htmlContent +=
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputPNumber' name='txtInputPNumber' class='effect-16' type='text' value='"+pathway_number+"' placeholder='Numéro de voie'  title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<span class='focus-border'></span>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputPType' name='txtInputPType' class='effect-16' type='text' value='"+pathway_type+"' placeholder='Type de Voie'  title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<span class='focus-border'></span>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputPName' name='txtInputPName' class='effect-16' type='text' value='"+pathway_name+"' placeholder='Nom de Voie'  title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<span class='focus-border'></span>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputComplement' name='txtInputComplement' class='effect-16' value='"+complement+"' type='text' placeholder='Complément'  title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<span class='focus-border'></span>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputCode' name='txtInputCode' class='effect-16' type='text' value='"+code+"' placeholder='Code Postal'  title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<span class='focus-border'></span>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputCity' name='txtInputCity' class='effect-16' type='text' value='"+city+"' placeholder='Ville'  title='Votre nom doit au moins contenir 2 caractères'  />"+
        "<span class='focus-border'></span>"+
        "</div>"+
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputCountry' name='txtInputCountry' class='effect-16' type='text' value='"+country+"' placeholder='Pays'  title='Votre nom doit au moins contenir 2 caractères' />"+
        "<span class='focus-border'></span>"+
        "</div>";

    // DIVISION COLLABORATEUR
    htmlContent +=
        "<div data-use='users-task' class='col-3 input-effect'>" +
        "</div>";

    // AJOUT COLLABORATEUR
    htmlContent +=
        "<div class='col-3 input-effect'>" +
        "<input id='txtInputTeamMate' name='txtInputTeamMate' class='effect-16' type='text' placeholder='Collègue' pattern='[A-Za-z].{2,}' />"+
        "<label for='txtInputTeamMate'>Collègue</label>"+
        "<span class='focus-border'></span>"+
        "</div>";

    htmlContent +=
        "<div data-use='team'></div>";

    if(data.task == null)
    {
        htmlContent +=  "<input class='button buttonGreen' type='text' id='btnAddTask' value='Ajout Tache' />";

    }
    else
    {
        htmlContent += "<input class='button buttonBlue' type='text' id='btnUpdateTask' value='Mettre à jour Tache' />";
        htmlContent += "<input class='button buttonRed' type='text' id='btnDelTask' value='Supprimer Tache' />"
    }

    //
    htmlContent +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlContent;

}

// Afficher la tache
function showTask(TASKS_id)
{
    var htmlContent = "";
    var htmlSettings = "";
    var htmlOptions = "";

    var data = JSON.parse(localStorage.user);

    data.assets = {
        img: "./assets/essential/149452.svg",
        imgmail: "./assets/ui/747314.svg",
        imgmsg: "./assets/ui/747313.svg",
        imgsettings: "./assets/essential/149294.svg",
        imgfolder: "./assets/essential/149325.svg",
        imgopenfolder: "./assets/ui/747320.svg",
        imgclosefolder: "./assets/essential/747317.svg",
        imgcallback: "./assets/essential/149301.svg",
        imgaddtask: './assets/essential/149411.svg',
        imgmodtask: './assets/essential/149368.svg',
        imgsee: './assets/essential/149099.svg',
        imgadd: './assets/essential/149145.svg',
        imglogout: './assets/essential/149462.svg',
        imgcalendar: './assets/essential/149363.svg',
        inbox: 5,
        assigne: 8,
        today: 8,
        week: 16,
    };

    //var test = JSON.parse(localStorage.user);
    var id = TASKS_id;
    var name = "";
    debugger;

    htmlContent +=
        "<div data-use='settings'></div>";

    htmlContent +=
        "<div data-use='options'></div>";

    //TASK
    for(var i=0; i<data.task.length; i++)
    {
        if(data.task[i].id == id)
        {
            htmlSettings +=
                "<div>"+
                "<h2><i>"+data.task[i].name+"</i></h2>";
            for(var j=0; j<data.users.length;j++)
            {
                if(data.users[j].id == data.task[i].USERS_id)
                {
                    htmlSettings += "<p>Créé par: "+data.users[j].surname+" "+data.users[j].name+"</p>";

                    //htmlSettings +="<p>Participant: "+data.states[1].name+"</p>";
                }

            }
            htmlSettings +=
                "<p>Derniere mise à jour: "+data.task[i].date_update+"</p>"+
                "<br>";
            for(var j=0; j<data.states.length;j++)
            {
                if(data.states[j].id == data.task[i].STATES_id)
                {
                    htmlSettings +="<p>Etat: "+data.states[j].name+"</p>";
                }
            }

            htmlSettings +=
                "<p>Date de début: "+data.task[i].date_start+"</p>"+
                "<p>Date de fin: "+data.task[i].date_end+"</p>"+
                "<p>Localisation: "+data.task[i].ADRESS_id+"</p>"+
                "<p>Description: "+data.task[i].description+"</p>";


            if(data.show.team != null && data.show.team != "" && data.show.team.length >0)
            {
                //alert(data.show.team.length);
                htmlSettings += "<p>Participant(s): </p>";
                for (var k = 0; k < data.show.team.length; k++)
                {
                    for (var j = 0; j < data.users.length; j++)
                    {
                        if (data.show.team[k].USERS_id == data.users[j].id)
                        {
                            htmlSettings += "<p>" + data.users[j].surname + " " + data.users[j].name + "</p>";
                        }
                    }
                }
            }

            htmlSettings += "</div>";
        }
    }

    if(data.show.taskschild != null && data.show.taskschild != "") {
        //CHILD
        htmlSettings +=
            "<div>" +
            "<h2><i>Sous-Taches</i></h2>";
        // IL FAUT ABSOLUEMENT RENVOYER LE NOMBRE DE TACHES, LEURS ID ET NOM EN AJAX
        //for(var i=0; i<data.list.task.length; i++)
        for (var i = 0; i < data.show.taskschild.length; i++) {
            //if(data.list.task[i].parent_id == id)
            {
                htmlSettings +=
                    "<div><p>" + data.show.taskschild[i].name +
                    "<input type='hidden' value='" + data.show.taskschild[i].id + "' />" +
                    "<img class='showTask' src='" + data.assets.imgsee + "' width='16px' alt='Regarder Tache' />" +
                    "<img class='updateTask' src='" + data.assets.imgmodtask + "' width='16px' alt='Modifier Tache' />" +
                    "<img class='newChildTask' src='" + data.assets.imgaddtask + "' width='16px' alt='Ajouter Sous Tache' /></p>" +
                    "</div>";
            }
        }

        htmlSettings +=
            "</div>";
    }

    document.querySelector('[data-use="content"]').innerHTML = htmlContent;
    document.querySelector('[data-use="settings"]').innerHTML = htmlSettings;
    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}

// Trouver une personne
function searchPersonne()
{
    // si le input est focus (onfocus) et à chaque touche du clavier tapé
    /*var htmlSearch = "";

     htmlSearch +=
     "<div class='col-3 input-effect'>" +
     "<input id='txtInputName' name='txtInputName' class='effect-16' type='text' placeholder='Prénom' pattern='[A-Za-z].{2,}' title='Votre prénom doit au moins contenir 2 caractères' required/>"+
     "<label for='txtInputName'>Identifiant</label>"+
     "<span class='focus-border'></span>"+
     "</div>";

     htmlSearch +=
     "<div data-use='team'></div>";*/


    // si la valeur du input est inférieur ou égale à 3
    //recupérer la valeur
    // si variable global vide alors variable globale = valeur
    //requete ajax
    // si variable global not null alors
    //comparer variable global et valeur
    //si different
    // faire une recherche ajax
}


//*********************************************
// PRIORITIES
//*********************************************
// Affiche Formulaire PRIORITY depuis SETTINGS
function addPriority(data={})
{
    var htmlOptions = "";

    var id = ((data.priority) ? data.priority.id : "");
    var text = ((data.priority) ? data.priority.value : "");

    htmlOptions +=
        "<div>" +
            "<h2 class=''><i>Priorité</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputPriority' name='"+id+"' class='effect-16' type='text' value='"+text+"' placeholder='Priorite' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputPriority'>Priorité</label>"+
                "<span class='focus-border'></span>"+
            "</div>";

    if(data.priority == null )
    {
        htmlOptions +=  "<input class='button buttonGreen' type='text' id='btnAddPriority' value='Ajout Priorite' />";

    }
    else
    {
        htmlOptions += "<input class='button buttonBlue' type='text' id='btnUpdatePriority' value='Mettre à jour Priorite' />";
        htmlOptions += "<input class='button buttonRed' type='text' id='btnDelPriority' value='Supprimer Priorite' />"
    }

    htmlOptions +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// FREQUENCY
//*********************************************
// Affiche Formulaire FREQUENCY depuis SETTINGS
function addFrequency(data={})
{
    var htmlOptions = "";

    var id = ((data.frequency) ? data.frequency.id : "");
    var text = ((data.frequency) ? data.frequency.value : "");

    htmlOptions +=
        "<div>" +
            "<h2 class=''><i>Frequence</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputFrequency' name='"+id+"' class='effect-16' type='text' value='"+text+"' placeholder='Frequence' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputFrequency'>Frequence de Rappel</label>"+
                "<span class='focus-border'></span>"+
            "</div>";

    if(data.frequency == null )
    {
        htmlOptions +=  "<input class='button buttonGreen' type='text' id='btnAddFrequency' value='Ajout Frequence' />";

    }
    else
    {
        htmlOptions += "<input class='button buttonBlue' type='text' id='btnUpdateFrequency' value='Mettre à jour Frequence' />";
        htmlOptions += "<input class='button buttonRed' type='text' id='btnDelFrequency' value='Supprimer Frequence' />"
    }

    htmlOptions +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// STATUS
//*********************************************
// Affiche Formulaire STATUS depuis SETTINGS
function addStatus(data={})
{
    var htmlOptions = "";

    var id = ((data.status) ? data.status.id : "");
    var text = ((data.status) ? data.status.value : "");

    htmlOptions +=
        "<div>" +
            "<h2 class=''><i>Status</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputStatus' name='"+id+"' class='effect-16' type='text' value='"+text+"' placeholder='Status' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputStatus'>Status Utilisateur</label>"+
                "<span class='focus-border'></span>"+
            "</div>";

    if(data.status == null )
    {
        htmlOptions +=  "<input class='button buttonGreen' type='text' id='btnAddStatus' value='Ajout Status' />";

    }
    else
    {
        htmlOptions += "<input class='button buttonBlue' type='text' id='btnUpdateStatus' value='Mettre à jour Status' />";
        htmlOptions += "<input class='button buttonRed' type='text' id='btnDelStatus' value='Supprimer Status' />"
    }

    htmlOptions +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// STATES
//*********************************************
// Affiche Formulaire STATE depuis SETTINGS
function addState(data={})
{
    var htmlOptions = "";

    var id = ((data.state) ? data.state.id : "");
    var text = ((data.state) ? data.state.value : "");

    htmlOptions +=
        "<div>" +
            "<h2 class=''><i>Etat</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputState' name='"+id+"' class='effect-16' type='text' value='"+text+"' placeholder='State' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputState'>Etat de la tâche</label>"+
                "<span class='focus-border'></span>"+
            "</div>";

    if(data.state == null )
    {
        htmlOptions +=  "<input class='button buttonGreen' type='text' id='btnAddState' value='Ajout Etat' />";

    }
    else
    {
        htmlOptions += "<input class='button buttonBlue' type='text' id='btnUpdateState' value='Mettre à jour State' />";
        htmlOptions += "<input class='button buttonRed' type='text' id='btnDelState' value='Supprimer State' />"
    }

    htmlOptions +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//*********************************************
// TAGS
//*********************************************
// Affiche Formulaire TAG depuis SETTINGS
function addTag(data={})
{
    var htmlOptions = "";

    var id = ((data.tag) ? data.tag.id : "");
    var text = ((data.tag) ? data.tag.value : "");

    htmlOptions +=
        "<div>" +
            "<h2 class=''><i>Tag</i></h2>"+

            "<div class='col-3 input-effect'>" +
                "<input id='txtInputTag' name='"+text+"' class='effect-16' type='text' value='"+text+"' placeholder='Tag' pattern='[A-Za-z].{2,}' title='Le nom de votre dossier doit au moins contenir 2 caractères' required/>"+
                "<label for='txtInputTag'>Tag</label>"+
                "<span class='focus-border'></span>"+
            "</div>";

    if(data.tag == null )
    {
        htmlOptions +=  "<input class='button buttonGreen' type='text' id='btnAddTag' value='Ajout Tag' />";

    }
    else
    {
        htmlOptions += "<input class='button buttonBlue' type='text' id='btnUpdateTag' value='Mettre à jour Tag' />";
        htmlOptions += "<input class='button buttonRed' type='text' id='btnDelTag' value='Supprimer Tag' />"
    }

    htmlOptions +=
        "</div>";

    document.querySelector('[data-use="options"]').innerHTML = htmlOptions;
}


//**********************************************
// INPUT CONTROLLER
//**********************************************

// Champs input non rempli
function errorInput(element)
{
    element.style.borderColor = "red";
    element.style.boxShadow = "red";
}

// Champs input rempli
function valideInput(element)
{
    element.style.borderColor = "green";
    element.style.boxShadow = "green";
}

/*
function checkEmail(element)
{
    var reg = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

    return(reg)
}*/



