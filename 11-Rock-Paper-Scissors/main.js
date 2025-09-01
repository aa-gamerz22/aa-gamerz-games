const userImage = document.getElementById('userImage')
const computerImage = document.getElementById('computerImage')
const result = document.getElementById('result')

const userDisplay = document.getElementById('user')
const computerDisplay = document.getElementById('computer')

const possibleChoices = document.querySelectorAll('button')

const userCount = document.getElementById('userCounter')
const computerCount = document.getElementById('computerCounter')

let user
let userChoice
let userCurrentCounter = 0
let computer
let computerChoice
let computerCurrentCounter = 0
let resultText

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e) => {
    userChoice = e.target.id
    if(userChoice === 'rock') {
        user = 'ROCK'
        userImage.setAttribute("src", "./Resources/Rock.png")
    }
    if(userChoice === 'paper') {
        user = 'PAPER'
        userImage.setAttribute("src", "./Resources/Paper.png")
    }
    if(userChoice === 'scissors') {
        user = 'SCISSORS'
        userImage.setAttribute("src", "./Resources/Scissors.png")
    }
    userDisplay.innerHTML = user
    generateComouterChoice()
    getResult()
}))

function generateComouterChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length)
    if(randomNumber === 1) {
        computerChoice = 'rock'
        computer = 'ROCK'
        computerImage.setAttribute("src", "./Resources/Rock.png")
    }
    else if(randomNumber === 2) {
        computerChoice = 'paper'
        computer = 'PAPER'
        computerImage.setAttribute("src", "./Resources/Paper.png")
    }
    else {
        computerChoice = 'scissors'
        computer = 'SCISSORS'
        computerImage.setAttribute("src", "./Resources/Scissors.png")
    }
    computerDisplay.innerHTML = computer
}

function getResult() {
    if(userChoice === computerChoice) {
        resultText = 'DRAW'
        userCount.innerHTML = userCurrentCounter
    }
    else if(userChoice === 'rock' && computerChoice == 'scissors') {
        resultText = 'YOU WIN!'
        userCurrentCounter++
        userCount.innerHTML = userCurrentCounter
    }
    else if(userChoice === 'paper' && computerChoice == 'rock') {
        resultText = 'YOU WIN!'
        userCurrentCounter++
        userCount.innerHTML = userCurrentCounter
    }
    else if(userChoice === 'scissors' && computerChoice == 'paper') {
        resultText = 'YOU WIN!'
        userCurrentCounter++
        userCount.innerHTML = userCurrentCounter
    }
    else {
        resultText = 'YOU LOSE!'
        computerCurrentCounter++
        computerCount.innerHTML = computerCurrentCounter
    }
    result.innerHTML = resultText

}

const reset = document.getElementById('reset')

reset.addEventListener('click',(e) => {
    userCurrentCounter = 0
    userCount.innerHTML = userCurrentCounter
    userImage.setAttribute("src", "./Resources/Glasses.png")
    user = 'YOU'
    userDisplay.innerHTML = user

    computerCurrentCounter = 0
    computerCount.innerHTML = computerCurrentCounter
    computerImage.setAttribute("src", "./Resources/Sleeping.png")
    computer = 'COMPUTER'
    computerDisplay.innerHTML = computer

    resultText = 'RESULT'
    result.innerHTML = resultText
})
