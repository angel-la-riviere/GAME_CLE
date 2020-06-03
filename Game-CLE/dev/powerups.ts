class Powerups {


    element : HTMLElement
    x : number = 0
    y : number = 0

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    constructor(color: string) {
        console.log(color)
        this.element = document.createElement("powerups")

        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.element)

        this.x = Math.random() * window.innerWidth - 50
        this.y = Math.random() * window.innerHeight - 50

    }
    
    public update() : void { 
        // console.log("Ball is moving")
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public powerup(){
        this.element.remove()
    }






    
}
