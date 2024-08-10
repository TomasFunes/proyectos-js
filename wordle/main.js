const gameState = {
    activeLetter: document.querySelector('.letter'),
    activeGuess: document.querySelector('.guess'),
    guesses: 0,
    word: getWord(),
}

function addLetterEvents(guess) {
    for(const letter of guess.children) {
        letter.addEventListener("click", handleLetterClick);
    }
}


function start() {
    const keyboard = document.querySelectorAll('.key');

    addLetterEvents(gameState.activeGuess);

    for (const key of keyboard) {
        key.addEventListener("click", handleKeyClick);
    }
}

function end() {
    const keyboard = document.querySelectorAll('.key');

    for (const key of keyboard) {
        key.removeEventListener("click", handleKeyClick);
    }
}


function mapKeyboard (key) {
    if (key.id == "send") {
        checkGuess();
    } else if (key.id == "backspace") {
        if(gameState.activeLetter.textContent == "") {
            const prevLetter = gameState.activeLetter.previousElementSibling;
            setActiveLetter(prevLetter);
        }
        gameState.activeLetter.textContent = "";

    } else {
        gameState.activeLetter.textContent = key.textContent;
        setActiveLetter(gameState.activeLetter.nextElementSibling);
    }
}


function handleKeyClick(event) {
    mapKeyboard(event.currentTarget);
}


function handleLetterClick(event) {
    setActiveLetter(event.currentTarget);
}

function setActiveLetter(letter) {
    if(letter) {
        gameState.activeLetter.classList.remove('active-letter');
        letter.classList.add('active-letter');
        gameState.activeLetter = letter;
    }
}

async function wordExists(word) {
    const response = await fetch('word.json');
    const dictionary = await response.json();

    return dictionary.includes(word.toLowerCase());
}

async function getWord() {
    const response = await fetch('word.json');
    const words = await response.json();
    
    const word = words[Math.floor(Math.random() * words.length)];
    return word;
}

async function checkGuess() {
    const letters = gameState.activeGuess.children;
    let stringWord = "";

    for (const letter of letters) {
        stringWord += letter.textContent;
    }

    const exists = await wordExists(stringWord);
    if (!exists) {
        alert("La palabra no existe (O por lo menos no en el contexto de este juego)");
        return;
    }

    let word = await gameState.word;
    word = word.toUpperCase();
  
    for (let n = 0; n < letters.length; n++) {
        if (letters[n].textContent == word[n]) letters[n].style.backgroundColor = "green";
        else if (word.includes(letters[n].textContent)) letters[n].style.backgroundColor = "#bfb41b";
        else letters[n].style.backgroundColor = "grey";
        
    }
    checkWinCondition(letters);
}

async function checkWinCondition(letters) {

    for (const letter of letters) {
        if (letter.style.backgroundColor !== "green") {
            gameState.guesses++;
            setNextGuess();
            
            if(gameState.guesses == 6) alert(`Perdiste. La palabra es: ${await gameState.word}`);
            return;
        }
    }
    alert(`Correcto! La palabra es: ${await gameState.word}`);
    setActiveLetter(null);

}
    

function setNextGuess() {
    let currentGuess = gameState.activeGuess;
    
    for(const letter of currentGuess.children) {
        letter.removeEventListener("click", handleLetterClick);
    }

    currentGuess = currentGuess.nextElementSibling;

    if (currentGuess) {
        for(const letter of currentGuess.children) {
            letter.addEventListener("click", handleLetterClick);
        }
        
        gameState.activeGuess = currentGuess;
        setActiveLetter(currentGuess.firstElementChild);
    } else {
        end();
    }

}

start();