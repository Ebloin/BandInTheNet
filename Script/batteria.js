var suoni = {
    65: 'hi-hat',
    88: 'rullante',
    86: 'bass-drum',
    66: 'bass-drum',
    71: 'tom-tom',
    72: 'tom-tom',
    75: 'tom',
    69: 'crash',
    73: 'piatto-ride',
    90: 'bacchette'
};

var recording = false;
var noteRegistrate= [];
var indiceLoop=0;
var catcha= true;
var noteAttive= [];
var userIndex;

function init() {
    //BATTERIA
    createjs.Sound.registerSound("Audio/AudioBatt/hi-hat.mp3", 'hi-hat');
    createjs.Sound.registerSound("Audio/AudioBatt/tom-tom.mp3", 'tom-tom');
    createjs.Sound.registerSound("Audio/AudioBatt/rullante.mp3", 'rullante');
    createjs.Sound.registerSound("Audio/AudioBatt/bass-drum.mp3", 'bass-drum');
    createjs.Sound.registerSound("Audio/AudioBatt/tom.mp3", 'tom');
    createjs.Sound.registerSound("Audio/AudioBatt/crash.mp3", 'crash');
    createjs.Sound.registerSound("Audio/AudioBatt/piatto-ride.mp3", 'piatto-ride');
    createjs.Sound.registerSound("Audio/AudioBatt/bacchette.mp3", 'bacchette');
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


    //Se sei loggato visualizza il tasto
    if (localStorage.utenteCorrente) {
        $('#mySongs').switchClass('nonVisibile', 'visibile');
        aggiornaElenco();
    }

    document.addEventListener('keydown', premotasto);
    document.addEventListener('keyup', lasciotasto);

    var prove = document.getElementsByTagName('area');
    for (i = 0; i < prove.length; i++) {
        prove[i].addEventListener('click', mousedown);
    }

    document.getElementById('play').addEventListener('click', playNote);
    document.getElementById('recButton').addEventListener('click', recHandler);
    document.getElementById('reset').addEventListener('click', resetRegistrata);
    document.getElementById('salvaCanzone').addEventListener('click', salvaCanzone);
    document.getElementById('undo').addEventListener('click', undo);
    document.getElementById('noTextArea').addEventListener('click', outText);
    document.getElementById('nomeCanzone').addEventListener('click', inText);
    document.getElementById('mySongs').addEventListener('click', mostraTabella);
};

var premotasto = function(e) {
    if (!catcha) return;
    var nota = suoni[e.keyCode];
    if (noteAttive.indexOf(nota) != -1) return;
    noteAttive.push(nota);
    if (!nota) return;
    if (recording) {
        noteRegistrate.push(nota);
        document.getElementById('noteregistrate').innerHTML = noteRegistrate;
    }
    createjs.Sound.play(nota);
};


var lasciotasto = function(e) {
    if (!catcha) return;
    var nota = suoni[e.keyCode];
    var index= noteAttive.indexOf(nota);
    if (index != -1) {
        noteAttive.splice(index, 1);
    }
    if (!nota) return;
};

var mousedown= function(e) {
    var nota= e.target.id;
    if (recording) {
        noteRegistrate.push(nota);
        document.getElementById('noteregistrate').innerHTML = noteRegistrate;
    }
    createjs.Sound.play(nota);
}


//Parte di registrazione
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
        songBar.classList.replace('nonVisibile', 'visibileTable');
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
            $('#registrata').switchClass('visibileTable', 'nonVisibile');
            $('#nomeCanzone').val('');
        }
    }
}

var resetRegistrata= function() {
    noteRegistrate= [];  
    if($('#recButton').hasClass('notRec')) {
        $('#registrata').switchClass('visibileTable', 'nonVisibile');        
        $('#noteregistrate').html(noteRegistrate);
        alert('Le note registrate sono state resettate');
    }
    if($('#recButton').hasClass('Rec')) {  
        $('#noteregistrate').html(noteRegistrate);
        alert('Le note registrate sono state resettate');
    }
}

