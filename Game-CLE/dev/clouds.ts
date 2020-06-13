class Clouds {

    // Variabelen
    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    cloud : HTMLElement
    x : number = 0
    y : number = 0

    constructor(x:number, y:number, g : Game) {

        // Event voor bewegen van cloud
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

        // Aanmaken cloud
        this.cloud = document.createElement("cloud")

        // In game plaatsen
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.cloud)

        // Positionering cloud
        this.x = Math.random() * window.innerWidth - 50
        this.y = Math.random() * window.innerHeight - 50
    }

    // Beweging van cloud
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
    
    // Stilstand cloud
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

        // Automatisch beweging clouds
        this.y += 0.4

        // Beweging clouds naar onder met beweging
        this.y += this.downSpeed
        this.y -= this.upSpeed

        // Als cloud onder uit beeld gaat kom boven weer in beeld
        if(this.y > window.innerHeight + 15) this.y = - 50

        // Plaats cloud met de movement
        this.cloud.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}