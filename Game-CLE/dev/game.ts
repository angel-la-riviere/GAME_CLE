class Game {
    
    private ball : Ball[] = []
    objecten : Objecten
    public powerups : Powerups[] = []
    

    constructor() {
        console.log("Game created!")

        for (let i = 0; i < 2; i++) {
            this.ball.push(new Ball("Red"))
        }

        this.objecten = new Objecten("Green")
        for (let i = 0; i < 4; i++) {
            this.powerups.push(new Powerups("Red"))
        }

        this.gameLoop()
    }

    gameLoop() {
    for (const ball of this.ball) {
        ball.move()

        if (this.checkCollision(ball.getRectangle(), this.objecten.getRectangle())) {
            console.log("BOTSING MET PADDLE")
            ball.gameover()
        }

        for (const powerup of this.powerups) {
            powerup.update()
            if (this.checkCollision(ball.getRectangle(), powerup.getRectangle())) {
                console.log("BOTSING MET PADDLE")
                window.addEventListener("keyup", (e:KeyboardEvent) => this.powerup(e))
                
                powerup.powerup()
            }
        }
    }
        this.objecten.update()

        
        
       

        requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision(a: ClientRect, b: ClientRect) : boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }
     
     powerup(event:KeyboardEvent){
        switch(event.keyCode){
            case 90:
                console.log("Je hebt vuurballen.")
                break
        }
    }
}

window.addEventListener("load", () => new Game())