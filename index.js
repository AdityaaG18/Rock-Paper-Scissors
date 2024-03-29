if(!localStorage.getItem('my_score') || !localStorage.getItem('computer_score')){
  localStorage.setItem('my_score',0)
  localStorage.setItem('computer_score',0)
}
else{
  localStorage.setItem('my_score',localStorage.getItem('my_score'))
  localStorage.setItem('computer_score',localStorage.getItem('computer_score'))
}
const buttons = document.querySelectorAll('.pick');
const myScoreEl = localStorage.getItem('my_score');
const computerScoreEl = localStorage.getItem('computer_score');
const myScoreE2 = document.getElementById('my_score');
const computerScoreE2 = document.getElementById('computer_score');
myScoreE2.innerHTML = localStorage.getItem('my_score');
computerScoreE2.innerHTML = localStorage.getItem('computer_score');
const choices = ['paper', 'scissors', 'rock'];
const main = document.getElementById('main');
const selection = document.getElementById('selection');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('win');
const user_select = document.getElementById('user_select');
const computer_select = document.getElementById('computer_select');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const rulesModal = document.getElementById('modal');
const blackBack = document.querySelector('.rules-container');
const next = document.getElementById('Next');

//Initialize scores & user choice
let myScore = myScoreEl;
let computerScore = computerScoreEl;
let userChoice = undefined;


buttons.forEach(button => {
  button.addEventListener('click', ()=>{
    userChoice = button.getAttribute('data-choice');
    main.style.display = 'none';
    selection.style.display = 'grid';
    checkWinner();
  })
});

//Play again button
resetBtn.addEventListener('click',()=>{
  main.style.display = 'flex';
  selection.style.display = 'none';
});

//Show game's rules
openBtn.addEventListener('click',()=>{
  rulesModal.style.display = 'flex';
  blackBack.style.display='flex';
});

//Hide game's rules
closeBtn.addEventListener('click',()=>{
  rulesModal.style.display = 'none';
  blackBack.style.display='none';
});

// Function to check who wins
function checkWinner(){
    // store computer choice
    const computerChoice = pickRandomChoice();
    //Update selection (image) of user & computer
    updateSelection(user_select, userChoice);
    updateSelection(computer_select, computerChoice);
  
    if(userChoice === 'paper' && computerChoice==='rock'
    || userChoice === 'rock' && computerChoice === 'scissors'
    || userChoice === 'scissors' && computerChoice === 'paper'){
      //User won
      myScoreUpdate();
      result.innerText= "win";
      next.style.display='block';


    }else if (userChoice === computerChoice){
        //Draw
        result.innerText= "draw";
        next.style.display='none';
      }else{
      //Computer won
      result.innerText= "lost";
      next.style.display='none';
      computerScoreUpdate();
    }
  }
//Update user score
function myScoreUpdate(){
  myScore++;
  myScoreE2.innerText = myScore;
  // document.getElementById("my_score").innerHTML = localStorage.getItem('my_score');
  localStorage.setItem('my_score',myScore)
}
//Update computer score
function computerScoreUpdate(){
  computerScore++;
  computerScoreE2.innerText = computerScore;
  // document.getElementById("computer_score").innerHTML = localStorage.getItem('computer_score');
  localStorage.setItem('computer_score',computerScore)
}
// Function to pick computer choice
function pickRandomChoice(){
  return choices[Math.floor(Math.random()*choices.length)];
}
//Update user selection
function updateSelection(selectionEl, choice){
  selectionEl.classList.remove('btn-paper');
  selectionEl.classList.remove('btn-scissors');
  selectionEl.classList.remove('btn-rock');
  //update selection image
  const img = selectionEl.querySelector('img');
  selectionEl.classList.add('btn-'+choice);
  img.src='images/'+choice+'.png';
  img.alt = choice;
}