var KEYMAP = {
    65: 'do4',
    87: 'do#4',
    83: 're4',
    69: 're#4',
    68: 'mi4',
    70: 'fa4',
    84: 'fa#4',
    71: 'sol4',
    89: 'sol#4',
    72: 'la4',
    85: 'la#4',
    74: 'si4',
    75: 'do5',
    79: 'do#5',
    76: 're5',
    80: 're#5',
    90: 'mi5',
    88: 'fa5',
    67: 'sol5',
    86: 'la5',
    66: 'si5'
};


var recording = false;
var noteRegistrate= [];
var indiceLoop=0;
var catcha= true;
var noteAttive= [];
var userIndex;

function init() {
    createjs.Sound.registerSound("Audio/note/2ottave/do4.wav", 'do4');
    createjs.Sound.registerSound("Audio/note/2ottave/do4d.wav", 'do#4');
    createjs.Sound.registerSound("Audio/note/2ottave/re4.wav", 're4');
    createjs.Sound.registerSound("Audio/note/2ottave/re4d.wav", 're#4');
    createjs.Sound.registerSound("Audio/note/2ottave/mi4.wav", 'mi4');
    createjs.Sound.registerSound("Audio/note/2ottave/fa4.wav", 'fa4');
    createjs.Sound.registerSound("Audio/note/2ottave/fa4d.wav", 'fa#4');
    createjs.Sound.registerSound("Audio/note/2ottave/sol4.wav", 'sol4');
    createjs.Sound.registerSound("Audio/note/2ottave/sol4d.wav", 'sol#4');
    createjs.Sound.registerSound("Audio/note/2ottave/la4.wav", 'la4');
    createjs.Sound.registerSound("Audio/note/2ottave/la4d.wav", 'la#4');
    createjs.Sound.registerSound("Audio/note/2ottave/si4.wav", 'si4');
    createjs.Sound.registerSound("Audio/note/2ottave/do5.wav", 'do5');
    createjs.Sound.registerSound("Audio/note/2ottave/do5d.wav", 'do#5');
    createjs.Sound.registerSound("Audio/note/2ottave/re5.wav", 're5');
    createjs.Sound.registerSound("Audio/note/2ottave/re5d.wav", 're#5');
    createjs.Sound.registerSound("Audio/note/2ottave/mi5.wav", 'mi5');
    createjs.Sound.registerSound("Audio/note/2ottave/fa5.wav", 'fa5');
    createjs.Sound.registerSound("Audio/note/2ottave/fa5d.wav", 'fa#5');
    createjs.Sound.registerSound("Audio/note/2ottave/sol5.wav", 'sol5');
    createjs.Sound.registerSound("Audio/note/2ottave/sol5d.wav", 'sol#5');
    createjs.Sound.registerSound("Audio/note/2ottave/la5.wav", 'la5');
    createjs.Sound.registerSound("Audio/note/2ottave/la5d.wav", 'la#5');
    createjs.Sound.registerSound("Audio/note/2ottave/si5.wav", 'si5');
    
    //Se sei loggato
    if (localStorage.utenteCorrente) {
        $('#mySongs').switchClass('nonVisibile', 'visibile');
        aggiornaElenco();
    }

    document.addEventListener('keydown', premotasto);
    document.addEventListener('keyup', lasciotasto);

    var prove = document.getElementsByClassName('key');
    for (i = 0; i < prove.length; i++) {
        prove[i].addEventListener('mousedown', mousedown);
        prove[i].addEventListener('mouseup', mouseup);
    }
    document.getElementById('play').addEventListener('click', playNote);
    document.getElementById('recButton').addEventListener('click', recHandler);
    document.getElementById('reset').addEventListener('click', resetRegistrata);
    document.getElementById('salvaCanzone').addEventListener('click', salvaCanzone);
    document.getElementById('undo').addEventListener('click', undo);
    document.getElementById('noTextArea').addEventListener('click', outText);
    document.getElementById('nomeCanzone').addEventListener('click', inText);
    document.getElementById('mySongs').addEventListener('click', mostraTabella);
}

