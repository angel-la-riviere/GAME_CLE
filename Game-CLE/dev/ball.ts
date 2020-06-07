class Ball {
    
    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    element : HTMLElement
    Gameover : HTMLElement
    x : number = 0
    y : number = 0

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    constructor(color: string) {
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        
        

        console.log(color)
        this.element = document.createElement("ball")
        this.element.addEventListener("click", () => this.changeColor())

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.element)

        this.x = window.innerWidth / 2 - 50
        this.y = window.innerHeight - 130
    }

    onKeyDown(event:KeyboardEvent):void {
        console.log(event.keyCode)

        switch(event.keyCode){
        case 38:
            this.upSpeed = 5
            break
        case 40:
            this.downSpeed = 5
            break
        case 37:
            this.leftSpeed = 5
            break
        case 39:
            this.rightSpeed = 5
            break
        }
        
    }
    
    onKeyUp(event:KeyboardEvent):void {
        console.log(event.keyCode)
        switch(event.keyCode){
        case 38:
            this.upSpeed = 0
            break
        case 40:
            this.downSpeed = 0
            break
        case 37:
            this.leftSpeed = 0
            break
        case 39:
            this.rightSpeed = 0
            break
        }
    }

    // Change color
    changeColor() {
        let color = Math.random() * 360
        this.element.style.filter = `hue-rotate(${color}deg)`
    }
    // bewegen
    move() {
        // console.log("Ball is moving")
        

        this.x += this.rightSpeed
        this.y += this.downSpeed

        this.x -= this.leftSpeed
        this.y -= this.upSpeed

        

        let newX = this.x - this.leftSpeed + this.rightSpeed
        let newY = this.y - this.leftSpeed + this.rightSpeed

        // check of de paddle binnen beeld blijft
        if (newX + 130 > window.innerWidth) this.x = window.innerWidth - 130
        if (newY + 130 > window.innerHeight) this.y = window.innerHeight - 130
        if (this.x < 30) this.x = 30
        

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public gameover(){
        this.element.remove()
    }
}
