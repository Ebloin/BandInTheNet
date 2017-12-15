var KEYMAP = {
    65: 'do',
    87: 'do#',
    83: 're',
    69: 're#',
    68: 'mi',
    70: 'fa',
    84: 'fa#',
    71: 'sol',
    89: 'sol#',
    90: 'sol#',
    72: 'la',
    85: 'la#',
    74: 'si',
    75: 'do_',
    79: 'C#4',
    76: 'D4',
    80: 'D#4',
    59: 'E4',
    186: 'E4',
    222: 'F4',
    221: 'F#4',
    220: 'G4'
};

var recording = false;
var noteRegistrate= [];

function init() {
    createjs.Sound.registerSound("Audio/note/c1.mp3", 'do');
    createjs.Sound.registerSound("Audio/note/c1s.mp3", 'do#');
    createjs.Sound.registerSound("Audio/note/d1.mp3", 're');
    createjs.Sound.registerSound("Audio/note/d1s.mp3", 're#');
    createjs.Sound.registerSound("Audio/note/e1.mp3", 'mi');
    createjs.Sound.registerSound("Audio/note/f1.mp3", 'fa');
    createjs.Sound.registerSound("Audio/note/f1s.mp3", 'fa#');
    createjs.Sound.registerSound("Audio/note/g1.mp3", 'sol');
    createjs.Sound.registerSound("Audio/note/g1s.mp3", 'sol#');
    createjs.Sound.registerSound("Audio/note/a1.mp3", 'la');
    createjs.Sound.registerSound("Audio/note/a1s.mp3", 'la#');
    createjs.Sound.registerSound("Audio/note/b1.mp3", 'si');
    createjs.Sound.registerSound("Audio/note/c1.mp3", 'do_');

    document.addEventListener('keydown', premotasto);
    document.addEventListener('keyup', lasciotasto);

    var prove = document.getElementsByClassName('key');
    for (i = 0; i < prove.length; i++) {
        prove[i].addEventListener('mousedown', mousedown);
        prove[i].addEventListener('mouseup', mouseup);
    }

    document.getElementById('registra').addEventListener('click', registra);
    document.getElementById('stop').addEventListener('click', stopRegistra);
    document.getElementById('play').addEventListener('click', playNote);
}

var premotasto = function(e) {
    //Premo un tasto per suonare
    var nota = KEYMAP[e.keyCode];
    if (!nota) return; //Se il tasto non è mappato
    document.getElementById(nota).classList.add('active');
    if (recording) {
        noteRegistrate.push(nota);
        document.getElementById('noteregistrate').innerHTML = noteRegistrate;
    }
    createjs.Sound.play(nota);
}

var lasciotasto = function(e) {
    //Lascio tasto per smettere di suonare
    var nota = KEYMAP[e.keyCode];
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
    recording = true
    //INSERIRE CONTROLLO SE VERAMENTE UOLE CANCELLARE
    noteRegistrate = []
};

var stopRegistra= function() {recording = false};

var playNote= function(i) {
    for(i=0; i<noteRegistrate.length; i++) {
        sleep(500);
        suona(noteRegistrate[i]);
    }
}

var suona= function(nota) {
    createjs.Sound.play(nota);
}

function sleep(millis) {
    var date= new Date();
    var curDate= null;
    do {curDate= new Date();}
    while(curDate-date < millis);
}