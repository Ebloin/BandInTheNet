console.clear();
var synth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();

var KEYMAP = {
  65: 'C3',
  87: 'C#3',
  83: 'D3',
  69: 'D#3',
  68: 'E3',
  70: 'F3',
  84: 'F#3',
  71: 'G3',
  89: 'G#3',
  90: 'G#3',
  72: 'A3',
  85: 'A#3',
  74: 'B3',
  75: 'C4',
  79: 'C#4',
  76: 'D4',
  80: 'D#4',
  59: 'E4',
  186: 'E4',
  222: 'F4',
  221: 'F#4',
  220: 'G4'
};

var noteLength = '2n';
var keysWrapper = document.querySelector('.keys');
var keys = keysWrapper.querySelectorAll('.key');
var pointer = {};
var key = {};
for (var k in KEYMAP) {
  key[k] = {};
}
document.addEventListener('keydown', function (e) {
  var note = KEYMAP[e.which];
  if (!note) return;
  if (!key[e.which].down) {
    var activeKey = keysWrapper.querySelector('[data-note="' + note + '"]');
    activeKey.classList.add('active');
    key[e.which].down = true;
  }
});
document.addEventListener('keyup', function (e) {
  var note = KEYMAP[e.which];
  if (!note) return;
  var activeKey = keysWrapper.querySelector('[data-note="' + note + '"]');
  activeKey.classList.remove('active');
  key[e.which].down = false;
});

document.addEventListener('mouseup', function (e) {
  pointer.down = false;
});
/*
Array.from(keys).forEach(function (item) {
  item.addEventListener('mousedown', function (e) {
    var note = item.getAttribute('data-note');
    pointer.down = true;
    item.classList.add('active');
  });
  item.addEventListener('mouseenter', function (e) {
    var note = item.getAttribute('data-note');
    if (pointer.down) {
      item.classList.add('active');
    }
  });
  item.addEventListener('mouseleave', function (e) {
    var note = item.getAttribute('data-note');
    if (pointer.down) {
      item.classList.remove('active');
    }
  });
  item.addEventListener('mouseup', function (e) {
    var note = item.getAttribute('data-note');
    item.classList.remove('active');
  });
});*/