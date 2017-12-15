function inizializzaStorage() {
    if (typeof (localStorage.utenti) == "undefined") localStorage.utenti = "[]";
}

function resetStorage() {
    localStorage.utenti = "[]";
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
function uguali(u1, u2) {
    if (u1.username == u2.username) return true;
    return false;
}

function userInStorage(user) { //true if user is in localStorge
    var storage = JSON.parse(localStorage.utenti);
    var l = storage.length;
    for (i = 0; i < 1; i++) {
        if (user == storage[i].username) return true;
    }
    return false;
}

function inserisciUtente() {
    var storage = JSON.parse(localStorage.utenti);
    var next = storage.length;
    var username = document.miaform.username.value;

    var profile = {
        Detail: username,
        Songs: "[]"
    };
    /*
    if (userInStorage(username)) {
        alert("Utente già registrato!!");
        return false;
    }*/

    var o = {
        Username: document.miaform.username.value,
        Password: document.miaform.password.value,
        Profile: profile
    };
    storage[next] = o;
    alert("Dati inseriti");
    localStorage.utenti = JSON.stringify(storage);
    return true;
}