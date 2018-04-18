/*
Validation :
Durée : 17h30
Intitulé :
Un client vous demande de lui produire une application qui lui permettra de suivre l’actualité de ses séries favorites.
Vous devrez produire une application qui permette de chercher une série, et d’accéder au maximum d’informations sur ladite série.
Vous devrez aussi pouvoir ajouter une série en favoris, et permettre un accès facilité aux séries en favoris.

Lien vers l’API : http://www.tvmaze.com/api
*/

/* localestorage serie name / imdb */

userFavoris = {"shows":[]};

// Si le localStorage existe
if(typeof localStorage!='undefined') {
    if(!localStorage.getItem('userFavoris')) {
        localStorage.setItem('userFavoris', JSON.stringify(userFavoris));
    }
    else{
        userFavoris = localStorage.getItem('userFavoris');
    }
}

displayFavoris();

document.addEventListener('click',function (event) {

    displayFavoris();


    //***************************************************************

    if(event.target.tagName == "IMG"){
        /*alert(event.target.id + " - "+event.target.value);
        alert(event.target.parentElement);
        debugger;*/
        for(var p=0; p<document.querySelectorAll(".parentModal").length;p++)
        {
            document.querySelectorAll(".parentModal").item(p).setAttribute("style","display: none");
        }
        /*debugger;
        alert(event.target.parentElement);*/
        event.target.parentElement.querySelector(".parentModal").style.display = "flex";


        //var parentModal = event.target;
        //var showModal = document.querySelector('[data-modal="show"');
        //event.target

        /*

        if (parentModal.style.display !== 'none') {
            parentModal.style.display = 'none';
        }
        else {
            parentModal.style.display = 'flex';
        }*/

    }

    else if(event.target.tagName == "INPUT" && event.target.value == "+"){
        //alert("name : " + event.target.name + " - id : " + event.target.id);

        addFavoris(event.target.alt);
        displayFavoris();
    }

    // SUPPRESSION DE FAVORIS
    else if(event.target.tagName == "INPUT" && event.target.value == "-"){
        alert("name : " + event.target.name + " - id : " + event.target.id);

        deleteFavoris(event.target.id);
        displayFavoris();
    }

    // Requete pour afficher les details d'un favoris
    else if(event.target.tagName == "LI"  && event.target.dataset.ref){


        txtInput = event.target.dataset.ref;
        var idShow = event.target.dataset.show;

        var htmlRenderFavoris = "";
        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText);

                    htmlRenderFavoris += "";
                    alert("-");
                    debugger;


                    //for(var i=0; i<data.length; i++){
                        htmlRenderFavoris += "<div class='parentModale'>" + data.name + "   <input class='button buttonGreen' type='button' id='"+data.id+"' name='"+data.name+"' value='-' "+ '<br />';

                        if(data.image) {
                            htmlRenderFavoris +=   '<div class="showDetail"><img id="'+data.externals.imdb+'" src=' + data.image.original + ' alt="' + data.name + '"/>';
                        }
                        else{
                            //htmlRender += "<div>" + data[i].show.name +'</div>';
                        }
                        htmlRenderFavoris += userFavoris.shows[1].summary + "</div>";
                        htmlRenderFavoris += "<div class='parentModal'>";
                        htmlRenderFavoris += "<div class='childModal'>";
                        htmlRenderFavoris += '<h1>'+data.name+'</h1>';
                        if(data.image) {
                            htmlRenderFavoris +=   '<img src=' + data.image.medium + ' alt="' + data.name + '"/>';
                        }
                        else{

                        }
                        htmlRenderFavoris += '</div>';
                        htmlRenderFavoris += '</div>';
                        htmlRenderFavoris += '<div class="showDetail">';

                        for(var x=0; x<data.length; x++){
                            htmlRenderFavoris += '<h2 data-show="'+idShow+'" data-season="'+data[x].number+'"><i>Saison '+data[x].number + ' ['+data[x].episodeOrder+'] episodes'+'</i></h2>';
                            htmlRenderFavoris += '<div data-show="'+idShow+'" data-season="'+data[x].number+'"></div>';
                        }

                        htmlRenderFavoris += '</div>';

                        htmlRenderFavoris += '</div>';

                    document.querySelector('[data-use="detail"]').innerHTML = htmlRenderFavoris;


                }
                else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };

        req.open('GET', 'http://api.tvmaze.com/shows/'+idShow+'/seasons', true);
        req.send(null);

    }

});


