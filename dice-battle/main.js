const playerOne = {
    name: "Carlos",
    health: 100,
    nameText: document.querySelector('#two .player-name'),
    healthText: document.querySelector('#two .health-text'),
    healthBar: document.querySelector('#two .health-bar')
}

const playerTwo = {
    name: "Tomas",
    health: 100,
    nameText: document.querySelector('#one .player-name'),
    healthText: document.querySelector('#one .health-text'),
    healthBar: document.querySelector('#one .health-bar'),
}


let currentTurn = 1;
const rollBtn = document.querySelector('.roll-button');


rollBtn.addEventListener('click', () => {
    const attacker = currentTurn == 1 ? playerOne : playerTwo;
    const defender = currentTurn == 1 ? playerTwo : playerOne;
    
    const valueOne = Math.ceil(Math.random() * 6);
    const valueTwo = Math.ceil(Math.random() * 6);
    
    const critical = valueOne == valueTwo;
    const damage = (critical + 1)*(valueOne + valueTwo);


    defender.health = Math.max(0, defender.health - damage);

    renderDices(valueOne, valueTwo);
    renderBoard(playerOne, playerTwo, currentTurn); 
    renderBattleLog(attacker, damage, critical);

    if (checkWinCondition()) {
        rollBtn.setAttribute('disabled', 'true');
    } else {
        currentTurn = currentTurn == 1 ? 2 : 1;
    }   
});


function renderBoard() {
    const turnIndicator = document.querySelector('.current-turn');
    turnIndicator.textContent = `${currentTurn == 1 ? playerOne.name : playerTwo.name} turn`;  

    renderPlayerStatus(playerOne)
    renderPlayerStatus(playerTwo);
}


function renderPlayerStatus(player) {
    let {name, health, nameText, healthText, healthBar} = player;
    let gap = Math.ceil(health / 20);

    healthText.textContent = `HP: ${health} / 100`;
    nameText.textContent = name;
    if (gap < 5) healthBar.children[gap].style.backgroundColor = 'black';
}


function renderBattleLog(player, damage, critical) {
    const rollsLog = document.querySelector('.rolls');
    damageText = document.createElement('p');

    
    damageText.textContent = checkWinCondition() ? 
        `${!playerOne.health ? playerTwo.name : playerOne.name} wins!`
    :
        `${critical ? 'CRIT!' : ''} ${player.name} hits for ${damage} damage!`;


    if(rollsLog.children.length == 10) rollsLog.removeChild(rollsLog.children[9]);
    rollsLog.insertAdjacentElement('afterbegin', damageText);
}



function renderDices(valueOne, valueTwo) {
    const nums = ['1', '2', '3', '4', '5', '6'];
    const dice1 = document.querySelector('.dice.one');
    const dice2 = document.querySelector('.dice.two');

    dice1.textContent = nums[valueOne - 1];
    dice2.textContent = nums[valueTwo - 1];
}


function checkWinCondition() {
    return playerOne.health == 0 || playerTwo.health == 0;
}


renderBoard(playerOne, playerTwo, currentTurn);  