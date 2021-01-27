const playersURL = 'http://localhost:3000/players'
const tokensURL = 'http://localhost:3000/tokens'
const gamesURL = 'http://localhost:3000/games'
const body = document.querySelector('body')
const errors = document.getElementById('errors')
let allPlayers = []
let currentGame;

let values = [1,2,3,4,5,6,7,8,9]
let x = getRandomInt(10)
let time = 20

let x2 = getRandomInt(10)
let time2 = 20

let x3 = getRandomInt(10)
let time3 = 20
//this which waits until done to move on
getAllPlayers()
onPageLoad()
//get all players

// DATA
function getAllPlayers(){
    fetch(playersURL)
    .then(r => r.json())
    .then(data => allPlayers = data)
}


function createPlayer(player){
    //debugger
    fetch(playersURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(player)
    })
    .then(r => r.json())
    .then(data => {
        if (data['error']){
            errors.innerHTML = ''
            let errorP = document.createElement('p')
            errorP.textContent = data['error']
            errors.appendChild(errorP)
        }else{
            // player home page
        }
    })
    .catch(error => console.log(error.message))
}

function findPlayer(player){
    if(allPlayers.find(p => p.username == player.username)){
        p = allPlayers.find(p => p.username == player.username)
        playerHomePage(p)
    }else{
        errors.innerHTML = ''
        let errorP = document.createElement('p')
        errorP.textContent = 'Invalid Username.'
        errors.appendChild(errorP)
    }
    
}

function addToken(player){
    fetch(tokensURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({player_id: player.id})
    })
    .then(r => r.json())
    .then(count => updateTokenBalance(count))
    .catch(error => console.log(error.message))
}

function createGame(player){
    fetch(gamesURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({player_id: player.id})
    })
    .then(r => r.json())
    .then(game => currentGame = game)
    .catch(error => console.log(error.message))
}




//DOM

function onPageLoad(){
    let loginButton = document.createElement('button')
    let registerButton = document.createElement('button')

    loginButton.textContent = "Login"
    registerButton.textContent = "Register"

    loginButton.addEventListener('click',loginScreen)
    registerButton.addEventListener('click',registerScreen)

    body.append(loginButton,registerButton)
}

function playerHomePage(player){
    body.innerHTML = ''
    
    //score logic
    let scores = []
    let scoreHelp = player.games.forEach(game => scores.push(parseInt(game.score)))
    let maxScore = Math.max(...scores)

    // create elements
    let container = document.createElement('div')
    let welcomeDiv = document.createElement('div')
    let greeting = document.createElement('h2')
    let tokenDiv = document.createElement('div')
    let tokenCount = document.createElement('h4')
    let tokenSpan = document.createElement('span')
    let highScoreDiv = document.createElement('div')
    let highScore = document.createElement('h4')
    let highScoreSpan = document.createElement('span')
    let buttonDiv = document.createElement('div')
    let newGameButton = document.createElement('button')
    let buyTokenButton = document.createElement('button')
    
    // element attributes
    welcomeDiv.id = 'welcome-div'
    greeting.textContent = `Welcome < ${player.username} >`
    tokenCount.textContent = 'Token Balance: '
    tokenSpan.textContent = player.tokens.length
    tokenSpan.id = 'token-span'
    highScore.textContent = 'Personal High Score: '
    highScoreSpan.textContent = maxScore
    highScoreSpan.id = 'high-score-span'
    newGameButton.textContent = 'START NEW GAME'
    buyTokenButton.textContent = 'BUY TOKEN'
    buyTokenButton.addEventListener('click',() => addToken(player))
    newGameButton.addEventListener('click',() => newGame(player))
    
    // append elements
    welcomeDiv.append(greeting)
    tokenCount.appendChild(tokenSpan)
    tokenDiv.appendChild(tokenCount)
    highScore.appendChild(highScoreSpan)
    highScoreDiv.appendChild(highScore)
    buttonDiv.append(newGameButton,buyTokenButton)
    
    container.append(welcomeDiv,tokenDiv,highScoreDiv,buttonDiv)
    
    body.appendChild(container)


}

