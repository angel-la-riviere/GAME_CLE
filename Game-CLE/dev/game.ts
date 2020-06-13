class Game {
    
    private ball : Ball[] = []
    objecten : Objecten[] = []
    clouds : Clouds[] = []
    public powerups : Powerups[] = []
    private score : number = 0
    Gameover : HTMLElement
    
    

    constructor() {
        console.log("Game created!")

        for (let i = 0; i < 1; i++) {
            this.ball.push(new Ball("Red"))
        }
        for (let i = 0; i < 12; i++) {
            this.clouds.push(new Clouds(-100, i * 350 + 60, this))
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
        objecten.update()
       
        
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
}
    }
    for (const clouds of this.clouds) {
        clouds.update()
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

        let btn = document.getElementById("playagainbutton");
        let btn2 = document.getElementById("scoreopslaanbutton");

        let goBack = document.getElementById("back-arrow");

        let overzicht = document.getElementById("overzicht");

        document.getElementById("playagainbutton").style.display = "inline-block"
        document.getElementById("scoreopslaanbutton").style.display = "inline-block"
        document.getElementById("overzicht").style.display = "inline-block"

        btn.addEventListener("click", (e:Event) => this.playAgain(4));

        btn2.addEventListener("click", (e:Event) => this.scoreSave(4));

        overzicht.addEventListener("click", (e:Event) => this.fromDataBase(4));

        goBack.addEventListener("click", (e:Event) => this.goBack(4));

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

    playAgain(n:number){
        location.reload();
    }

    scoreSave(n:number){ 
        document.getElementById("playagainbutton").style.display = "none"
        document.getElementById("scoreopslaanbutton").style.display = "none"
        document.getElementById("overzicht").style.display = "none"

        this.Gameover.innerHTML = "Score opslaan"
        document.getElementById("group").style.display = "block"

        document.getElementById("save").style.display = "block"

        document.getElementById("back-arrow").style.display = "block"

        let btnSave = document.getElementById("save");
        btnSave.addEventListener("click", (e:Event) => this.toDataBase(4));
    }

    toDataBase(n:number){
        var score = this.score;

        var name = $('input[name="name"]').val();

        $.ajax({    //create an ajax request to display.php
            type: "POST",
            url: "display.php",
            data: {
                score: score,
                name: name
            },       
            dataType: "html",   //expect html to be returned                
            success: function(response){                    
                $("#div1").html(response); 
                console.log("njisdndfbjhdsbjh")
            }
        });

        location.reload();
    }

    fromDataBase(n:number){
        document.getElementById("playagainbutton").style.display = "none"
        document.getElementById("scoreopslaanbutton").style.display = "none"
        document.getElementById("overzicht").style.display = "none"
        document.getElementsByTagName("final_score")[0].innerHTML = ""

        document.getElementById("back-arrow").style.display = "block"

        document.getElementById("div2").style.display = "block"

        this.Gameover.innerHTML = ""
        
        $.ajax({    //create an ajax request to display.php
            type: "POST",
            url: "highscore.php",       
            dataType: "html",   //expect html to be returned                
            success: function(response){                    
                $("#div2").html(response); 
                console.log("njisdndfbjhdsbjh")
            }
        });

    }

    goBack(n:number){
        this.Gameover.innerHTML = "Game over!"
        document.getElementById("playagainbutton").style.display = "inline-block"
        document.getElementById("scoreopslaanbutton").style.display = "inline-block"
        document.getElementById("overzicht").style.display = "inline-block"

        document.getElementById("group").style.display = "none"

        document.getElementById("save").style.display = "none"

        document.getElementById("back-arrow").style.display = "none"
        document.getElementById("div2").style.display = "none"

        document.getElementsByTagName("final_score")[0].innerHTML = "Score: "+this.score
    }

}


window.addEventListener("load", () => new Game())