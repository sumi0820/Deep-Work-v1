let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');
const play = document.querySelector(".play");
const paused = document.querySelector(".pause");
const stop = document.querySelector(".stop");
const song = document.querySelectorAll('[data-sound]');
const songs = document.querySelector(".song");
const beep = document.querySelector(".beep");
// const outline = document.querySelector(".moving-outline circle");
// const outlineLength = outline.getTotalLength();


function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  
  countdown = setInterval(() => {
  secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      beep.play();      
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}


function setTimer() {
   seconds = parseInt(this.dataset.time);
  console.log(seconds);
  displayTimeLeft(seconds);
}

//Timer handler: to be continued. It needs to be added "replay" as it always goes back to initial seconds value(data-time).
function startTimer() {
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', setTimer));

play.addEventListener('click', function(){
  startTimer();
  console.log(seconds);
});


paused.addEventListener('click', function(){
  clearInterval(countdown);
  songs.pause();
});

stop.addEventListener('click', function(){
  displayTimeLeft(0);
  clearInterval(countdown);
  songs.pause();
});

//Custom Form : to be continued. It needs to be wokred seperately from timer().
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});


//Song Handler
//Play song
song.forEach(song => {
  song.addEventListener("click", function(){   
  songs.src = this.getAttribute("data-sound");
  console.log(songs);
  songs.play();
   })
});

//Outline : to be continued
// function outlineAnime () {
// console.log(seconds);

  
  
  // outline.style.strokeDashoffset = outlineLength;
  // outline.style.strokeDasharray = outlineLength;
  // let progress = outlineLength - seconds * outlineLength;
  // outline.style.strokeDashoffset = progress;
// }
