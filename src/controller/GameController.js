
const squareSize = 60
const circleRadius = 10

let selectedCircle = null
let groupArr = []
const neighbours = [
    { dx: -1, dy: -1 },  // upper right
    { dx: -1, dy: 0 },   // upper left
    { dx: 0, dy: 0 },   // bottom left
    { dx: 0, dy: -1 },  // bottom right
]


export default async function process(model, x, y) {

    console.log ("DO SOMETHING with " + x + "," + y)

    let moveCount = 0
    let victory = false
    let allSquares = model.board.squares

    

    if (allSquares.some(square => square.color !== 'white')) {
        //When a circle is clicked, it should highlight the group
        // Iterate through the squares in the model
        model.board.squares.forEach((square) => {
            // Calculate the coordinates of the circle's center based on the square's position

            if (square.row > 0 && square.column > 0){
                const circleCenterX = square.column * squareSize
                const circleCenterY = square.row * squareSize

                // Calculate the distance between the click point and the circle's center
                const distance = Math.sqrt((x - circleCenterX) ** 2 + (y - circleCenterY) ** 2)

                // Check if the distance is less than or equal to the circle's radius
                if (distance <= circleRadius) {
                        if (selectedCircle) {
                            groupArr = []
                        }
                        selectedCircle = square
            
                        groupArr = handleSelect(model, selectedCircle)
                        removeColor(groupArr, model)

                        if (groupArr.every(square => square.color === 'white')) {
                            moveCount ++
                        }
                }
            }
        })
    }
    return {group: groupArr, moveCount, victory}
}

function handleSelect(model, sq) {
    for (const neighbour of neighbours) {
        const neighbor = getNeighbor(model, sq, neighbour)
        if (neighbor) {
            groupArr.push(neighbor)
        }
    }
    return groupArr
}

//function removeColor(groupArr, setSelectedGroups, model) {
function removeColor(group) {

    const firstSquareColor = group[0].color
    const allSquaresHaveSameColor = group.every(square => square.color === firstSquareColor)

    if (allSquaresHaveSameColor) {
        // Change the color of all squares to white
        group.forEach(square => {
        square.color = 'white'
        })
    }
    return group
}

function getNeighbor(model, square, offset) {
    const neighborX = square.column + offset.dx
    const neighborY = square.row + offset.dy
    return model.board.squares.find(sq => sq.column === neighborX && sq.row === neighborY)
}

