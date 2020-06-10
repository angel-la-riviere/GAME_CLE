class Game {
    
    private ball : Ball[] = []
    objecten : Objecten[] = []
    public powerups : Powerups[] = []
    private score : number = 0
    Gameover : HTMLElement
    
    

    constructor() {
        console.log("Game created!")

        for (let i = 0; i < 1; i++) {
            this.ball.push(new Ball("Red"))
        }

        // this.objecten = new Objecten("Green")

        for (let i = 0; i < 3; i++) {
            this.objecten.push(new Objecten(-100, i * 350 + 60, this))
        }
        
        for (let i = 0; i < 10; i++) {
            this.powerups.push(new Powerups("Red"))
        }

        this.gameLoop()
    }

    gameLoop() {
    for (const ball of this.ball) {
        for (const objecten of this.objecten) {
        ball.move()
        
        document.getElementById('background').style.backgroundPositionY =  ball.y + 130 + 'px';
        for (const powerup of this.powerups) {
        if (this.checkCollision(ball.getRectangle(), objecten.getRectangle1())) {
            console.log("BOTSING MET PADDLE")
            this.gameover()
            // this.objecten.gameover()
        }


        for (const powerup of this.powerups) {
            powerup.update()
            if (this.checkCollision(ball.getRectangle(), powerup.getRectangle())) {
                console.log("BOTSING MET PADDLE")
                window.addEventListener("keyup", (e:KeyboardEvent) => this.powerup(e))
                this.addPoint(1)
                powerup.powerup()
            }
        }

        
    }
    objecten.update()
}
    }
    
        
    

        
        
       

        requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision(a: ClientRect, b: ClientRect) : boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

     private addPoint(player : number) {
        if(player == 1) {
           let score = document.getElementsByTagName("score")[0]
           this.score++
           score.innerHTML = "Score: "+this.score
        }
    }
     
     powerup(event:KeyboardEvent){
        switch(event.keyCode){
            case 90:
                console.log("Je hebt vuurballen.")
                break
        }
    }
    

    public gameover(){

        this.Gameover = document.createElement("test")
        let scores = document.createElement("final_score")

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.Gameover)
        game.appendChild(scores)
        this.Gameover.innerHTML = "Game Over!"

        scores.innerHTML = "Score: "+this.score

        for (const ball of this.ball) {
            for (const objecten of this.objecten) {
            let game = document.getElementsByTagName("game")[0]
            game.removeChild(ball.element)
            }
        }
        
    }

}


window.addEventListener("load", () => new Game())