var premotasto = function(e) {
    if (!catcha) return;
    //Premo un tasto per suonare
    var nota = KEYMAP[e.keyCode];
    if (noteAttive.indexOf(nota) != -1) return;
    noteAttive.push(nota);
    if (!nota) return; //Se il tasto non è mappato
    document.getElementById(nota).classList.add('active');
    if (recording) {
        noteRegistrate.push(nota);
        document.getElementById('noteregistrate').innerHTML = noteRegistrate;
    }
    createjs.Sound.play(nota);
}

var lasciotasto = function(e) {
    if (!catcha) return;
    //Lascio tasto per smettere di suonare
    var nota = KEYMAP[e.keyCode];
    var index= noteAttive.indexOf(nota);
    if (index != -1) {
        noteAttive.splice(index, 1);
    }
    if (!nota) return; //Se il tasto non è mappato
    document.getElementById(nota).classList.remove('active');
}

var mousedown= function(e) {
    var nota= e.target.id;
    e.target.classList.add('active');
    if (recording) {
        noteRegistrate.push(nota);
    }
    createjs.Sound.play(nota);
}

var mouseup= function(e) {
    e.target.classList.remove('active');
}

var registra= function() {
    recording = true;
    //INSERIRE CONTROLLO SE VERAMENTE UOLE CANCELLARE
    noteRegistrate = [];
    $('#noteregistrate').text('');
};

var stopRegistra= function() {recording = false};

var playNote= function() {
    if (noteRegistrate.length == 0) {
        alert('Spiacenti ma non hai ancora registrato nessuna melodia, prova con il pulsante rosso');
        return;
    }
    var loop = setInterval(function() {
        nota= noteRegistrate[indiceLoop];
        indiceLoop++;    
        suona(nota);
        if (indiceLoop == noteRegistrate.length) {
            indiceLoop=0;
            clearInterval(loop);
        }
    }, 500);
}

var suona= function(nota) {
    createjs.Sound.play(nota);
}
var recHandler= function(e) {
    var button= e.target;
    var songBar= document.getElementById('registrata');
    //non sto registrando, inizia a registrare
    if (button.classList.contains('notRec')){
        button.classList.replace('notRec', 'Rec');
        songBar.classList.replace('nonVisibile', 'visibile');
        recording = true;
        //INSERIRE CONTROLLO SE VERAMENTE UOLE CANCELLARE
        noteRegistrate = [];
        $('#noteregistrate').text('');
    }

    //Sto registrando, stop alla registrazione
    else if (button.classList.contains('Rec')){
        button.classList.replace('Rec', 'notRec');
        recording = false;
        if (noteRegistrate.length == 0) {
            $('#registrata').switchClass('visibile', 'nonVisibile');
            $('#nomeCanzone').val('');
        }
    }
}

var resetRegistrata= function() {
    noteRegistrate= [];  
    if($('#recButton').hasClass('notRec')) {
        $('#registrata').switchClass('visibile', 'nonVisibile');        
        $('#noteregistrate').html(noteRegistrate);
        alert('Le note registrate sono state resettate');
    }
    if($('#recButton').hasClass('Rec')) {  
        $('#noteregistrate').html(noteRegistrate);
        alert('Le note registrate sono state resettate');
    }
}

