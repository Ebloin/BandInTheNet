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
    if (localStorage.utenteCorrente != '' && localStorage.utenteCorrente != undefined) {
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
    } 
    else {
        $('.Logout').switchClass('visibile', 'nonVisibile')
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
    alert("Arrivederci");
}

function login() {
    var storage = JSON.parse(localStorage.utenti);
    var utente = localStorage.utenteCorrente; //il parse non è necessario qui
    var l = storage.length;
    var userName = document.miaform.username.value;
    var userPsw = document.miaform.password.value;
    for (i = 0; i < l; i++) {
        if ((storage[i].Username == userName) && (storage[i].Password == userPsw)) {
            //storage[i].Online = true;
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