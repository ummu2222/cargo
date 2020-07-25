
const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gamearea = document.querySelector('.gamearea');



let player = { speed: 15, score: 0 };


startscreen.addEventListener('click', start);

function iscollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveline() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {

        if (item.y >= 1000) {
            item.y -= 1050;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}


function endgame() {
    player.start = false;
    startscreen.classList.remove('hide');
    startscreen.innerHTML = "GAME OVER <br> Your final score is : " + player.score + " <br>click here to restart the game"
}

function moveenemy(car) {
    let enemycar = document.querySelectorAll('.enemy');

    enemycar.forEach(function (item) {

        if (iscollide(car, item)) {
            endgame();
            startscreen.classList.remove('hide');
        }

        if (item.y >= 1000) {
            item.y = -400;

            item.style.left = Math.floor(Math.random() * 450) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gameplay() {
    
    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();
    
    if (player.start) {
        moveline();
        moveenemy(car);
        if (keys.ArrowUp && player.y > 100) {
            player.y -= player.speed;
        }

        if (keys.ArrowDown && player.y < (road.bottom - 90)) {
            player.y += player.speed;
        }

        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }

        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gameplay);
        player.score++;
        let ps = player.score - 1;
        score.innerText = "SCORE :" + ps;
    }

}

function start() {
    
    startscreen.classList.add('hide');
    gamearea.innerHTML = "";
    player.start = true;

    player.score = 0;

    window.requestAnimationFrame(gameplay);
    
    for (x = 0; x < 10; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + "px";

        gamearea.appendChild(roadline);

    }



    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    
    gamearea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

  
    for (x = 0; x < 4; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        enemycar.y = ((x + 1) * 350) * (-1);
        enemycar.style.top = enemycar.y + "px";

        enemycar.style.backgroundColor = randomcolor();

        enemycar.style.left = Math.floor(Math.random() * 450) + "px";
        gamearea.appendChild(enemycar);


    }

}

function randomcolor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault()
    keys[e.key] = true;
}


function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;

}
