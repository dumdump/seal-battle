//seal object constructor
let Seal = function(name, type, health, attackP, defenseP, dodgeP, speed, opponent, myTurn, move) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.attackP = attackP;
    this.defenseP = defenseP;
    this.dodgeP = dodgeP;
    this.opponent = opponent;
    this.myTurn = myTurn;
    this.move = move;
    this.attack = function() {
        feedback.textContent = this.name + " attacked!";
        this.move = 'attack';
        changeTurn();
    }
    this.defend = function() {
        feedback.textContent = this.name + " defended!";
        this.move = 'defend';
        changeTurn();            
    };
    this.dodge = function () {
        feedback.textContent = this.name + " dodged!";
        this.move = 'dodge';
        changeTurn()
    };
};
//seals
let playerSeal = new Seal('Player', 'water', 30, 10, 10, 10, 'enemy', true, 'move');
let enemySeal = new Seal('Jian Jiao', 'fire', 35, 20, 20, 20, 'enemy', false, 'move');
enemySeal.opponent = playerSeal;
playerSeal.opponent = enemySeal;
//enemy move
function enemyMove() {
    setTimeout(function() {
        let x = Math.floor(Math.random() * 3) + 1;
        if (enemySeal.myTurn == true) {
            switch (x) {
                case 1: enemySeal.attack()
                    break;
                case 2: enemySeal.defend()
                    break;
                case 3: enemySeal.dodge()    
            }
            processMoves();
        }
    }, 2000)
}
function processMoves() {
    let movesId = function() {
        if (playerSeal.move == 'attack' && enemySeal.move == 'attack') {
            return 0;
        } else if (playerSeal.move == 'attack' && enemySeal.move == 'defend') {
            return 1;
        } else if (playerSeal.move == 'attack' && enemySeal.move == 'dodge') {
            return 2;
        } else if (playerSeal.move == 'defend' && enemySeal.move == 'attack') {
            return 3;
        } else if (playerSeal.move == 'defend' && enemySeal.move == 'defend') {
            return 4;
        } else if (playerSeal.move == 'defend' && enemySeal.move == 'dodge') {
            return 5;
        } else if (playerSeal.move == 'dodge' && enemySeal.move == 'attack') {
            return 6;
        } else if (playerSeal.move == 'dodge' && enemySeal.move == 'defend') {
            return 7;
        } else if (playerSeal.move == 'dodge' && enemySeal.move == 'dodge') {
            return 8;
        } else if (enemySeal.move == 'attack' && playerSeal.move == 'attack') {
            return 9;
        } else if (enemySeal.move == 'attack' && playerSeal.move == 'defend') {
            return 10;
        } else if (enemySeal.move == 'attack' && playerSeal.move == 'dodge') {
            return 11;
        } else if (enemySeal.move == 'defend' && playerSeal.move == 'attack') {
            return 12;
        } else if (enemySeal.move == 'defend' && playerSeal.move == 'defend') {
            return 13;
        } else if (enemySeal.move == 'defend' && playerSeal.move == 'dodge') {
            return 14;
        } else if (enemySeal.move == 'dodge' && playerSeal.move == 'attack') {
            return 15;
        } else if (enemySeal.move == 'dodge' && playerSeal.move == 'defend') {
            return 16;
        } else {
            return 17;
        }
    }
    switch (movesId()) {
        case 0:
            playerSeal.opponent.health = playerSeal.opponent.health - playerSeal.attackP;
            enemySeal.opponent.health = enemySeal.opponent.health - enemySeal.attackP;
            break;
        case 1:
            playerSeal.opponent.health = playerSeal.opponent.health - playerSeal.attackP;
            enemySeal.health = enemySeal.health + (enemySeal.opponent.attackP / (enemySeal.defenseP / 5));
            break;
        case 2:
            break;
        case 3:
            enemySeal.opponent.health = enemySeal.opponent.health - enemySeal.attackP;
            playerSeal.health = playerSeal.health + (playerSeal.opponent.attackP / (playerSeal.defenseP / 5));
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
    }            
}
//math variable
let y = 0;
//get html elements
let fightContainer = document.getElementsByClassName('fight-container');
let playerStats = document.getElementsByClassName('player-stats');
let enemyStats = document.getElementsByClassName('enemy-stats');
let feedback = document.getElementsByClassName('feedback-container')[0];
//infinite rapid loop
setInterval(function() {fightContainer[0].style.marginLeft = window.innerWidth * .25 + "px"; fightContainer[0].style.marginRight = window.innerWidth * .25 + "px"; statsUpdate(); }, 10);
//change stats
function updateStats() {
    playerStats[0].innerHTML = "HP: " + playerSeal.health + "<br>" + "Attack: " + playerSeal.attackP + "<br>" + "Defense: " + playerSeal.defenseP + "<br>" + "Dodge Speed: " + playerSeal.dodgeP;
    enemyStats[0].innerHTML = "HP: " + enemySeal.health + "<br>" + "Attack: " + enemySeal.attackP + "<br>" + "Defense: " + enemySeal.defenseP + "<br>" + "Dodge Speed: " + enemySeal.dodgeP;
}
function statsUpdate() {
    if (y == 0) {
        updateStats();
        deathCheck()
    }
}
//change turn
function changeTurn() {
    if (playerSeal.myTurn == false) {
        document.getElementById('choices-btns').className = 'choices-btns-my-turn';
        document.getElementById('attack-btn').setAttribute('onclick', 'playerSeal.attack()');
        document.getElementById('defend-btn').setAttribute('onclick', 'playerSeal.defend()');
        document.getElementById('dodge-btn').setAttribute('onclick', 'playerSeal.dodge()');
        playerSeal.myTurn = true;
        enemySeal.myTurn = false;
        y += 1;
        enemyMove();
    } else {
        document.getElementById('choices-btns').className = 'choices-btns-enemy-turn';
        document.getElementById('attack-btn').setAttribute('onclick', '');
        document.getElementById('defend-btn').setAttribute('onclick', '');
        document.getElementById('dodge-btn').setAttribute('onclick', '');
        console.log(document.getElementById('dodge-btn').getAttribute('onclick'));
        playerSeal.myTurn = false;
        enemySeal.myTurn = true;
        y -= 1;
        enemyMove();
    }
}
//check if dead
function deathCheck() {
    if (playerSeal.health <= 0) {
        alert('You Fell! Reload Page To Try Again.');
        document.body.innerHTML = '<h1>YOU LOST!!!</h1>';
    }
    if (enemySeal.health <= 0) {
        alert(enemySeal.name + ' fell! Reload Page To Try Again');
        document.body.innerHTML = '<h1>YOU WON!!!</h1>';
    }
}
//when page loads update stats
window.onload = function() {
    updateStats();
}
