const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");
const game = document.querySelector(".wrapper");
const gameResult = document.querySelector(".gameResult")
const replayBtn = document.querySelector(".replay")
const resultdisplay = document.querySelector(".resultdisplay")

let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if(timeLeft <= 0) {
        game.style.display = "none"
        gameResult.style.display = "flex"
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 8 && timeLeft > 0) {
            resultdisplay.innerText = "Congratulation, You Won";
            game.style.display = "none";
            gameResult.style.display = "flex";
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `../Asset/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();


refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

const homePage = document.querySelector('.container');
const homeBtn = document.querySelector(".homeBtn");
const PlayGameBtn = document.querySelector(".playGameBTn");

function handleReplay() {
    shuffleCard();
    game.style.display = "block";
    gameResult.style.display = "none";
    homePage.style.display = "none";
}

function GoHomePage(){
    game.style.display = "none";
    gameResult.style.display = "none";
    homePage.style.display = "flex";
}

function GoGame(){
    shuffleCard();
    game.style.display = "block";
    gameResult.style.display = "none";
    homePage.style.display = "none";
}

replayBtn.addEventListener("click", handleReplay);
homeBtn.addEventListener("click", GoHomePage);
PlayGameBtn.addEventListener("click", GoGame);

let image = document.getElementById("image");
let images = ['Asset/img-1.png', 'Asset/img-2.png', 'Asset/img-3.png', 'Asset/img-4.png', 'Asset/img-5.png', 'Asset/img-6.png', 'Asset/img-7.png', 'Asset/img-8.png'];

setInterval(() => {
    let random = Math.floor(Math.random() * 8); 
    image.src = images[random];
}, 1500);