var salvaCanzone= function() {
    //Controllo sulla presenza delle note
    if (noteRegistrate.length == 0) {
        alert("Non c'è nessuna nota registrata da salvare, suona qualcosa");
        return;
    }
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
    if (arrayUsers[index].Songs.batteria.map(function(x) {return x.nome; }).indexOf($('#nomeCanzone').val()) != -1) {
        var sostituisci = confirm("E'già presente una canzone con questo nome, vuoi sovrascriverla?");
        if (!sostituisci) {
            return;
        }
        var indiceCanzone= arrayUsers[index].Songs.batteria.map(function(x) {return x.nome; }).indexOf($('#nomeCanzone').val());
        arrayUsers[index].Songs.batteria[indiceCanzone].note = noteRegistrate;
        alert('"'+ $('#nomeCanzone').val() +'" aggiornata con successo');
        $('#nomeCanzone').val('');
        $('#registrata').switchClass('visibileTable', 'nonVisibile');
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
    
    arrayUsers[index].Songs.batteria.push(canzone);
    var prova= arrayUsers[index].Songs.batteria;
    localStorage.utenti= JSON.stringify(arrayUsers);
    alert('Canzone aggiunta al tuo profilo');
    $('#nomeCanzone').val('');
    $('#registrata').switchClass('visibileTable', 'nonVisibile');
    if ($('#recButton').hasClass('Rec')) {
        $('#recButton').switchClass('Rec', 'notRec');
        recording = false;
    }
    if($('#leMieCanzoni').hasClass('visibileTable')) {
        $('#tabellaCanzoni').html('');
        $('#tabellaCanzoniPianoforte').html('');
        aggiornaElenco();
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
        $('#tabellaCanzoniPianoforte').html('');
        aggiornaElenco();
        $('#leMieCanzoni').switchClass('nonVisibile', 'visibileTable');
        $('#mySongs button').html('Hide mySongs');
    }
    else {
        $('#leMieCanzoni').switchClass('visibileTable', 'nonVisibile');
        $('#mySongs button').html('Show mySongs');
    }
}

var suonaCanzone= function(e) {
    var indiceCanzone = e.target.id;
    var nomeStrumento = e.target.name;
    if (nomeStrumento == 'playMiaCanzone') {
        //SUONA PIANO
        playArray(JSON.parse(localStorage.utenti)[userIndex].Songs.batteria[indiceCanzone].note);
    } 
    else if (nomeStrumento == 'playMiaCanzonePianoforte') {
        //SUONA BATTERIA
        playArray(JSON.parse(localStorage.utenti)[userIndex].Songs.pianoforte[indiceCanzone].note);
    }
}

var rimuoviCanzone= function(e) {
    var indiceCanzone= e.target.id;
    var storage= JSON.parse(localStorage.utenti)
    var utente= storage[userIndex];
    utente.Songs.batteria.splice(indiceCanzone, 1);
    localStorage.utenti= JSON.stringify(storage);
    $('#tabellaCanzoni').html('');
    $('#tabellaCanzoniPianoforte').html('');
    aggiornaElenco();
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
    var canzoni= storage[indice].Songs.batteria;

    /* var head= "<tr class='primariga'><td>Nome canzone</td><td>Riproduci</td><td>Rimuovi</td></tr>";
    $('#tabellaCanzoni').append(head);*/

    for (i=0; i<canzoni.length; i++) {
        var preTab= '<tr id=riga"'+i+'">';
        var endTab= '</tr>'
        var thNome = '<td><p>'+canzoni[i].nome+'</p></td>';
        var thPlay = '<td><button name=playMiaCanzone class="button3d" id="'+i+'">&#9658;</button></td>';
        var thRemove = '<td><button name=removeMiaCanzone class="button3d" id="'+i+'"><span style =" color:brown;">X</span></button></td>';
        var stringa= preTab+thNome+thPlay+thRemove+endTab;
        $('#tabellaCanzoni').append(stringa);
    }
    /*
    var head= "<tr><th>Nome canzone</th><th>Riproduci</th></tr>";
    $('#tabellaCanzoniPianoforte').append(head);*/
    var canzoniPianoforte = storage[indice].Songs.pianoforte;
    for (i = 0; i < canzoniPianoforte.length; i++) {
        var preTab = '<tr id=riga"' + i + '">';
        var endTab = '</tr>'
        var thNome = '<td><p>' + canzoniPianoforte[i].nome + '</p></td>';
        var thPlay = '<td><button name=playMiaCanzone class="button3d" id="'+i+'">&#9658;</button></td>';
        var stringa = preTab + thNome + thPlay + endTab;
        $('#tabellaCanzoniPianoforte').append(stringa);
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
    var playPiano = document.getElementsByName('playMiaCanzonePianoforte');
    for (i = 0; i < playPiano.length; i++) {
        playPiano[i].addEventListener('click', suonaCanzone);
    }
}

checkRimuovi = function(e) {
    if (confirm('Vuoi veramete eliminare la canzone?')) rimuoviCanzone(e);
    else return;
}