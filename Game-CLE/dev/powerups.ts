class Powerups {


    element : HTMLElement
    x : number = 0
    y : number = 0

    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    constructor(color: string) {
        console.log(color)
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

        this.element = document.createElement("powerups")

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.element)

        this.x = Math.random() * window.innerWidth - 50
        this.y = Math.random() * window.innerHeight - 50

    }

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
        this.y += this.downSpeed

        this.y -= this.upSpeed

        if(this.y > window.innerHeight + 15) this.y = - 50
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public powerup(){
        this.x = Math.random() * window.innerWidth - 50
        this.y = 0
        // this.element.remove()
    }

    






    
}
