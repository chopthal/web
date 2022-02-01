'use strict;'

const timeLimit = 30; // [sec]
const carrotNumbers = 20;
let remainCarrots = carrotNumbers;
const bugNumbers = 20;
const playBtn = document.querySelector('.menu__btn');
const clock = document.querySelector('.menu__clock');
const elements = document.querySelector('.main__elements');
const btnIcon = document.querySelector('#btn__icon');
const scoreBoard = document.querySelector('.menu__carrots');
const losePanel = document.querySelector('.main__lose');
const retryBtn = document.querySelector('.lose__btn');
let timerClock = new Object;

const soundAlert = new Audio('./sound/alert.wav');
const soundBg = new Audio('./sound/bg.mp3');
const soundBug = new Audio('./sound/bug_pull.mp3');
const soundCarrot = new Audio('./sound/carrot_pull.mp3');
const soundWin = new Audio('./sound/game_win.mp3');

playBtn.addEventListener('click', (event) => {
  startGame(event);
})

retryBtn.addEventListener('click', (event)=>{
  startGame(event);
  losePanel.classList.add('hidden');
  playBtn.classList.remove('hidden');
})

function renewTime(startMoment) {
  const remainTimeFloat = timeLimit - (Date.now() - startMoment)/1000;
  const remainTime = Math.ceil(remainTimeFloat);
  stringMmss = sec2mmss(remainTime);
  clock.innerHTML = stringMmss;
  if(remainTime == 0){
    stopGame()
    return;
  }
}

function sec2mmss(sec){
  min = Math.floor(sec/60);
  secRemain = sec - min*60;
  return `${min.toString().padStart(2, '0')}:${secRemain.toString().padStart(2, '0')}`
}

function generateElements(){
  elements.innerHTML = '';

  for(i=0;i<carrotNumbers;i++){
    topPos = Math.random()*40 + 50;
    leftPos = Math.random()*80 + 10;
    carrot = document.createElement('img');
    carrot.className = 'elements__carrot';
    carrot.src = './img/carrot.png';
    carrot.style.top = `${topPos}%`;
    carrot.style.left = `${leftPos}%`;
    carrot.style.width = '7vw';
    carrot.style.height = '12vh';
    carrot.style.position = 'fixed';
    carrot.style.zindex = '2';
    carrot.addEventListener('click', (event) => {
      carrotClicked(event);
    })
    elements.appendChild(carrot);
  }

  for(i=0;i<bugNumbers;i++){
    topPos = Math.random()*40 + 50;
    leftPos = Math.random()*80 + 10;
    bug = document.createElement('img');
    bug.className = 'elements__bug';
    bug.src = './img/bug.png';
    bug.style.top = `${topPos}%`;
    bug.style.left = `${leftPos}%`;
    bug.style.width = '5vw';
    bug.style.height = '10vh';
    bug.style.position = 'fixed';
    bug.style.zindex = '3';
    bug.addEventListener('click', ()=>{bugClicked()})
    elements.appendChild(bug);
  }
}

// function onClickItem(event){
//   if(playBtn.id == 'play' || !losePanel.classList.contains('hidden')){
//     return;
//   }

// }

function carrotClicked(event) {
  if(playBtn.id == 'play' || !losePanel.classList.contains('hidden')){
    return;
  }
  event.path[1].removeChild(event.path[0]);
  remainCarrots = remainCarrots - 1;
  scoreBoard.innerHTML = remainCarrots;
  playSound(soundCarrot);

  if(remainCarrots == 0){
    clearInterval(timerClock)
    startGame(event);
  }
}

function bugClicked() {
  if(playBtn.id == 'play' || !losePanel.classList.contains('hidden')){
    return;
  }
  playSound(soundBug);
  stopGame();
}

function startGame(event){
  const startMoment = Date.now();
  if(event.currentTarget.id == 'stop'){
    clearInterval(timerClock);
    playBtn.id = 'play';
    btnIcon.className = 'fas fa-play';
    stopGame()
    return;
  }
  timerClock = setInterval(renewTime, 100, startMoment);

  playSound(soundBg);
  
  playBtn.id = 'stop';
  btnIcon.className = 'fas fa-stop';
  
  remainCarrots = carrotNumbers;
  scoreBoard.innerHTML = remainCarrots;
  generateElements();
}

function stopGame(){
  losePanel.classList.remove('hidden');
  playBtn.classList.add('hidden');
  clearInterval(timerClock);
  soundBg.pause();
  playSound(soundAlert);
}

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}