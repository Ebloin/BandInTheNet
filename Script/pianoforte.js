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
    75: 'do_'
};

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
    
    document.body.addEventListener('keydown', function(e) {createjs.Sound.play(KEYMAP[e.keyCode]);});
    
    var aree = document.getElementsByTagName('area');
    for (i = 0; i < aree.length; i++) {
        aree[i].addEventListener('click', suona);
    }

    /*var aree = document.getElementsByTagName('area');
    for (i = 0; i < aree.length; i++) {
        aree[i].addEventListener('click', suona);
    }*/
}

var suona = function (e) {
    createjs.Sound.play(e.target.id);
}