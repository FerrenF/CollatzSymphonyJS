const message = 'Collatz Symphony Generator V.0.lol' // Try edit me

console.log(message)
//if you have another AudioContext class use that one, as some browsers have a limit
var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
// CREDIT: https://stackoverflow.com/a/29641185
function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (volume){gainNode.gain.value = volume;}
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    if (callback){oscillator.onended = callback;}
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + ((duration || 500) / 1000));
};
function collatx(n){
  let v = n[0];
  if(v === 1){
    return n;
  }
  else if((v % 2) === 1)   {
    let nw = (v * 3) + 1;    
    return collatx([nw].concat(n));
  }
   let nw = v / 2;
  return collatx([nw].concat(n));
}
function collatz(n){
  let a = [];
  a.push(n);
  return collatx(a)
}
function get_input(){
  var num = prompt("Enter a number: ");
  if(isNaN(num)){
    return get_input();
  }
  return num;
}

function do_beeps(num){
  let steps = collatz(num);
  let max = 1;
  for(step in steps){
    let i = steps[step];
    if(i>max){
      max=i;
    }
  }
  // Update header text
  let sound_step = 20000 / max;
  for(step in steps){
    
    let tone = sound_step * steps[step];
    setTimeout(function() {
    beep(300,tone,0.5);
    }, 350*step);  
    console.log("beep " + tone);
   
  }
 return steps;
}
let num = get_input()
steps = do_beeps(num);

let stepsList = "";
for( step in steps){
  stepsList = stepsList + "<li>"+steps[step]+"</li>";
}
document.querySelector('#header').innerHTML="<p>Collatz Symphony:</p><ul>" +stepsList+"</ul>";
