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
    if(l==0) return false;
    for (i = 0; i < 1; i++) {
        if (user == storage[i].Username){
            alert("User is already registered");            
            return true;
        }
    }
    return false;
}
function login(){
    var storage = JSON.parse(localStorage.utenti);
    var l = storage.length;
    var userName = document.miaform.username.value;
    var userPsw = document.miaform.password.value;
    for(i=0; i<l; i++){
        if((storage[i].Username == userName) && (storage[i].Password == userPsw)){
             storage[i].Online = true;
            alert("Utente trovato!\n Bentornato!");
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

    var profile = {
        Detail: username,
        Songs: "[]"
    };
    
    if (userInStorage(username)) return false;


    var o = {
        Username: document.miaform.username.value,
        Password: document.miaform.password.value,
        Profile: profile,
        Online: false
    };
    storage[next] = o;
    alert("Dati inseriti");
    localStorage.utenti = JSON.stringify(storage);
    return true;
}