//loginscreen
function loginScreen(){
    body.innerHTML = ''
    // add big flashy title
    let form = document.createElement('form')
    let input = document.createElement('input')
    let loginButton = document.createElement('button')
    let backButton = document.createElement('button')
    backButton.textContent = 'back'
    input.placeholder = 'username:'
    loginButton.textContent = 'Login'
    input.name = 'username'

    backButton.addEventListener('click',onPageLoad)
    loginButton.addEventListener('click', handleLogin)

    form.append(backButton,input,loginButton)
    body.appendChild(form)

}
//register screen
function registerScreen(){
    body.innerHTML = ''
    // add big flashy title
    let form = document.createElement('form')
    let input = document.createElement('input')
    let registerButton = document.createElement('button')
    let backButton = document.createElement('button')
    backButton.textContent = 'back'
    input.placeholder = 'username:'
    registerButton.textContent = 'Register'
    input.name = 'username'

    backButton.addEventListener('click',onPageLoad)
    registerButton.addEventListener('click', handleNewPlayer)
    
    form.append(backButton,input,registerButton)
    body.appendChild(form)
}

function updateTokenBalance(count){
    let tokenSpan = document.getElementById('token-span')
    tokenSpan.innerHTML = ''
    tokenSpan.textContent = count
}

// GAME

function newGame(player){
    //createGame(player)
    body.innerHTML = ''

    // create elements
    // gameWindow = document.createElement('div')
    // playerScoreDiv = document.createElement('div')
    rollBtnDiv = document.createElement('div')
    // cardDiv = document.createElement('div')
    // endBtnDiv = document.createElement('div')
    // rulesDiv = document.createElement('div')

    // username = document.createElement('h5')
    // score = document.createElement('h1')
    rollBtn = document.createElement('button')

    slotMachine = document.createElement('div')

    slotMachine1 = document.createElement('div')
    slotMachine2 = document.createElement('div')
    slotMachine3 = document.createElement('div')

    slotValue1 = document.createElement('h1')
    slotValue2 = document.createElement('h1')
    slotValue3 = document.createElement('h1')


    slotMachine1.className = 'slot'
    slotMachine1.id = 'slot1'
    slotValue1.className = 'value'
    slotValue1.id = 'value1'

    slotMachine2.className = 'slot'
    slotMachine2.id = 'slot2'
    slotValue2.className = 'value'
    slotValue2.id = 'value2'

    slotMachine3.className = 'slot'
    slotMachine3.id = 'slot3'
    slotValue3.className = 'value'
    slotValue3.id = 'value3'

    slotValue1.textContent = 7
    slotValue2.textContent = 7
    slotValue3.textContent = 7

    rollBtn.textContent = 'ROLL'

    rollBtn.addEventListener('click', masterRoll)

    
    slotMachine1.appendChild(slotValue1)
    slotMachine2.appendChild(slotValue2)
    slotMachine3.appendChild(slotValue3)
    slotMachine.append(slotMachine1,slotMachine2,slotMachine3,rollBtn)
    body.appendChild(slotMachine)


    // append elements
    // playerScoreDiv.append(username,score)
    // gameWindow.append(playerScoreDiv,rollBtnDiv,cardDiv,endBtnDiv,rulesDiv)
    // body.appendChild(gameWindow)
}

function masterRoll(){
    rollDiv1()
    rollDiv2()
    rollDiv3()
}


function rollDiv1(){
    let value = document.getElementById('value1')
    if(time > 250){resetRoll()
    return}
    value.textContent = values[x]
    setTimeout(rollDiv1, time)
    time += 10
    if(x+1 == 9){
        x = 0
    }else{
        x += 1
    }
}

function rollDiv2(){
    let value = document.getElementById('value2')
    if(time2 > 300){resetRoll2()
    return}
    value.textContent = values[x2]
    setTimeout(rollDiv2, time2)
    time2 += 10
    if(x2+1 == 9){
        x2 = 0
    }else{
        x2 += 1
    }
}

function rollDiv3(){
    let value = document.getElementById('value3')
    if(time3 > 350){resetRoll3()
    return}
    value.textContent = values[x3]
    setTimeout(rollDiv3, time3)
    time3 += 10
    if(x3+1 == 9){
        x3 = 0
    }else{
        x3 += 1
    }
}


//MATH SHIT

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//end game page
function resetRoll(){
    x = getRandomInt(10)
    time = 20
}

function resetRoll2(){
    x2 = getRandomInt(10)
    time2 = 20
}

function resetRoll3(){
    x3 = getRandomInt(10)
    time3 = 20
}


// HANDLERS

function handleNewPlayer(e){
    e.preventDefault()
    player = {
        username: e.target.parentElement.username.value
    }
    createPlayer(player)
}

function handleLogin(e){
    e.preventDefault()
    player = {
        username: e.target.parentElement.username.value
    }
    findPlayer(player)
}



// SLOT LOGIC


