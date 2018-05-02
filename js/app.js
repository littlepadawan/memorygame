/* ***** 1. Create a list that holds all of your cards ***** */
// An array with elements consisting of class names of cards to create
const cards = [
    "fa fa-diamond",
    "fa fa-rocket",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cloud",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-rocket",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cloud",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

/* ***** 2. Display the cards on the page ***** */

/* - 2.1. Shuffle the list of cards using the provided "shuffle" method below (3) */
// Shuffles the list of cards when the window is loaded, using function "shuffle" */
window.onload = shuffle(cards);

/* - 2.2. Loop through each card and create its HTML */
// Variable the loop will fill with cards (<li>'s
let cardsHtml= "";

// For loop that loops through the list of cards (cards) and creates a string of what will the card's HTML.
// Adds the string to cardsHtml
for (let i = 0; i < cards.length; i++) {
    cardsHtml += "<li class=\"card\"><i class=\"" + cards[i] + "\"></i></li>";
}

/* 2.3. Add each card's HTML to the page */
// Variable that access <ul> with class "deck" from index.html
const deck = document.getElementsByClassName("deck")[0];

// Property that pushes the content of cardsHtml into the <ul> with class "deck" on the page
deck.innerHTML = cardsHtml;


// 3. Shuffle function from http://stackoverflow.com/a/2450976
// Is called when window loads
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/* ***** 4. Set up the event listener for a card. **** */
// Variable accessing cards from index.html (elements with class "card")
const card = document.getElementsByClassName("card");

// Empty array for holding all the cards
const cardsArray = [...card];

// For loop that adds event listener for click to each card and calls function mainFunction when a card is clicked
for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener("click", mainFunction);
}


// If a card is clicked:

// Function that displays a card's symbol by adding classes "open" and "show". Sets maximum of opened cards to 2 and adds class "disabled". Runs when a card is clicked.

function mainFunction(event) {
    // 4.1. Display the card's symbol (put this functionality in another function that you call from this one)
    if (openedCards.length <= 2) {
        this.classList.add("open");
        this.classList.add("show");
        this.classList.add("disabled");
    }

    // 4.2. Add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    // Variable that access the icon on the clicked card in index.html
    let clickedCard = event.target.firstChild.classList[1];

    // Property that pushes clicked card into list of opened cards (openedCards) (console.log so you can see what happens)
    openedCards.push(clickedCard);
    console.log(openedCards);

    //start timer on first move
    if (openedCards.length == 1 && moves == 0) {
        seconds == 0;
        minutes == 0;
        startTimer();
    }

    // 4.3.If the list already has another card, check to see if the two cards match (checkMatch)
    if (openedCards.length === 2) {
        disableCards();
        checkMatch();
        moveCounter()
        setTimeout(function() {
            checkWin();
        }, 1500);
        starRating();
    }

}

// Function that loops through all of the cards and adds class "disabled" to all of them, preventing player from opening more than 2 cards
// Gets called in mainFunction
function disableCards() {
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].classList.add("disabled");
    }
}

// List that will hold opened cards
let openedCards = [];

// Function that checks if opened cards match. And removes class "disabled" from all cards, so you can continue the game
// Gets called in mainFunction
function checkMatch() {
    if (openedCards[0] === openedCards[1]) {
        // 4.3.1. If the cards do match, lock the cards in the open position
        // Class "match" locks the cards in the open position
        // Pop attribute removes cards from the "openedCards" array
        let card1 = document.querySelectorAll("." + openedCards[0], ".open").forEach(function (openCard) {
            openCard.parentElement.classList.add("match");
            openCard.parentElement.classList.remove("open");
            openCard.parentElement.classList.remove("show");
        });

        let card2 = document.querySelectorAll("." + openedCards[1], ".open").forEach(function (openCard) {
            openCard.parentElement.classList.add("match");
            openCard.parentElement.classList.remove("open");
            openCard.parentElement.classList.remove("show");
        });

        openedCards.pop();
        openedCards.pop();

    } else {
        // 4.3.2. If the cards do not match, remove the cards from the list and hide the card's symbol 
        // Remove classes "open" and "show" hides the cards symbols
        // Pop attribute removes cards from the "openedCards" array
        // setTimeout delays execution of code below, so the player gets some time to se the cards they opened
        setTimeout(function() {
            let card1 = document.querySelectorAll("." + openedCards[0], ".open").forEach(function (openCard) {
                openCard.parentElement.classList.remove("open");
                openCard.parentElement.classList.remove("show");
            });

            let card2 = document.querySelectorAll("." + openedCards[1], ".open").forEach(function (openCard) {
                openCard.parentElement.classList.remove("open");
                openCard.parentElement.classList.remove("show");
            });

            openedCards.pop();
            openedCards.pop();
        }, 1000);
    }
    setTimeout(function() {
        removeDisabledClass();
    }, 1000);
}