document.addEventListener('mouseover',function (event) {
    if(event.target.tagName == 'LI' && event.target.dataset.ref) {
        document.querySelector('.minImg').setAttribute("style", "display:none");
        //alert(event.target.dataset.ref);
        event.target.querySelector('.minImg').setAttribute("style", "display:flex");
    }

});


document.addEventListener('mouseout',function (event) {
    if(event.target.tagName == 'LI' && event.target.dataset.ref) {
        event.target.querySelector('.minImg').setAttribute("style", "display:none");
    }
});


/*********************************************************************/
// Focus on Input and tape Enter
document.getElementById("txtInput").addEventListener("focus",function(event){
    event.target.addEventListener('keydown', function(event){
        // Match on enter press 13
        if(event.keyCode == 13){

           //TODO Possibilité de factoriser cela en fonction

            var txtInput = document.getElementById('txtInput').value;
            txtInput = txtInput.replace(/\s+/g, '+');

            //alert(event.target.value);

            var htmlRender = "";
            const req = new XMLHttpRequest();

            req.onreadystatechange = function(event) {
                // XMLHttpRequest.DONE === 4
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var data = JSON.parse(this.responseText);

                        htmlRender +="<div class='test'>";//<div class=listImage/>";
                        //debugger;

                        if(typeof localStorage!='undefined'){
                            localStorage.setItem('currentSearch',JSON.stringify(data));
                        }

                        for(var i=0; i<data.length; i++){

                            /*var jsonSend = {
                                "id":data[i].show.id,
                                "name":data[i].show.name,
                                "tvrage":data[i].show.externals.tvrage,
                                "thetvdb":data[i].show.externals.thetvdb,
                                "imdb":data[i].show.externals.imdb,
                                "summary":data[i].show.summary
                            };
                            //debugger;

                            if(data[i].show.image) {
                                jsonSend.image = data[i].show.image.medium;
                            }*/

                            //debugger;
                            //htmlRender += "<div class='parentModale'>" + data[i].show.name + "   <input type='button' id='"+data[i].show.externals.imdb+"' alt='"+JSON.stringify(jsonSend) +"'name='"+data[i].show.name+"' value='+' >";//+ '<br />';
                            htmlRender += "<div data-modal='show' class='parentModale'>" + data[i].show.name + "<span class='rating'>"+data[i].show.rating.average+"</span>   <input class='button buttonGreen' type='button' id='"+data[i].show.externals.imdb+"' alt='"+i +"'name='"+data[i].show.name+"' value='+' >";//+ '<br />';

                            if(data[i].show.image) {
                                //htmlRender += "<div class='parentModal'>" + data[i].show.name + '<br />';
                                htmlRender +=   '<img id="'+data[i].show.externals.imdb+'" src=' + data[i].show.image.medium + ' alt="' + data[i].show.name + '"/>';
                                //htmlRender += '</div>';
                            }
                            else{
                                htmlRender +=   '<img id="'+data[i].show.externals.imdb+'" width="210px"  height="295px" alt="' + data[i].show.name + '"/>';
                                //htmlRender += "<div>" + data[i].show.name +'</div>';
                            }
                            htmlRender += "<div class='parentModal'>";
                            htmlRender += "<div class='childModal'>";
                            htmlRender += '<h1>'+data[i].show.name+'</h1>';
                            if(data[i].show.image) {
                                //htmlRender += "<div class='parentModal'>" + data[i].show.name + '<br />';
                                htmlRender +=   '<div class="childImg"><img src=' + data[i].show.image.original + ' alt="' + data[i].show.name + '"></div>';
                                //htmlRender += '</div>';
                            }
                            else{
                                //htmlRender += "<div>" + data[i].show.name +'</div>';
                            }
                            //childModal
                            htmlRender += data[i].show.summary;
                            htmlRender += '</div>';
                            htmlRender += '</div>';
                            htmlRender += '</div>';
                            //htmlRender += '</div>';

                        }
                        debugger;

                        htmlRender +="</div>";
                        document.querySelector('[data-use="detail"]').innerHTML = htmlRender;

                    }
                    else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    }
                }
            };
            req.open('GET', 'http://api.tvmaze.com/search/shows?q='+ txtInput , true);
            req.send(null);
        }
    });
})

