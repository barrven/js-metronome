// setup all references to UI elements
const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const meastCount = document.querySelector('.measure-count');

const click1 = new Audio('sounds/snap1.mp3');
const click2 = new Audio('sounds/snap2.mp3');

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = getTempoDesctiption();
tempoText.textContent = tempoTextString;

decreaseTempoBtn.addEventListener('click', ()=>{
    if(bpm <= 20) return; // min number
    bpm--;
    validateTempo();
    updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
    if(bpm >= 280) return; // max number
    bpm++;
    validateTempo();
    updateMetronome();
});

tempoSlider.addEventListener('input', ()=>{
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
}); 

subtractBeats.addEventListener('click', ()=>{
    if(beatsPerMeasure <= 2) return;
    beatsPerMeasure--;
    meastCount.textContent =  beatsPerMeasure;
    count = 0;
});

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) return;
    beatsPerMeasure++;
    meastCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', ()=>{
    count = 0;
    if(!isRunning){
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'Stop';
    }
    else{
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'Start';
    }
})


function updateMetronome(){
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    tempoText.textContent = getTempoDesctiption();
}

function validateTempo(){
    if(bpm <= 20 || bpm >= 280) return;
}

function getTempoDesctiption(){
    const tempos = [
        {title: 'Grave', min: 20, max: 40},
        {title: 'Largo', min: 41, max: 60},
        {title: 'Adagio', min:61, max: 76},
        {title: 'Andante', min: 77, max: 108},
        {title: 'Moderato', min: 109, max: 120},
        {title: 'Allegro', min: 121, max: 168},
        {title: 'Presto', min: 169, max: 200},
        {title: 'Prestissimo', min: 201, max: 280}
    ]

    for (let tempo of tempos){
        if(tempo.min <= parseInt(bpm) && tempo.max >= parseInt(bpm)){
            return tempo.title;
        }
    }
    return 'Error';
}

function playClick(){
    if(count === beatsPerMeasure){
        count = 0;
    }
    if(count === 0){
        click1.play();
        click1.currentTime = 0; // reset the sound's time to 0 in case it's a long sample
    }
    else{
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

//metronome.start();