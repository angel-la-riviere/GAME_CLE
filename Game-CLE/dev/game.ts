class Game {
    
    ball : Ball
    ball2 : Ball

    constructor() {
        console.log("Game created!")

        this.ball = new Ball("Red")
        this.ball2 = new Ball("Green")

        this.gameLoop()
    }

    gameLoop() {
        this.ball.move()
        this.ball2.move()

        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())