var salvaCanzone= function() {
    //Conrollo sul nome della canzone
    if ($('#nomeCanzone').val() == '') {
        alert('Non hai suonato nessuna nota, non puoi salvare una canzone vuota');
        return;
    }
    //Controllo utente loggato
    if (localStorage.utenteCorrente == undefined || localStorage.utenteCorrente == '') {
        alert('Per salvare una canzone devi prima loggarti');
        return;
    }
    var nomeUtente= localStorage.utenteCorrente;
    var arrayUsers= JSON.parse(localStorage.utenti);
    //Calcolo indice utente
    var index;
    for (i=0; i<arrayUsers.length; i++) {
        if (JSON.stringify(arrayUsers[i].Username) == JSON.stringify(nomeUtente)) {
            index= i;
        }
    }
    
    //Controllo canzone già presente
    if (arrayUsers[index].Songs.pianoforte.map(function(x) {return x.nome; }).indexOf($('#nomeCanzone').val()) != -1) {
        var sostituisci = confirm("E'già presente una canzone con questo nome, vuoi sovrascriverla?");
        if (!sostituisci) {
            return;
        }
        var indiceCanzone= arrayUsers[index].Songs.pianoforte.map(function(x) {return x.nome; }).indexOf($('#nomeCanzone').val());
        arrayUsers[index].Songs.pianoforte[indiceCanzone].note = noteRegistrate;
        alert('"'+ $('#nomeCanzone').val() +'" aggiornata con successo');
        $('#nomeCanzone').val('');
        $('#registrata').switchClass('visibile', 'nonVisibile');
        if ($('#recButton').hasClass('Rec')) {
            $('#recButton').switchClass('Rec', 'notRec');
            recording = false;
        }
        return;
    }

    //Creo oggetto canzone
    var canzone = {
        nome: $('#nomeCanzone').val(),
        note: noteRegistrate
    }
    
    arrayUsers[index].Songs.pianoforte.push(canzone);
    var prova= arrayUsers[index].Songs.pianoforte;
    localStorage.utenti= JSON.stringify(arrayUsers);
    alert('Canzone aggiunta al tuo profilo');
    $('#nomeCanzone').val('');
    $('#registrata').switchClass('visibile', 'nonVisibile');
    if ($('#recButton').hasClass('Rec')) {
        $('#recButton').switchClass('Rec', 'notRec');
        recording = false;
    }
    
    if($('#leMieCanzoni').hasClass('visibile')) {
        $('#tabellaCanzoni').html('');
        aggiornaElenco();
        var prove = document.getElementsByName('playMiaCanzone');
        for (i = 0; i < prove.length; i++) {
            prove[i].addEventListener('click', suonaCanzone);
        }
    }
}

var undo= function() {
    noteRegistrate.pop();
    document.getElementById('noteregistrate').innerHTML = noteRegistrate;
}

var inText= function() {
    catcha= false;
}

var outText= function() {
    catcha= true;
}

var cercaIndiceUtente = function(nome) {
    var nomeUtente= nome;
    var arrayUsers= JSON.parse(localStorage.utenti);
    //Calcolo indice utente
    var index;
    for (i=0; i<arrayUsers.length; i++) {
        if (JSON.stringify(arrayUsers[i].Username) == JSON.stringify(nomeUtente)) {
            index= i;
        }
    }
    return index;
}

var mostraTabella= function() {
    if($('#leMieCanzoni').hasClass('nonVisibile')) {
        $('#tabellaCanzoni').html('');
        aggiornaElenco();
        $('#leMieCanzoni').switchClass('nonVisibile', 'visibile');
        $('#mySongs').html('Hide mySongs');
        var prove = document.getElementsByName('playMiaCanzone');
        for (i = 0; i < prove.length; i++) {
            prove[i].addEventListener('click', suonaCanzone);
        }
    }
    else {
        $('#leMieCanzoni').switchClass('visibile', 'nonVisibile');
        $('#mySongs').html('Show mySongs');
    }
}

var suonaCanzone= function(e) {
    var indice= e.target.id;
    playArray(JSON.parse(localStorage.utenti)[userIndex].Songs.pianoforte[indice].note);
}
var playArray= function(array) {
    var loop = setInterval(function() {
        nota= array[indiceLoop];
        indiceLoop++;    
        suona(nota);
        if (indiceLoop == array.length) {
            indiceLoop=0;
            clearInterval(loop);
        }
    }, 500);
}

var aggiornaElenco= function() {
    var storage= JSON.parse(localStorage.utenti);

    var indice= cercaIndiceUtente(localStorage.utenteCorrente);
    userIndex= indice;
    var canzoni= storage[indice].Songs.pianoforte;
    for (i=0; i<canzoni.length; i++) {
        var preTab= '<tr id=riga"'+i+'">';
        var endTab= '</tr>'
        var thNome = '<th><p>'+JSON.stringify(canzoni[i].nome)+'</p></th>';
        var thPlay = '<th><button name=playMiaCanzone id="'+i+'">Play</button></th>';
        var stringa= preTab+thNome+thPlay+endTab;
        $('#tabellaCanzoni').append(stringa);
    }
}