// Function for removing class "disabled", so the cards become clickable again
// Gets called in checkMatch
function removeDisabledClass() {
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].classList.remove("disabled");
    }
}


// 4.3.3.Increment the move counter and display it on the page
// Variable accessing <div> in index.html with class "moves"
let movesHtml = document.getElementsByClassName("moves")[0];

// Variable storing number of moves the player has done
let moves = 0;

// Function that increments the number of moves by every pair of opened cards (1 move = player opens 2 cards)
function moveCounter() {
    moves++
    if (moves === 1) {
        movesHtml.innerHTML = moves + " move";
    } else {
        movesHtml.innerHTML = moves + " moves";
    }
}

// Function that resets number of moves to 0, gets called in "restartGame"
function resetMoves() {
    moves = 0;
    movesHtml.innerHTML = moves + " moves";
}



// 4.3.4. If all cards have matched, display a message with the final score
// Variable that access all elements with the class "match" from index.html, an array
let matchedCards = document.getElementsByClassName("match");

// Function that checks when player wins. If ""matchedCards" contains 16 cards it displays a winner message
function checkWin() {
    if (matchedCards.length === 16) {
        clearInterval(interval);
        winnerMessage();
    }
}


// ***** 5. Restarting game *****
// Variable accessing the restart icon from index.html
const restartButton = document.getElementsByClassName("fa fa-repeat");

// Adding an event listener for "click" to the restart icon and calling the "restartGame" if the icon is clicked
restartButton[0].addEventListener("click", restartGame);

// Function that restarts the game
function restartGame(event) {
    // Loop that removes class "match" from cards that has been assigned that
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].classList.remove("match");
    }
    resetMoves();
    resetTimer();
    resetStars();
}


// ***** 6. Star rating *****
// Variable accessing elements with class "show-stae", an array
const stars = document.getElementsByClassName("fa-star");
// Function controlling star rating
function starRating() {
    // Statement that
    if (moves == 11) {
        stars[2].classList.add("hide-star");
    } else if (moves == 16) {
        stars[1].classList.add("hide-star");
    } else if (moves == 21) {
        stars[0].classList.add("hide-star");
    }
}

// Function that will reset the number of stars - remove class "hide-star"
function resetStars() {
    for(let i = 0; i < stars.length; i++) {
        stars[i].classList.remove("hide-star")
    }
}
//}

// ***** Timer *****
// Variables holding the value of seconds and minutes
let seconds = 0;
let minutes = 0;

// Variable accessing element from index.html with class "timer"
let time = document.querySelector(".time");

// Variable storing a function inside "startTimer"
let interval;

// Function starting the timer, gets called in "mainFunction"
function startTimer() {
    interval = setInterval(function() {
        time.innerHTML = minutes + " : " + seconds;
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

// Function that resets the timer, gets called in "restartGame"
function resetTimer() {
    seconds = 0;
    minutes = 0;
    time.innerHTML = minutes + " : " + seconds;
    clearInterval(interval);
}

// ***** 8. Modal - winner message *****
// Variable accessing the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Variable accessing span with id "totalMoves"
let totalMoves = document.getElementsByClassName("totalMoves")[0];

// Variable accessing span with id "totalTime"
let totalTime = document.getElementsByClassName("totalTime")[0];

// Variable accessing span with id "totalStars"
let totalStars = document.getElementsByClassName("totalStars")[0];

// Winner message
function winnerMessage() {
    modal.style.display = "block";

    // Printing number of moves
    totalMoves.innerHTML = moves;

    // Printing time
    if (minutes == 1) {
        totalTime.innerHTML = minutes + " minute and " + seconds + " seconds";
    } else {
        totalTime.innerHTML = minutes + " minutes and " + seconds + " seconds";
    }

    // Printing star rating
    if (document.getElementsByClassName("hide-star").length == 3) {
        totalStars.innerHTML = "0 stars";
    } else if (document.getElementsByClassName("hide-star").length == 2) {
        totalStars.innerHTML = "1 star";
    } else if (document.getElementsByClassName("hide-star").length == 1) {
        totalStars.innerHTML = "2 stars";
    } else if (document.getElementsByClassName("hide-star").length == 0) {
        totalStars.innerHTML = "3 stars";
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//When the user clicks yes button, restart game
const button = document.getElementsByClassName("btn-play-again")[0];

button.onclick = function () {
    modal.style.display = "none";
    restartGame();
}