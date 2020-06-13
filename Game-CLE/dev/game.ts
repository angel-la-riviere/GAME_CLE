class Game {
    
    // Variabelen
    private ball : Ball[] = []
    objecten : Objecten[] = []
    clouds : Clouds[] = []
    public powerups : Powerups[] = []
    private score : number = 0
    Gameover : HTMLElement
    
    

    constructor() {
        console.log("Game created!")

        // Character spawn
        for (let i = 0; i < 1; i++) {
            this.ball.push(new Ball("Red"))
        }

        // Clouds spawn
        for (let i = 0; i < 12; i++) {
            this.clouds.push(new Clouds(-100, i * 350 + 60, this))
        }
        
        // Objecten spawn
        for (let i = 0; i < 3; i++) {
            this.objecten.push(new Objecten(-100, i * 350 + 60, this))
        }
        
        // Coins/powerups spawn
        for (let i = 0; i < 10; i++) {
            this.powerups.push(new Powerups("Red"))
        }

        // Gameloop
        this.gameLoop()

    }

    gameLoop() {
    

        for (const ball of this.ball) {
            for (const objecten of this.objecten) {
                
                ball.move()
                objecten.update()

                document.getElementById('background').style.backgroundPositionY =  ball.y + 130 + 'px';

                // Check collission player- and objects
                for (const powerup of this.powerups) {
                    if (this.checkCollision(ball.getRectangle(), objecten.getRectangle1())) {
                    console.log("BOTSING MET PADDLE")
                    this.gameover()
                
                }

                // Check collission player and powerups
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
        
        // Update clouds
        for (const clouds of this.clouds) {
            clouds.update()
        }
            requestAnimationFrame(() => this.gameLoop())
        }

        // Check collission functie
        private checkCollision(a: ClientRect, b: ClientRect) : boolean {
            return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
        }

        // Addpoint functie
        private addPoint(player : number) {
            if(player == 1) {
            let score = document.getElementsByTagName("score")[0]
            this.score++
            score.innerHTML = "Score: "+this.score
            }
        }
        
        // Powerup functie
        powerup(event:KeyboardEvent){
            switch(event.keyCode){
                case 90:
                    console.log("Je hebt vuurballen.")
                    break
            }
    }
    

    public gameover(){

        // Variabelen voor het ophalen van het id van de play again button
        let btn = document.getElementById("playagainbutton");

        // Variabelen voor het ophalen van het id van de score opslaan button
        let btn2 = document.getElementById("scoreopslaanbutton");

        // Variabelen voor het ophalen van het id van de back button
        let goBack = document.getElementById("back-arrow");

        // Variabelen voor het ophalen van het id van de highscore button
        let overzicht = document.getElementById("overzicht");

        // Show Play again button
        document.getElementById("playagainbutton").style.display = "inline-block"

        // Show Score opslaan button
        document.getElementById("scoreopslaanbutton").style.display = "inline-block"

        // Show Highscore button
        document.getElementById("overzicht").style.display = "inline-block"

        // Click event voor de Play again button
        btn.addEventListener("click", (e:Event) => this.playAgain(4));

        // Click event voor de Score opslaan button
        btn2.addEventListener("click", (e:Event) => this.scoreSave(4));

        // Click event voor de Highscore button
        overzicht.addEventListener("click", (e:Event) => this.fromDataBase(4));

        // Click event voor de back button
        goBack.addEventListener("click", (e:Event) => this.goBack(4));

        // Game over menu aanmaken
        this.Gameover = document.createElement("test")
        let scores = document.createElement("final_score")

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.Gameover)
        game.appendChild(scores)
        this.Gameover.innerHTML = "Game Over!"

        scores.innerHTML = "Score: "+this.score

        // Verwijderen van de player als je game over bent
        for (const ball of this.ball) {
            for (const objecten of this.objecten) {
            let game = document.getElementsByTagName("game")[0]
            game.removeChild(ball.element)
            }
        }
        
    }

    // Play again functie
    playAgain(n:number){
        location.reload();
    }

    // Score opslaan functie
    scoreSave(n:number){ 

        // Hide Play again button
        document.getElementById("playagainbutton").style.display = "none"

        // Hide score opslaan button
        document.getElementById("scoreopslaanbutton").style.display = "none"

        // Hide Highscore button
        document.getElementById("overzicht").style.display = "none"

        // Show formulier voor opslaan
        this.Gameover.innerHTML = "Score opslaan"
        document.getElementById("group").style.display = "block"

        document.getElementById("save").style.display = "block"

        document.getElementById("back-arrow").style.display = "block"

        let btnSave = document.getElementById("save");

        // Click event voor het opslaan in de database
        btnSave.addEventListener("click", (e:Event) => this.toDataBase(4));
    }

    // Formulier naar database functie
    toDataBase(n:number){
        // Variabelen voor ophalen behaalde score
        var score = this.score;

        // Value van input veld
        var name = $('input[name="name"]').val();

        // Ajax call to php file
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

    // Ophalen higscores functie
    fromDataBase(n:number){


        // Hide Play again button
        document.getElementById("playagainbutton").style.display = "none"

        // Hide score opslaan button
        document.getElementById("scoreopslaanbutton").style.display = "none"

        // Hide Highscore button
        document.getElementById("overzicht").style.display = "none"

        // Hide Score
        document.getElementsByTagName("final_score")[0].innerHTML = ""

        // Show back button
        document.getElementById("back-arrow").style.display = "block"

        // Show higscores
        document.getElementById("div2").style.display = "block"

        this.Gameover.innerHTML = ""
        
        // Ajax call to php file
        $.ajax({    //create an ajax request to highscore.php
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

        // Show Play again button
        document.getElementById("playagainbutton").style.display = "inline-block"

        // Show Score opslaan button
        document.getElementById("scoreopslaanbutton").style.display = "inline-block"

        // Show Highscore button
        document.getElementById("overzicht").style.display = "inline-block"

        // Hide score opslaan and highscores
        document.getElementById("group").style.display = "none"

        document.getElementById("save").style.display = "none"

        document.getElementById("back-arrow").style.display = "none"

        document.getElementById("div2").style.display = "none"

        // Show score
        document.getElementsByTagName("final_score")[0].innerHTML = "Score: "+this.score
    }

}


window.addEventListener("load", () => new Game())