// window.addEventListener("load", () => {

//     let game = document.getElementsByTagName("game")[0]

//     let element = document.createElement("ball")
//     game.appendChild(element)

//     let ball = {
//         x: 100,
//         y: 100,
//         color: "Green"
//     }

//     ball.color = "yellow"
//     element.style.backgroundColor = ball.color 

//     gameLoop()

//     function gameLoop() {
//         ball.x = ball.x + 2
//         ball.y += 1

//         element.style.transform = `translate(${ball.x}px, ${ball.y}px)` 
        
//         requestAnimationFrame(gameLoop)
//     }
// })