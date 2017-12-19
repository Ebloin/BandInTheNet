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

function init() {
    createjs.Sound.registerSound("Audio/AudioBatt/hi-hat.mp3", 'hi-hat');
    createjs.Sound.registerSound("Audio/AudioBatt/tom-tom.mp3", 'tom-tom');
    createjs.Sound.registerSound("Audio/AudioBatt/rullante.mp3", 'rullante');
    createjs.Sound.registerSound("Audio/AudioBatt/bass-drum.mp3", 'bass-drum');
    createjs.Sound.registerSound("Audio/AudioBatt/tom.mp3", 'tom');
    createjs.Sound.registerSound("Audio/AudioBatt/crash.mp3", 'crash');
    createjs.Sound.registerSound("Audio/AudioBatt/piatto-ride.mp3", 'piatto-ride');
    createjs.Sound.registerSound("Audio/AudioBatt/bacchette.mp3", 'bacchette');

    var prove = document.getElementsByTagName('area');
    for (i = 0; i < prove.length; i++) {
        prove[i].addEventListener('click', mousedown);
    }

    document.addEventListener('keydown', premotasto);
    document.addEventListener('keyup', lasciotasto);
    document.getElementById('play').addEventListener('click', playNote);
    document.getElementById('recButton').addEventListener('click', recHandler);
    document.getElementById('reset').addEventListener('click', resetRegistrata);
    document.getElementById('salvaCanzone').addEventListener('click', salvaCanzone);
    document.getElementById('undo').addEventListener('click', undo);
    document.getElementById('noTextArea').addEventListener('click', outText);
    document.getElementById('nomeCanzone').addEventListener('click', inText);

    if (localStorage.utenteCorrente) {
        $('#mySongs').switchClass('nonVisibile', 'visibile');
    }
};

var premotasto = function(e) {
    if (!catcha) return;
    var nota = suoni[e.keyCode];
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
        }
        $('#nomeCanzone').val('');
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
    if (arrayUsers[index].Songs.batteria.map(function(x) {return x.nome; }).indexOf($('#nomeCanzone').val()) != -1) {
        var sostituisci = confirm("E'già presente una canzone con questo nome, vuoi sovrascriverla?");
        if (!sostituisci) {
            return;
        }
        var indiceCanzone= arrayUsers[index].Songs.batteria.map(function(x) {return x.nome; }).indexOf($('#nomeCanzone').val());
        arrayUsers[index].Songs.batteria[indiceCanzone].note = noteRegistrate;
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
    
    arrayUsers[index].Songs.batteria.push(canzone);
    var prova= arrayUsers[index].Songs.batteria;
    localStorage.utenti= JSON.stringify(arrayUsers);
    alert('Canzone aggiunta al tuo profilo');
    $('#nomeCanzone').val('');
    $('#registrata').switchClass('visibile', 'nonVisibile');
    if ($('#recButton').hasClass('Rec')) {
        $('#recButton').switchClass('Rec', 'notRec');
        recording = false;
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