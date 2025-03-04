let pattern = [];
let user = [];
let level = 0;
let started = false;
let colors = ["red", "blue", "green", "yellow"];
let score = 0;
let highScore = 0;

document.addEventListener("keydown", ()=> {
    if(!started){
        started = true;
        level = 0;
        pattern = [];
        score = -1;
        levelUp();    
    }
});

function levelUp(){
    user = [];
    level++;
    score++;
    document.querySelector("#level h3").innerText = "Level " + level;
    setTimeout(() => gameInput(), 300);
}

function flash(color) {
    let btn = document.querySelector(`#${color}`);
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 200);
}

function gameInput(){
    let random = Math.floor(Math.random() * 4);
    pattern.push(colors[random]);
    flash(colors[random]);
    console.log("Pattern:", pattern);
}

function userInput(btn){
    btn.addEventListener("click", (event) => {
        if (!started) return;
        
        let clickedColor = event.target.id;
        user.push(clickedColor);
        flash(clickedColor);
        check(user.length - 1);
    });
}

document.querySelectorAll(".btn").forEach((btn) => {
    userInput(btn);
});

function gameOver(color) {
    let body = document.querySelector("body");
    body.classList.add("gameovr");
    setTimeout(() => body.classList.remove("gameovr"), 300);
}

function check(index) {
    if (user[index] !== pattern[index]) {
        console.log("Wrong!");
        highScore = Math.max(highScore, score);
        document.querySelector("#highscore h3").innerText = "High Score: " + highScore;
        gameOver();
        document.querySelector("#level h3").innerHTML = `Game Over!  Your score is ${score}.<br> Press any key to restart...`;
        started = false;
        return;
    }

    if (user.length === pattern.length) {
        setTimeout(() => levelUp(), 500);
    }
}