/*
var imageAll = document.querySelectorAll('*');

imageAll.addEventListener('click',function(){
    alert("");
});

var showModal = document.querySelector('[data-modal="show"');
var parentModal = document.querySelector('.parentModal');
var childModal = document.querySelector('.childModal');

showModal.addEventListener('click', function () {
    if (parentModal.style.display !== 'none') {
        parentModal.style.display = 'none';
    }
    else {
        parentModal.style.display = 'flex';
    }

});

parentModal.addEventListener('click', function(event) {


    var div = document.querySelector("div");

    if(event.target == this){
        //this.classList.add('hidden');
        parentModal.style.display = 'none';
    }


});*/


function displayFavoris(){
    favorisHTML ="<ul class='favList'>";
    //RECUPERATIONDES FAVORIS--------------------------------------
    if(typeof localStorage!='undefined'){
        userFavoris = JSON.parse(localStorage.getItem('userFavoris'));
    }
    debugger;

    for(var i=0; i<userFavoris.shows.length; i++) {
        if(userFavoris.shows[i] != null){
            favorisHTML += '<li data-show="'+userFavoris.shows[i].id+'" data-ref="' + userFavoris.shows[i].tvrage + '">' + userFavoris.shows[Number(i)].name;

            if(userFavoris.shows[i].image) {
                favorisHTML += '<div class="minImg"><img src=' + userFavoris.shows[i].image.medium + ' >'+userFavoris.shows[i].summary+'</div>';
            }
            favorisHTML +='</li>';
        }

    }

    favorisHTML += '</ul>';

    document.querySelector('[data-use="favoris"]').innerHTML = favorisHTML;
}


function addFavoris(index){
    alert("name : " + event.target.name + " - id : " + event.target.id);
    var currentSearch = "";
    if(typeof localStorage!='undefined'){
        userFavoris = JSON.parse(localStorage.getItem('userFavoris'));
        currentSearch = JSON.parse(localStorage.getItem('currentSearch'));
    }

    //Model JSON
    /*
    var jsonFavoris = {
        "shows":[
            {
            "id":1,
            "name":"nom",
            "tvrage":550,
            "thetvdb":556322,
            "imdb":"tt1723816",
            "image":"http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
            "summary":"<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>"
            }
        ]
    };*/

    /*var showLength = jsonFavoris.shows.length;

    jsonFavoris.shows[showLength+2] = {
        "id":1,
        "name":"nom",
        "tvrage":550,
        "thetvdb":556322,
        "imdb":"tt1723816",
        "image":"http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
        "summary":"<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>"
    };

     "id":data[i].show.id,
     "name":data[i].show.name,
     "tvrage":data[i].show.externals.tvrage,
     "thetvdb":data[i].show.externals.thetvdb,
     "imdb":data[i].show.externals.imdb,
     "summary":data[i].show.summary
     */
    var duplicateEntry = false;
    var showLength = userFavoris.shows.length;

    for(var x=0; x<showLength; x++){
        if(userFavoris.shows[x].id == currentSearch[index].show.id)
            duplicateEntry = true;
    }

    if(!duplicateEntry) {
        if (showLength == 0) {
            userFavoris.shows[showLength] = {
                "id": currentSearch[index].show.id,
                "name": currentSearch[index].show.name,
                "tvrage": currentSearch[index].show.externals.tvrage,
                "thetvdb": currentSearch[index].show.externals.thetvdb,
                "imdb": currentSearch[index].show.externals.imdb,
                "summary": currentSearch[index].show.summary
            };

            if (currentSearch[index].show.image)
                userFavoris.shows[showLength].image = currentSearch[index].show.image;
        }
        else {
            userFavoris.shows[showLength] = {
                "id": currentSearch[index].show.id,
                "name": currentSearch[index].show.name,
                "tvrage": currentSearch[index].show.externals.tvrage,
                "thetvdb": currentSearch[index].show.externals.thetvdb,
                "imdb": currentSearch[index].show.externals.imdb,
                "summary": currentSearch[index].show.summary
            };

            if (currentSearch[index].show.image)
                userFavoris.shows[showLength].image = currentSearch[index].show.image;
        }
    }

    else{
        alert("Duplicate entry");
    }

    /*userFavoris += "-" + event.target.name + "/" + event.target.id;*/

    if(typeof localStorage!='undefined'){
        localStorage.setItem('userFavoris',JSON.stringify(userFavoris));
    }

}

