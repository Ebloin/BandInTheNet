function inizializzaStorage() {
    if (typeof (localStorage.utenti) == "undefined") localStorage.utenti = "[]";
    if (typeof (localStorage.utenteCorrente) == "undefined") localStorage.utenteCorrente = "";
}

function resetStorage() {
    localStorage.utenti = "[]";
}

function back() {
    history.back();
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
    if(l==0) return false;
    for (i = 0; i < l; i++) {
        if (user == storage[i].Username){
            alert("User is already registered");            
            return true;
        }
    }
    return false;
}

function logout(){
    localStorage.utenteCorrente.setItem("utenteCorrente","");
}
function login(){
    var storage = JSON.parse(localStorage.utenti);
    var utente = JSON.parse(localStorage.getItem(localStorage.utenteCorrente));  //il parse non è necessario qui
    var l = storage.length;
    var userName = document.miaform.username.value;
    var userPsw = document.miaform.password.value;
    for(i=0; i<l; i++){
        if((storage[i].Username == userName) && (storage[i].Password == userPsw)){
            //storage[i].Online = true;
            utente = storage[i].Username;
            localStorage.setItem("utenteCorrente", utente);
            alert("Utente trovato!\nBentornato "+ utente +"!");
            return;         
        }
    }
    alert("Utente non registrato!");
    return;
}
function inserisciUtente() {
    var storage = JSON.parse(localStorage.utenti);
    var next = storage.length;
    var username = document.miaform.username.value;
    var songs = []; //va stringhificato?
    
    if (userInStorage(username)) return false;

    var o = {
        Username: username,
        Password: document.miaform.password.value,
        Songs: songs
    };
    storage[next] = o;
    alert("Dati inseriti");
    localStorage.utenti = JSON.stringify(storage);
    return true;
}