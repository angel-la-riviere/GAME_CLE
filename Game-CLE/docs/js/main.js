class Ball {
    constructor(color) {
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.x = 0;
        this.y = 0;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        console.log(color);
        this.element = document.createElement("ball");
        this.element.addEventListener("click", () => this.changeColor());
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.x = window.innerWidth / 2 - 50;
        this.y = window.innerHeight - 130;
    }
    getRectangle() {
        return this.element.getBoundingClientRect();
    }
    onKeyDown(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38:
                this.upSpeed = 2;
                break;
            case 40:
                this.downSpeed = 2;
                break;
            case 37:
                this.leftSpeed = 2;
                break;
            case 39:
                this.rightSpeed = 2;
                break;
        }
    }
    onKeyUp(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38:
                this.upSpeed = 0;
                break;
            case 40:
                this.downSpeed = 0;
                break;
            case 37:
                this.leftSpeed = 0;
                break;
            case 39:
                this.rightSpeed = 0;
                break;
        }
    }
    changeColor() {
        let color = Math.random() * 360;
        this.element.style.filter = `hue-rotate(${color}deg)`;
    }
    move() {
        this.x += this.rightSpeed;
        this.y += this.downSpeed;
        this.x -= this.leftSpeed;
        this.y -= this.upSpeed;
        let newX = this.x - this.leftSpeed + this.rightSpeed;
        let newY = this.y - this.leftSpeed + this.rightSpeed;
        if (newX + 130 > window.innerWidth)
            this.x = window.innerWidth - 130;
        if (newY + 130 > window.innerHeight)
            this.y = window.innerHeight - 130;
        if (this.x < 30)
            this.x = 30;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    gameover() {
    }
}
class Game {
    constructor() {
        this.ball = [];
        this.objecten = [];
        this.powerups = [];
        this.score = 0;
        console.log("Game created!");
        for (let i = 0; i < 1; i++) {
            this.ball.push(new Ball("Red"));
        }
        for (let i = 0; i < 3; i++) {
            this.objecten.push(new Objecten(-100, i * 350 + 60, this));
        }
        for (let i = 0; i < 10; i++) {
            this.powerups.push(new Powerups("Red"));
        }
        this.gameLoop();
    }
    gameLoop() {
        for (const ball of this.ball) {
            for (const objecten of this.objecten) {
                ball.move();
                document.getElementById('background').style.backgroundPositionY = ball.y + 130 + 'px';
                for (const powerup of this.powerups) {
                    if (this.checkCollision(ball.getRectangle(), objecten.getRectangle1())) {
                        console.log("BOTSING MET PADDLE");
                        this.gameover();
                    }
                    for (const powerup of this.powerups) {
                        powerup.update();
                        if (this.checkCollision(ball.getRectangle(), powerup.getRectangle())) {
                            console.log("BOTSING MET PADDLE");
                            window.addEventListener("keyup", (e) => this.powerup(e));
                            this.addPoint(1);
                            powerup.powerup();
                        }
                    }
                }
                objecten.update();
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    addPoint(player) {
        if (player == 1) {
            let score = document.getElementsByTagName("score")[0];
            this.score++;
            score.innerHTML = "Score: " + this.score;
        }
    }
    powerup(event) {
        switch (event.keyCode) {
            case 90:
                console.log("Je hebt vuurballen.");
                break;
        }
    }
    gameover() {
        this.Gameover = document.createElement("test");
        let scores = document.createElement("final_score");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.Gameover);
        game.appendChild(scores);
        this.Gameover.innerHTML = "Game Over!";
        scores.innerHTML = "Score: " + this.score;
        for (const ball of this.ball) {
            for (const objecten of this.objecten) {
                let game = document.getElementsByTagName("game")[0];
                game.removeChild(ball.element);
            }
        }
    }
}
window.addEventListener("load", () => new Game());
class Objecten {
    constructor(x, y, g) {
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.plane1x = 0;
        this.plane1y = 0;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.plane1 = document.createElement("plane");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.plane1);
        this.plane1x = x;
        this.plane1y = y;
    }
    getRectangle1() {
        return this.plane1.getBoundingClientRect();
    }
    onKeyDown(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38:
                this.upSpeed = -5;
                break;
            case 40:
                this.downSpeed = -5;
                break;
            case 37:
                this.leftSpeed = -5;
                break;
            case 39:
                this.rightSpeed = -5;
                break;
        }
    }
    onKeyUp(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38:
                this.upSpeed = 0;
                break;
            case 40:
                this.downSpeed = 0;
                break;
            case 37:
                this.leftSpeed = 0;
                break;
            case 39:
                this.rightSpeed = 0;
                break;
        }
    }
    update() {
        this.plane1x += 2;
        this.plane1y += this.downSpeed;
        this.plane1y -= this.upSpeed;
        if (this.plane1x > window.innerWidth)
            this.plane1x = -130;
        if (this.plane1y > window.innerHeight + 15)
            this.plane1y = -50;
        if (this.plane1y < -50)
            this.plane1y = window.innerHeight + 20;
        this.plane1.style.transform = `translate(${this.plane1x}px, ${this.plane1y}px)`;
    }
    gameover() {
        this.plane1.remove();
    }
}
class Powerups {
    constructor(color) {
        this.x = 0;
        this.y = 0;
        console.log(color);
        this.element = document.createElement("powerups");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.x = Math.random() * window.innerWidth - 50;
        this.y = Math.random() * window.innerHeight - 50;
    }
    getRectangle() {
        return this.element.getBoundingClientRect();
    }
    update() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    powerup() {
        this.element.remove();
    }
}
//# sourceMappingURL=main.js.map