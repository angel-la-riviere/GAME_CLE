class Powerups {

    // Variabelen
    element : HTMLElement
    x : number = 0
    y : number = 0

    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    // Get powerups Rectangle
    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    constructor(color: string) {
        console.log(color)

        // Event voor bewegen van powerup
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

        // Aanmaken powerup
        this.element = document.createElement("powerups")

        // In game plaatsen
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

        // Positionering powerup
        this.x = Math.random() * window.innerWidth - 50
        this.y = Math.random() * window.innerHeight - 50
    }

    // Beweging van powerup
    onKeyDown(event:KeyboardEvent):void {
        console.log(event.keyCode)

        switch(event.keyCode){
        case 38:
            this.upSpeed = -0.2
            break
        case 37:
            this.leftSpeed = -0.2
            break
        case 39:
            this.rightSpeed = -0.2
            break
        }
    }
    
    // Stilstand powerup
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

        

        // Beweging object naar onder
        this.y += this.downSpeed
        this.y -= this.upSpeed

        // Als powerup onder uit beeld gaat kom boven weer in beeld
        if(this.y > window.innerHeight + 15) this.y = - 50

        // Plaats powerup met de movement
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    // Powerup functie
    public powerup(){
        this.x = Math.random() * window.innerWidth - 50
        this.y = 0
        // this.element.remove()
    }

    






    
}
