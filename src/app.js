const message = 'Collatz Symphony Generator V.0.lol'
console.log(message)

var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

//This function is similar to the beep function in C++/Python. It produces a sine wave by default for duration at frequency.
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

//Collatz Conjecture recursion function.
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

//Helper function to wrap our variable in an array and feed it into the collatx function
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

//Magic
function do_beeps(num){
  let steps = collatz(num);
  let max = 1;

  //Find our max first. We need that to scale our steps.
  for(step in steps){
    let i = steps[step];
    if(i>max){
      max=i;
    }
  }

  // The human range of hearing is about 20-20000 hz. We are going to divide that total range into steps based on our max value.
  let sound_step = (20000-20) / max;
  for(step in steps){
    
    let tone = sound_step * steps[step];

    // For each of these steps, we will set a timer to play our sound at the specified frequency, delayed so that they do not play on top of eachother. Hopefully, they all play.
    setTimeout(function() {
    beep(300,tone,0.5);
    }, 350*step);  
  }
  console.log("Symphony prepared. Steps created: " + steps.length);
 return steps;
}
let num = get_input()
steps = do_beeps(num);


// You know what, the site I built this on didn't display any output nicely, so this is how it ended up before I moved on: as a list. Implemented somewhere else it would probably look fine.
let stepsList = "";
for( step in steps){
  stepsList = stepsList + "<li>"+steps[step]+"</li>";
}
document.querySelector('#header').innerHTML="<div><p>Collatz Symphony:</p><ul>" +stepsList+"</ul></div>";