function deleteFavoris(index){
    var tvrageIndex = Number(index);
    if(typeof localStorage!='undefined'){
        userFavoris = JSON.parse(localStorage.getItem('userFavoris'));
    }
    debugger;
    alert(userFavoris.shows);

    var deleteIndex ="";
    for(var i=0;i<userFavoris.shows.length; i++)
    {
        //if(userFavoris.shows[i].tvrage == tvrageIndex)
        if(userFavoris.shows[i].id == tvrageIndex)
        {
            deleteIndex = i;
            alert("tvrage found");
        }

    }
    //delete userFavoris.shows[deleteIndex] = null;
    //userFavoris.shows[deleteIndex] = null;

    //Met le pointeur à l'index "deleteIndex" et supprime x elements
    userFavoris.shows.splice(deleteIndex,1);

    if(typeof localStorage!='undefined'){
        localStorage.setItem('userFavoris',JSON.stringify(userFavoris));
    }
}

/*
 var data = {
 "result": [{
 "FirstName": "Test1",
 "LastName": "User"
 }, {
 "FirstName": "user",
 "LastName": "user"
 }]
 }
 console.log(data.result);
 console.log("------------ deleting -------------");
 delete data.result[1];
 console.log(data.result); // note the "undefined" in the array.


 data = {
 "result": [{
 "FirstName": "Test1",
 "LastName": "User"
 }, {
 "FirstName": "user",
 "LastName": "user"
 }]
 }

 console.log(data.result);
 console.log("------------ slicing -------------");
 var deletedItem = data.result.splice(1,1);
 console.log(data.result); // here no problem with undefined.
 */


//TODO Ajouter le drag and drop d'une serie
//https://www.w3schools.com/html/html5_draganddrop.asp



//TODO sort by average
/*
https://www.sitepoint.com/user-sortable-lists-flexbox-jquery/

var x = [
    {
        "score":30.547081,
        "show":{
            "id":171,
            "url":"http://www.tvmaze.com/shows/171/how-i-met-your-mother",
            "name":"How I Met Your Mother",
            "type":"Scripted",
            "language":"English",
            "genres":["Drama","Comedy","Romance"],
            "status":"Ended",
            "runtime":30,
            "premiered":"2005-09-19",
            "officialSite":"http://www.cbs.com/shows/how_i_met_your_mother",
            "schedule":{"time":"20:00","days":["Monday"]},
            "rating":{"average":7.8},
            "weight":96,
            "network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},
            "webChannel":null,
            "externals":{"tvrage":3918,"thetvdb":75760,"imdb":"tt0460649"},
            "image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/0/2451.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/0/2451.jpg"},
            "summary":"<p><b>How I Met Your Mother</b> is a comedy about Ted and how he fell in love. It all starts when Ted's best friend, Marshall drops the bombshell that he's going to propose to his long-time girlfriend, Lilya kindergarten teacher. At that moment, Ted realizes that he had better get a move on if he too hopes to find true love. Helping him in his quest is Barney a friend with endless, sometimes outrageous opinions, a penchant for suits and a foolproof way to meet women. When Ted meets Robin he's sure it's love at first sight, but destiny may have something else in store.</p>",
            "updated":1517241568,
            "_links":{"self":{"href":"http://api.tvmaze.com/shows/171"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/12492"}}}}]
        */