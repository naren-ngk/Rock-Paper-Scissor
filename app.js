const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorBtn = document.getElementById('scissorBtn');
const playerScore = document.getElementById('playerScore');
const resetBtn = document.getElementById('resetBtn');
const computerScore = document.getElementById('computerScore');
const gameStatus = document.getElementById('gameStatus');
const playerImage = document.getElementById('playerImage');
const computerImage = document.getElementById('computerImage');
const selectWinningScore = document.getElementById('selectInput');

const buttons = [rockBtn, paperBtn, scissorBtn, resetBtn];
const images = ['imgs/1.png', 'imgs/2.png', 'imgs/3.png']
const losingMsg = 'You <span class="text-danger">lost</span> this round!'
const winningMsg = 'You <span class="text-success">win</span> this round!'

let gamePoints = 5;
let playerScorePoint = 0;
let computerScorePoint = 0;

function gameOver() {
    buttons.forEach((button) => {
        if (button.value !== 'reset') {
            button.disabled = true;
        }
    });
    if (computerScorePoint === gamePoints) {
        gameStatus.innerHTML = '<span class="text-danger">Computer is the winner!</span>';
        gameStatus.classList.add('end')
        computerScore.classList.add('text-success');
        playerScore.classList.add('text-danger');
    }
    else {
        gameStatus.innerHTML = '<span class="text-success">You are the winner!</span>';
        gameStatus.classList.add('end')
        playerScore.classList.add('text-success');
        computerScore.classList.add('text-danger');
    }
}

function reset() {
    playerImage.setAttribute('src', images[0]);
    computerImage.setAttribute('src', images[0]);
    playerScorePoint = computerScorePoint = 0;
    gameStatus.textContent = 'Start the Game!';
    playerScore.textContent = computerScore.textContent = 0;
    computerScore.classList.remove('text-success', 'text-danger');
    playerScore.classList.remove('text-success', 'text-danger');
    buttons.forEach((button)=>{
        button.disabled = false;
    })
}

function gameStart() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.value === 'reset') { reset() }

            let randomNumber = Math.floor(Math.random() * 3);
            if (button.value === buttons[randomNumber].value) {
                gameStatus.textContent = 'Its a Tie!';
                playerImage.setAttribute('src', images[randomNumber]);
                computerImage.setAttribute('src', images[randomNumber]);
            }
            else {
                if (button.value === 'rock' && buttons[randomNumber].value === 'paper') {
                    computerScorePoint++;
                    gameStatus.innerHTML = losingMsg;
                    computerScore.textContent = computerScorePoint;
                    playerImage.setAttribute('src', images[0]);
                    computerImage.setAttribute('src', images[randomNumber]);
                }
                else if (button.value === 'rock' && buttons[randomNumber].value === 'scissor') {
                    playerScorePoint++;
                    gameStatus.innerHTML = winningMsg;
                    playerScore.textContent = playerScorePoint;
                    playerImage.setAttribute('src', images[0]);
                    computerImage.setAttribute('src', images[randomNumber]);
                }
                else if (button.value === 'paper' && buttons[randomNumber].value === 'rock') {
                    playerScorePoint++;
                    gameStatus.innerHTML = winningMsg;
                    playerScore.textContent = playerScorePoint;
                    playerImage.setAttribute('src', images[1]);
                    computerImage.setAttribute('src', images[randomNumber]);
                }
                else if (button.value === 'paper' && buttons[randomNumber].value === 'scissor') {
                    computerScorePoint++;
                    gameStatus.innerHTML = losingMsg;
                    computerScore.textContent = computerScorePoint;
                    playerImage.setAttribute('src', images[1]);
                    computerImage.setAttribute('src', images[randomNumber]);
                }
                else if (button.value === 'scissor' && buttons[randomNumber].value === 'rock') {
                    computerScorePoint++;
                    gameStatus.innerHTML = losingMsg;
                    computerScore.textContent = computerScorePoint;
                    playerImage.setAttribute('src', images[2]);
                    computerImage.setAttribute('src', images[randomNumber]);
                }
                else if (button.value === 'scissor' && buttons[randomNumber].value === 'paper') {
                    playerScorePoint++;
                    gameStatus.innerHTML = winningMsg;
                    playerScore.textContent = playerScorePoint;
                    playerImage.setAttribute('src', images[2]);
                    computerImage.setAttribute('src', images[randomNumber]);
                }
            }

            if (playerScorePoint === gamePoints || computerScorePoint === gamePoints) {
                gameOver();
            }
        })
    })
    selectWinningScore.addEventListener('change', () => {
        gamePoints = parseInt(selectWinningScore.value);
        reset();
    });
}

gameStart();