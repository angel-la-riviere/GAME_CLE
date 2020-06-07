class Objecten {


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
    
    public update() : void { 
        // console.log("Ball is moving")
        this.plane1x += 2
        if(this.plane1x > window.innerWidth) this.plane1x = - 130
        this.plane1.style.transform = `translate(${this.plane1x}px, ${this.plane1y}px)`

        this.plane2x += 2
        if(this.plane2x > window.innerWidth) this.plane2x = - 130
        this.plane2.style.transform = `translate(${this.plane2x}px, ${this.plane2y}px)`

        this.plane3x += 2
        if(this.plane3x > window.innerWidth) this.plane3x = - 130
        this.plane3.style.transform = `translate(${this.plane3x}px, ${this.plane3y}px)`
    }

    public gameover(){
        this.plane1.remove()
        this.plane2.remove()
        this.plane3.remove()
    }





    
}
