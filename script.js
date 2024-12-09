let userScore = 0;
let compScore = 0;

// Access all Choices
const choices = document.querySelectorAll(".choice");
// Access Html msg class For showing winner message
const msg = document.querySelector("#msg");

// Access User and Computer score class from HTML
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// computer choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

//Draw Messages
const drawGame = () => {
    msg.innerText = "Game Was Draw! Play Again.";
    msg.style.backgroundColor = "#081b31";
};

//  confetti particles and animate
const createConfetti = () => {
    const numConfetti = 1000; // Number of confetti particles
    const partyPopper = document.getElementById("party-popper");

    // confetti particles dynamically
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // confetti direction, color, and animation delay
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

// winner message and trigger the party popper
const showWinner = (userWin, userChoice, compchoice) => {
    const partyPopper = document.getElementById("party-popper");
    
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;

        // party popper effect
        partyPopper.style.display = "flex"; // Show party popper
        createConfetti(); // confetti animation

        setTimeout(() => {
            partyPopper.style.display = "none"; 
        }, 3000); 
        msg.innerText = `You Win! Your ${userChoice} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compchoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

//playGame function
const playGame = (userChoice) => {
    
    const compchoice = genCompChoice();

    // game outcome
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
