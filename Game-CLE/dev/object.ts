class Objecten {


    element : HTMLElement
    x : number = 0
    y : number = 0

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    constructor(color: string) {
        console.log(color)
        this.element = document.createElement("objecten")

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.element)

        this.x = -130
        this.y = window.innerHeight - 280

    }
    
    public update() : void { 
        // console.log("Ball is moving")
        this.x += 2

        if(this.x > window.innerWidth) this.x = - 130

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }





    
}
