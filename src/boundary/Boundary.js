
const squareSize = 60
const circleRadius = 10

export default function redrawCanvas(model, canvasObj, group, setVictory) {
    const ctx = canvasObj.getContext('2d')

    let allSquares = model.board.squares

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height)  // assume square region
    
    // (1) SOMEHOW DRAW BOARD!!!

    // 400 x 400 AND this must support up to 6x6
    // if a square were 60 pixels

    const squareSize = 60

    model.board.squares.forEach((square) => {
        ctx.fillStyle = square.color
        ctx.fillRect(square.column * squareSize, square.row * squareSize, squareSize, squareSize)

        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.strokeRect(square.column * squareSize, square.row * squareSize, squareSize, squareSize)

        //(3) SOMEHOW DRAW CIRCLES!!!
        if(square.column > 0 && square.row > 0) {
            ctx.beginPath()
            ctx.arc(square.column * squareSize, square.row * squareSize, 10, 0, 2*Math.PI, false)
            ctx.fillStyle = 'white'
            ctx.fill()
            ctx.stroke()
        }
      })

      if (allSquares.some(square => square.color !== 'white')){
        if (group) {
            drawSelection(ctx, group, "red")
        }
      }

      if (checkVictory(model)) {
        setVictory(true)
      }
    
}

function drawSelection(ctx, group, color) {

    group.forEach((square) => {
        const boundaryX = (square.column) * squareSize
        const boundaryY = (square.row) * squareSize

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.strokeRect(boundaryX, boundaryY, squareSize, squareSize)
    })
    ctx.beginPath()
    ctx.arc(group[2].column * squareSize, group[1].row * squareSize, circleRadius, 0, 2*Math.PI, false)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.stroke()
}

//Checks whether all squares are empty
function checkVictory(model) {
    let squares = model.board.squares
    if (squares.some(square => square.color !== 'white')) {
        return false
    }
    return true
}