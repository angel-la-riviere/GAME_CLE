class Objecten {

    // Variabelen
    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    plane1 : HTMLElement
    plane1x : number = 0
    plane1y : number = 0

    // Get object Rectangle
    public getRectangle1() {
        return this.plane1.getBoundingClientRect()
    }

    constructor(x:number, y:number, g : Game) {
        // Event voor bewegen van object
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

        // Aanmaken object
        this.plane1 = document.createElement("plane")

        // In game plaatsen
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.plane1)

        // Positionering object
        this.plane1x = x
        this.plane1y = y
    }

    // Beweging van object
    onKeyDown(event:KeyboardEvent):void {
        console.log(event.keyCode)

        switch(event.keyCode){
        case 38:
            this.upSpeed = -5
            break
        case 37:
            this.leftSpeed = -5
            break
        case 39:
            this.rightSpeed = -5
            break
        }
        
    }
    
    // Stilstand object
    onKeyUp(event:KeyboardEvent):void {
        console.log(event.keyCode)
        switch(event.keyCode){
        case 38:
            this.upSpeed = 0
            break
        case 37:
            this.leftSpeed = 0
            break
        case 39:
            this.rightSpeed = 0
            break
        }
    }
    
    public update() : void { 
        // console.log("Ball is moving")

        // Beweging object naar rechts
        this.plane1x += 2

        // Beweging object omhoog
        this.plane1y += this.downSpeed
        this.plane1y -= this.upSpeed

        // Als object uit beeld gaat kom dan links weer in beeld
        if(this.plane1x > window.innerWidth) this.plane1x = - 130

        // Als object onder uit beeld is kom dan boven weer in beeld
        if(this.plane1y > window.innerHeight + 100) this.plane1y = - 50

        // Als object boven uit beeld is kom dan onder het beeld in
        if(this.plane1y < -50) this.plane1y = window.innerHeight + 20

        // Plaats object met de movement
        this.plane1.style.transform = `translate(${this.plane1x}px, ${this.plane1y}px)`

    }    
}
