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

//Indica se si sta registrando
var recording = false;
//Array delle note registrate
var noteRegistrate= [];
//Indice globale del loop per riprodurre le canzoni
var indiceLoop=0;
var catcha= true;
//Array delle note premute contemporaneamente
var noteAttive= [];
//Indice dell'utente attivo
var userIndex;

function init() {
    //PIANOFORTE
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

    //BATTERIA
    createjs.Sound.registerSound("Audio/AudioBatt/hi-hat.mp3", 'hi-hat');
    createjs.Sound.registerSound("Audio/AudioBatt/tom-tom.mp3", 'tom-tom');
    createjs.Sound.registerSound("Audio/AudioBatt/rullante.mp3", 'rullante');
    createjs.Sound.registerSound("Audio/AudioBatt/bass-drum.mp3", 'bass-drum');
    createjs.Sound.registerSound("Audio/AudioBatt/tom.mp3", 'tom');
    createjs.Sound.registerSound("Audio/AudioBatt/crash.mp3", 'crash');
    createjs.Sound.registerSound("Audio/AudioBatt/piatto-ride.mp3", 'piatto-ride');
    createjs.Sound.registerSound("Audio/AudioBatt/bacchette.mp3", 'bacchette');

    
    //Se sei loggato visualizza il tasto 
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

//Premo tasto del piano con tastiera
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

//Rilascio del tasto del puano con tastiera
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

//Abbassa il tasto del piano e suona
var mousedown= function(e) {
    var nota= e.target.id;
    e.target.classList.add('active');
    if (recording) {
        noteRegistrate.push(nota);
        document.getElementById('noteregistrate').innerHTML = noteRegistrate;
    }
    createjs.Sound.play(nota);
}

//Rialza il tasto del piano
var mouseup= function(e) {
    e.target.classList.remove('active');
}

//Inizia a registrare
var registra= function() {
    recording = true;
    //INSERIRE CONTROLLO SE VERAMENTE UOLE CANCELLARE
    noteRegistrate = [];
    $('#noteregistrate').text('');
};

//Smetti di registrare
var stopRegistra= function() {recording = false};

//Riproduci l'array di note registrate corrente
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

//Suona una nota
var suona= function(nota) {
    createjs.Sound.play(nota);
}

//Gestore del pulsante animato REC
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

//Resetta l'array della canzone che è stata registrata
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

//Salva una nuova canzone nel localStiorage relativo all'utente
var salvaCanzone= function() {
    //Controllo sulla presenza delle note
    if (noteRegistrate.length == 0) {
        alert("Non c'è nessuna nota registrata da salvare, suona qualcosa");
        return;
    }
    //Conrollo sul nome della canzone
    if ($('#nomeCanzone').val() == '') {
        alert('Devi dare un nome alla tua canzone');
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
    //Se la tabella è visibile aggiornala
    if($('#leMieCanzoni').hasClass('visibile')) {
        $('#tabellaCanzoni').html('');
        $('#tabellaCanzoniBatteria').html('');
        aggiornaElenco();
    }
}

//Rimuovi dall'array l'ultima nota suonata
var undo= function() {
    noteRegistrate.pop();
    document.getElementById('noteregistrate').innerHTML = noteRegistrate;
}

//Se sono dentro la casella di testo non suona
var inText= function() {
    catcha= false;
}

//Se sono fuori dalla casella di testo suona
var outText= function() {
    catcha= true;
}

//Cerca nel localStorage l'indice dell'utente relativo a un username
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

//Listener del tasto Show mySongs che attiva e disattiva la visualizzazione della tabella, aggiornando eventualmente l'elenco delle canzoni
var mostraTabella= function() {
    if($('#leMieCanzoni').hasClass('nonVisibile')) {
        $('#tabellaCanzoni').html('');
        $('#tabellaCanzoniBatteria').html('');
        aggiornaElenco();
        $('#leMieCanzoni').switchClass('nonVisibile', 'visibile');
        $('#mySongs button').html('Hide mySongs');
    }
    else {
        $('#leMieCanzoni').switchClass('visibile', 'nonVisibile');
        $('#mySongs button').html('Show mySongs');
    }
}

//Listener del tasto play vicino a ogni canzone nella tabella delle mie canzoni
var suonaCanzone= function(e) {
    /*var indiceCanzone= e.target.id;
    playArray(JSON.parse(localStorage.utenti)[userIndex].Songs.pianoforte[indiceCanzone].note);
    */
    var indiceCanzone = e.target.id;
    var nomeStrumento = e.target.name;
    if (nomeStrumento == 'playMiaCanzone') {
        //SUONA PIANO
        playArray(JSON.parse(localStorage.utenti)[userIndex].Songs.pianoforte[indiceCanzone].note);
    } 
    else if (nomeStrumento == 'playMiaCanzoneBatteria') {
        //SUONA BATTERIA
        playArray(JSON.parse(localStorage.utenti)[userIndex].Songs.batteria[indiceCanzone].note);
    }
}

//NUOVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
var rimuoviCanzone= function(e) {
    var indiceCanzone= e.target.id;
    var storage= JSON.parse(localStorage.utenti)
    var utente= storage[userIndex];
    utente.Songs.pianoforte.splice(indiceCanzone, 1);
    localStorage.utenti= JSON.stringify(storage);
    $('#tabellaCanzoni').html('');
    $('#tabellaCanzoniBatteria').html('');
    aggiornaElenco();
}

//Riproduce un array di note
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

//Aggiorna la tabella relativa alle canzoni registrate nel tuo profilo
var aggiornaElenco= function() {
    var storage= JSON.parse(localStorage.utenti);
    var indice= cercaIndiceUtente(localStorage.utenteCorrente);
    userIndex= indice;
    var canzoni= storage[indice].Songs.pianoforte;
    /*
    var head= "<tr><th>Nome canzone</th><th>Riproduci</th><th>Rimuovi</th></tr>";
    $('#tabellaCanzoni').append(head);*/
    for (i=0; i<canzoni.length; i++) {
        var preTab= '<tr id=riga"'+i+'">';
        var endTab= '</tr>'
        var thNome = '<td><p>'+canzoni[i].nome+'</p></td>';
        var thPlay = '<td><button name=playMiaCanzone class="button3dWhite" id="'+i+'">&#9658;</button></td>';
        var thRemove = '<td><button name=removeMiaCanzone class="button3dWhite" id="'+i+'"><span style =" color:brown;">X</span></button></td>';
        var stringa= preTab+thNome+thPlay+thRemove+endTab;
        $('#tabellaCanzoni').append(stringa);
    }
    /*
    var head= "<tr><th>Nome canzone</th><th>Riproduci</th></tr>";
    $('#tabellaCanzoniBatteria').append(head);*/
    var canzoniBatteria = storage[indice].Songs.batteria;
    for (i = 0; i < canzoniBatteria.length; i++) {
        var preTab = '<tr id=riga"' + i + '">';
        var endTab = '</tr>';
        var thNome = '<td><p>' + canzoniBatteria[i].nome + '</p></td>';
        var thPlay = '<td><button name=playMiaCanzone class="button3dWhite" id="'+i+'">&#9658;</button></td>';
        var stringa = preTab + thNome + thPlay + endTab;
        $('#tabellaCanzoniBatteria').append(stringa);
    }
    aggiungiListener();
}

var aggiungiListener = function() {
    var play = document.getElementsByName('playMiaCanzone');
    for (i = 0; i < play.length; i++) {
        play[i].addEventListener('click', suonaCanzone);
    }
    var del = document.getElementsByName('removeMiaCanzone');
    for (i = 0; i < del.length; i++) {
        del[i].addEventListener('click', checkRimuovi);
    }
    var playBatt = document.getElementsByName('playMiaCanzoneBatteria');
    for (i = 0; i < playBatt.length; i++) {
        playBatt[i].addEventListener('click', suonaCanzone);
    }
}
checkRimuovi = function(e) {
    if (confirm('Vuoi veramete eliminare la canzone?')) rimuoviCanzone(e);
    else return;
}