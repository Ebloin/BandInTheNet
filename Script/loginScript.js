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
    s += "<table id = localstorage><tr><th>Cognome</th><th>Nome</th><th>Matricola</th></tr>";
    for (i = 0; i < l; i++)
        s += "<tr><td>" + storage[i].Cognome + "</td><td>" + storage[i].Nome + "</td><td>" + storage[i].Matricola + "</td>";
    s += "</table>";
    document.getElementById("Storage").innerHTML = s;
    return true;
}

function uguali(u1, u2) {
    if (u1.matricola == u2.matricola) return true;
    return false;
}

function inserisciUtente() {
    var storage = JSON.parse(localStorage.utenti);
    var next = storage.length;
    var o = {
        Cognome: document.miaform.Cognome.value,
        Nome: document.miaform.Nome.value,
        Matricola: document.miaform.Matricola.value
    };
    storage[next] = o;
    alert("Dati inseriti");
    localStorage.utenti = JSON.stringify(storage);
    return true;
}