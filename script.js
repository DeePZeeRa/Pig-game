'use strict';
// select elements
let playing;
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const diceimg = document.querySelector('.dice');



const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores; 
let currentScore=0
let activePlayer=0;
let limit=0;
// 
//define array for scoress
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');

const init = function(){
      scores = [0,0]; 
      currentScore=0
      activePlayer=0;
      playing =true;
      
      score1.textContent=0;
      score2.textContent=0;
      
      currentScore1.textContent=0;
      currentScore2.textContent=0;
      diceimg.classList.add('hidden'); 
      player0.classList.remove('player--winner');
      player1.classList.remove('player--winner');
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
      btnHold.classList.remove('hidden');
      btnRoll.classList.remove('hidden');
      document.querySelector('.winner--1').classList.add('hidden');
      document.querySelector('.winner--0').classList.add('hidden');



      
}
init();

//rolling dice functionality
const switchPlayer=function(){
      document.getElementById(`current--${activePlayer}`).textContent=0;
      currentScore=0;
      activePlayer= activePlayer===0?1:0;
            // toggling the style for player 1 and 2
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click',function(){
      //1. generate a random dice roll
      if(playing){
      const dice=Math.trunc(Math.random()*6)+1;

      //2. display new dice img
      diceimg.classList.remove('hidden');
      diceimg.src = `dice-${dice}.png`; // variable.src ---> modify the html src 
      if(dice!==1){
            currentScore = currentScore+dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
           
            
      }else{
            switchPlayer();
      }
}
});

btnHold.addEventListener('click',function(){
      if(playing){
      //1. add current score to active player
      scores[activePlayer]+=currentScore;
      document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

      //2. check score>=100
      if(scores[activePlayer]>=document.querySelector('.input--1').value){
            //Finish the game 
            playing =  false;
            diceimg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            btnHold.classList.add('hidden');
            btnRoll.classList.add('hidden');
            document.querySelector(`.winner--${activePlayer}`).classList.remove('hidden');
      }
    

      //3. switch to next player
      switchPlayer();
}
});

btnNew.addEventListener('click',init);