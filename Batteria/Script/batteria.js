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

function init() {
    createjs.Sound.registerSound("Audio/hi-hat.mp3", 'hi-hat');
    createjs.Sound.registerSound("Audio/tom-tom.mp3", 'tom-tom');
    createjs.Sound.registerSound("Audio/rullante.mp3", 'rullante');
    createjs.Sound.registerSound("Audio/bass-drum.mp3", 'bass-drum');
    createjs.Sound.registerSound("Audio/tom.mp3", 'tom');
    createjs.Sound.registerSound("Audio/crash.mp3", 'crash');
    createjs.Sound.registerSound("Audio/piatto-ride.mp3", 'piatto-ride');
    createjs.Sound.registerSound("Audio/bacchette.mp3", 'bacchette');

    document.addEventListener('keydown', premotasto);
    document.addEventListener('keyup', lasciotasto);

};

var premotasto = function(e) {

    var nota = suoni[e.keyCode];
    if (!nota) return;
    createjs.Sound.play(nota);
};

var lasciotasto = function(e) {
    var nota = suoni[e.keyCode];
    if (!nota) return;
};