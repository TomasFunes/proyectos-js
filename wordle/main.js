const gameState = {
    activeLetter: document.querySelector('.letter'),
    activeGuess: document.querySelector('.guess'),
    guesses: 0,
    word: getWord(),
}


function start() {
    const keyboard = document.querySelectorAll('.key');

    for(const letter of gameState.activeGuess.children) {
        letter.addEventListener("click", handleLetterClick);
    }

    for (const key of keyboard) {
        key.addEventListener("click", event => {
            if (event.target.textContent == "Enviar") {
                checkGuess();
            } else if (event.target.textContent == "<=") {
                if(gameState.activeLetter.textContent == "") {
                    const prevLetter = gameState.activeLetter.previousElementSibling;
                    setActiveLetter(prevLetter);
                }
                gameState.activeLetter.textContent = "";

            } else {
                const nextLetter = gameState.activeLetter.nextElementSibling;
                gameState.activeLetter.textContent = key.textContent;
                setActiveLetter(nextLetter);
            }
        })
    }
}



function handleLetterClick(event) {
    setActiveLetter(event.currentTarget);
}

function setActiveLetter(letter) {
    gameState.activeLetter.classList.remove('active-letter');
    if(letter) {
        letter.classList.add('active-letter');
        gameState.activeLetter = letter;
    }
}

async function getWord() {
    const msg = document.createElement('p');
    const response = await fetch('word.json');
    const words = await response.json();
    
    const word = words[Math.floor(Math.random() * words.length)];
    return word;
}

async function checkGuess() {
    const letters = gameState.activeGuess.children;
    let word = await gameState.word;
    word = word.toUpperCase();
  
    for (let n = 0; n < letters.length; n++) {
        if (letters[n].textContent == word[n]){
            letters[n].style.backgroundColor = "green";
        } else if (word.includes(letters[n].textContent)) {
            letters[n].style.backgroundColor = "#bfb41b";
        } else {
            letters[n].style.backgroundColor = "grey";
        }
    }
    checkWinCondition(letters);
}

async function checkWinCondition(letters) {

    for (const letter of letters) {
        if (letter.style.backgroundColor !== "green") {
            gameState.guesses++;
            if(gameState.guesses == 6) {
                alert(`Perdiste. La palabra es: ${await gameState.word}`);
            } else {
                setNextGuess();
                setActiveLetter(gameState.activeGuess.firstElementChild);

            }
            return;
        }
    }
    alert(`Correcto! La palabra es: ${await gameState.word}`);
}
    

function setNextGuess() {
    let currentGuess = gameState.activeGuess;
    
    for(const letter of currentGuess.children) {
        letter.removeEventListener("click", handleLetterClick);
    }

    currentGuess = currentGuess.nextElementSibling;

    for(const letter of currentGuess.children) {
        letter.addEventListener("click", handleLetterClick);
    }

    gameState.activeGuess = currentGuess;
}

start();