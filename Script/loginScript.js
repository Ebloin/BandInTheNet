var userIndex;
var indiceLoop=0;

function inizializzaStorage() {
    if (typeof(localStorage.utenti) == "undefined") localStorage.utenti = "[]";
    if (typeof(localStorage.utenteCorrente) == "undefined") localStorage.utenteCorrente = "";
    var Admin = {
        Username: 'admin',
        Password: 'admin',
        Songs: [],
        Admin: true
    }
    var storage = JSON.parse(localStorage.utenti);
    var l = storage.length;
    if (l == 0) {
        storage[l] = Admin;
        localStorage.utenti = JSON.stringify(storage);
    }
}

function resetStorage() {
    localStorage.utenti = "[]";
}

function goBack() {
    history.back();
    return;
}

var checkUser = function() {
    //Se l'utente è loggato
    if (localStorage.utenteCorrente != '' && localStorage.utenteCorrente != undefined) {
        userIndex = cercaIndiceUtente(localStorage.utenteCorrente);
        document.getElementById("Profile").innerHTML = localStorage.utenteCorrente;
        var log = document.getElementById("login");
        log.classList.replace("visibile", "nonVisibile");
        document.getElementById("nomeUtente").innerHTML = localStorage.utenteCorrente;
        document.getElementById("nomeUtente").classList.replace("nonVisibile", "visibile");

        //$('Profile').html(localStorage.utenteCorrente);
        if ((localStorage.utenteCorrente) == 'admin') {
            var hide = document.getElementById("console");
            hide.classList.replace("nonVisibile", "visibile");
        }
        aggiornaElenco();
        $('#hubUtente').switchClass('nonVisibile', 'Visibile');
    } else {
        $('.Logout').switchClass('visibile', 'nonVisibile');
        if ($('#hubUtente').hasClass('visibile')) $('#hubUtente').switchClass('visibile', 'nonVisibile');
    }
}

function stampaStorage() {
    var storage = JSON.parse(localStorage.utenti);
    var l = storage.length;
    var s = new String("<h1>localStorage:</h1>");
    s += "<table id = localstorage><tr><th>Username</th><th>Password</th></tr>";
    for (i = 0; i < l; i++)
        s += "<tr><td>" + storage[i].Username + "</td><td>" + storage[i].Password + "</td>";
    s += "</table>";
    document.getElementById("Storage").innerHTML = s;
    return true;
}


function userInStorage(user) { //true if user is in localStorge
    var storage = JSON.parse(localStorage.utenti);
    var l = storage.length;
    if (l == 0) return false;
    for (i = 0; i < l; i++) {
        if (user == storage[i].Username) {
            alert("User is already registered");
            return true;
        }
    }
    return false;
}

function logout() {
    localStorage.utenteCorrente = "";
    var out = document.getElementById("login");
    out.classList.replace("nonVisibile", "visibile");
    userIndex = undefined;
    var x= alert("Arrivederci");
}

function login() {
    var storage = JSON.parse(localStorage.utenti);
    var utente = localStorage.utenteCorrente; //il parse non è necessario qui
    var l = storage.length;
    var userName = document.miaform.username.value;
    var userPsw = document.miaform.password.value;
    for (i = 0; i < l; i++) {
        if ((storage[i].Username == userName) && (storage[i].Password == userPsw)) {
            utente = storage[i].Username;
            localStorage.utenteCorrente = utente;
            alert("Utente trovato\nBentornato " + utente + "!");
            return true;
        }
    }
    alert("Utente non registrato!");
    return false;
}

function inserisciUtente() {
    var storage = JSON.parse(localStorage.utenti);
    var next = storage.length;
    var username = document.miaform.username.value;
    var songs = {
        pianoforte: [],
        batteria: []
    }

    if (userInStorage(username)) return false;

    var o = {
        Username: username,
        Password: document.miaform.password.value,
        Songs: songs,
        Admin: false
    };
    storage[next] = o;
    alert("Dati inseriti");
    localStorage.utenti = JSON.stringify(storage);
    return true;
}

//FUNZIONI RELATIVE ALLA GESTIONE DELL'HUB UTENTE
//Aggiorna la tabella relativa alle canzoni registrate nel tuo profilo
var aggiornaElenco = function() {
    var utente = JSON.parse(localStorage.utenti)[cercaIndiceUtente(localStorage.utenteCorrente)];
    //Aggiungo canzoni piano
    var canzoniPiano = utente.Songs.pianoforte;
    for (i = 0; i < canzoniPiano.length; i++) {
        var preTab = '<tr id=riga"' + i + '">';
        var endTab = '</tr>'
        var thNome = '<th><p>' + JSON.stringify(canzoniPiano[i].nome) + '</p></th>';
        var thRemove = '<th><button name=removeMiaCanzonePiano id="' + i + '">Remove</button></th>';
        var stringa = preTab + thNome + thRemove + endTab;
        $('#tabellaCanzoniPiano').append(stringa);
    }
    //Aggiungo canzoni batteria
    var canzoniBatteria = utente.Songs.batteria;
    for (i = 0; i < canzoniBatteria.length; i++) {
        var preTab = '<tr id=riga"' + i + '">';
        var endTab = '</tr>'
        var thNome = '<th><p>' + JSON.stringify(canzoniBatteria[i].nome) + '</p></th>';
        var thRemove = '<th><button name=removeMiaCanzoneBatteria id="' + i + '">Remove</button></th>';
        var stringa = preTab + thNome + thRemove + endTab;
        $('#tabellaCanzoniBatteria').append(stringa);
    }
    aggiungiListener();
}

var aggiungiListener = function() {
    var delPiano = document.getElementsByName('removeMiaCanzonePiano');
    for (i = 0; i < delPiano.length; i++) {
        delPiano[i].addEventListener('click', checkRimuovi);
    }
    var delBatt = document.getElementsByName('removeMiaCanzoneBatteria');
    for (i = 0; i < delBatt.length; i++) {
        delBatt[i].addEventListener('click', checkRimuovi);
    }
}

var cercaIndiceUtente = function(nome) {
    var nomeUtente = nome;
    var arrayUsers = JSON.parse(localStorage.utenti);
    //Calcolo indice utente
    var index;
    for (i = 0; i < arrayUsers.length; i++) {
        if (JSON.stringify(arrayUsers[i].Username) == JSON.stringify(nomeUtente)) {
            index = i;
        }
    }
    return index;
}

checkRimuovi = function(e) {
    if (confirm('Vuoi veramete eliminare la canzone?')) rimuoviCanzone(e);
    else return;
}

var rimuoviCanzone = function(e) {
    var indiceCanzone = e.target.id;
    var nomeStrumento = e.target.name;
    if (nomeStrumento == 'removeMiaCanzonePiano') {
        var storage = JSON.parse(localStorage.utenti)
        var utente = storage[userIndex];
        utente.Songs.pianoforte.splice(indiceCanzone, 1);
        localStorage.utenti = JSON.stringify(storage);
        $('#tabellaCanzoniPiano').html('');
        $('#tabellaCanzoniBatteria').html('');
        aggiornaElenco();
    } else if (nomeStrumento == 'removeMiaCanzoneBatteria') {
        var storage = JSON.parse(localStorage.utenti)
        var utente = storage[userIndex];
        utente.Songs.batteria.splice(indiceCanzone, 1);
        localStorage.utenti = JSON.stringify(storage);
        $('#tabellaCanzoniBatteria').html('');
        $('#tabellaCanzoniPiano').html('');
        aggiornaElenco();
    }
};
