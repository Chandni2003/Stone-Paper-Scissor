let userScore = 0;
let compScore = 0;

// Access all Choices
const choices = document.querySelectorAll(".choice");
// Access Html msg class For showing winner message
const msg = document.querySelector("#msg");

// Access User and Computer score class from HTML
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Access Audio elements
const partySound = document.getElementById("party-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

// computer choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Play party sound
const playPartySound = () => {
    partySound.currentTime = 0; // Reset the sound to start from the beginning
    partySound.play(); // This will play the sound
};

// Play lose sound
const playLoseSound = () => {
    loseSound.currentTime = 0;
    loseSound.play();
};

// Play the draw sound
const playDrawSound = () => {
    drawSound.currentTime = 0;
    drawSound.play();
};

// Draw Messages
const drawGame = () => {
    msg.innerText = "Game Was Draw! Play Again.";
    msg.style.backgroundColor = "#081b31";
    playDrawSound(); // Play the draw sound
};

// Confetti particles and animate
const createConfetti = () => {
    const numConfetti = 150; // Reduce the number of confetti particles
    const partyPopper = document.getElementById("party-popper");

    // Clear existing confetti particles
    partyPopper.innerHTML = '';

    // Confetti particles dynamically
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const xPos = Math.random() * 100 + "vw";
        const yPos = Math.random() * 100 + "vh";
        const size = Math.random() * 10 + "px";
        const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        confetti.style.left = xPos;
        confetti.style.top = yPos;
        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.backgroundColor = color;
        confetti.style.animationDelay = Math.random() * 2 + "s";

        partyPopper.appendChild(confetti);
    }
};

// Winner message and trigger the party popper
const showWinner = (userWin, userChoice, compchoice) => {
    const partyPopper = document.getElementById("party-popper");

    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;

        // Party popper effect
        partyPopper.style.display = "flex"; // Show party popper
        createConfetti(); // Confetti animation
        playPartySound(); // Play the party sound

        setTimeout(() => {
            partyPopper.style.display = "none"; 
        }, 3000); 

        msg.innerText = `You Win! Your ${userChoice} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        playLoseSound(); // Play lose sound
        msg.innerText = `You Lose! ${compchoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

// PlayGame function
const playGame = (userChoice) => {
    const compchoice = genCompChoice();

    // Game outcome
    if (userChoice === compchoice) {
        drawGame(); 
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compchoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compchoice === "scissor" ? false : true;
        } else if (userChoice === "scissor") {
            userWin = compchoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compchoice); 
    }
};

// For user choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
