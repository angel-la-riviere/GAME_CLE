class Objecten {


    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    plane1 : HTMLElement
    plane1x : number = 0
    plane1y : number = 0

    plane2 : HTMLElement
    plane2x : number = 0
    plane2y : number = 0

    plane3 : HTMLElement
    plane3x : number = 0
    plane3y : number = 0

    public getRectangle1() {
        return this.plane1.getBoundingClientRect()
    }

    public getRectangle2() {
        return this.plane2.getBoundingClientRect()
    }
    public getRectangle3() {
        return this.plane3.getBoundingClientRect()
    }

    constructor(color: string) {
        console.log(color)

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

        this.plane1 = document.createElement("plane")

        this.plane2 = document.createElement("plane")

        this.plane3 = document.createElement("plane")

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.plane1)
        game.appendChild(this.plane2)
        game.appendChild(this.plane3)

        this.plane1x = - 150
        this.plane1y = window.innerHeight - 200

        this.plane2x = - 250
        this.plane2y = window.innerHeight / 2 - 50

        this.plane3x = - 120
        this.plane3y = window.innerHeight /6 - 50

    

    }

    onKeyDown(event:KeyboardEvent):void {
        console.log(event.keyCode)

        switch(event.keyCode){
        case 38:
            this.upSpeed = -5
            break
        case 40:
            this.downSpeed = -5
            break
        case 37:
            this.leftSpeed = -5
            break
        case 39:
            this.rightSpeed = -5
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
    
    public update() : void { 
        // console.log("Ball is moving")
        this.plane1x += 2

        this.plane1y += this.downSpeed

        this.plane1y -= this.upSpeed

        if(this.plane1x > window.innerWidth) this.plane1x = - 130
        this.plane1.style.transform = `translate(${this.plane1x}px, ${this.plane1y}px)`

        this.plane2x += 2
        this.plane2y += this.downSpeed
        this.plane2y -= this.upSpeed

        if(this.plane2x > window.innerWidth) this.plane2x = - 130
        this.plane2.style.transform = `translate(${this.plane2x}px, ${this.plane2y}px)`

        this.plane3x += 2
        this.plane3y += this.downSpeed
        this.plane3y -= this.upSpeed

        if(this.plane3x > window.innerWidth) this.plane3x = - 130
        this.plane3.style.transform = `translate(${this.plane3x}px, ${this.plane3y}px)`
    }

    public gameover(){
        this.plane1.remove()
        this.plane2.remove()
        this.plane3.remove()
    }





    
}
