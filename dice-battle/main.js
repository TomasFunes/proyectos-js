const dice1 = document.querySelector('.dice.one');
const dice2 = document.querySelector('.dice.two');
const rollBtn = document.querySelector('.roll-button');
const rollsLog = document.querySelector('.rolls');

const playerOneHealthText = document.querySelector('.player1.health-text');
const playerOneHealthBar = document.querySelector('.player1.health-bar');

const playerTwoHealthText = document.querySelector('.player2.health-text');
const playerTwoHealthBar = document.querySelector('.player2.health-bar');

const initialHealth = 100;
let currentTurn = 1;
let playerOneHealth = initialHealth;
let playerTwoHealth = initialHealth;
playerTwoHealthText.textContent = `${playerTwoHealth} / ${initialHealth}`;
playerOneHealthText.textContent = `${playerOneHealth} / ${initialHealth}`;
console.log(playerTwoHealthBar.querySelectorAll('.gap'));

rollBtn.addEventListener('click', () => {
    numToRoman = {
        1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI'
    }

    const diceOneNum = Math.round((Math.random() * (6 - 1) + 1));
    const diceTwoNum = Math.round((Math.random() * (6 - 1) + 1).toFixed(0));
    const damage = (diceOneNum === diceTwoNum) ? 2*(diceOneNum + diceTwoNum) : diceOneNum + diceTwoNum;
    console.log(typeof damage);

    if(currentTurn === 1){
        playerTwoHealth = Math.max(0, playerTwoHealth - damage); 
        playerTwoHealthText.textContent = `${playerTwoHealth} / ${initialHealth}`;
        renderHealthBarStatus(playerTwoHealthBar, playerTwoHealth);
        currentTurn = 2;
    } else {
        playerOneHealth = Math.max(0, playerOneHealth - damage); 
        playerOneHealthText.textContent = `${playerOneHealth} / ${initialHealth}`;
        renderHealthBarStatus(playerOneHealthBar, playerOneHealth);
        currentTurn = 1;
    }


    damageText = document.createElement('p');
    damageText.textContent = `${(diceOneNum === diceTwoNum) ? 'CRIT!' : ''} Player hits for ${damage} damage!`;
    rollsLog.insertAdjacentElement('afterbegin', damageText);


    dice1.textContent = numToRoman[diceOneNum];
    dice2.textContent = numToRoman[diceTwoNum];


    if (playerOneHealth === 0 || playerTwoHealth === 0) {
        rollBtn.setAttribute('disabled', 'true');

        damageText.textContent = `Player ${(playerOneHealth === 0) ? '1' : '2'} wins!`; 
        rollsLog.insertAdjacentElement('afterbegin', damageText);

    }
})


function renderHealthBarStatus(barHealth, health) {
    let healthGap;
    if(health <= 80) {
        healthGap = barHealth.querySelector('.gap.five');
        healthGap.style.backgroundColor = 'black';
    }
    if(health <= 60) {
        healthGap = barHealth.querySelector('.gap.four');
        healthGap.style.backgroundColor = 'black';
    }
    if (health <= 40) {
        healthGap = barHealth.querySelector('.gap.three');
        healthGap.style.backgroundColor = 'black';
    }
    if (health <= 20) {
        healthGap = barHealth.querySelector('.gap.two');
        healthGap.style.backgroundColor = 'black';
    }
    if (health <= 0) {
        healthGap = barHealth.querySelector('.gap.one');
        healthGap.style.backgroundColor = 'black';
    }

}