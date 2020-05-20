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
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 38:
                this.upSpeed = 5;
                break;
            case 40:
                this.downSpeed = 5;
                break;
            case 37:
                this.leftSpeed = 5;
                break;
            case 39:
                this.rightSpeed = 5;
                break;
        }
    }
    onKeyUp(event) {
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
        console.log("Ball is moving");
        this.x += this.rightSpeed;
        this.y += this.downSpeed;
        this.x -= this.leftSpeed;
        this.y -= this.upSpeed;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
class Game {
    constructor() {
        console.log("Game created!");
        this.ball = new Ball("Red");
        this.ball2 = new Ball("Green");
        this.gameLoop();
    }
    gameLoop() {
        this.ball.move();
        this.ball2.move();
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map