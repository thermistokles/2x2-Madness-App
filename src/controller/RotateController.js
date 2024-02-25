
export default async function rotate(group, direction, model) {

    let boardSquares = model.board.squares

    if (group){
        if (direction) {
            const colors = group.map(square => square.color)

            // Perform clockwise rotation of colors
            const rotatedColors = [
                colors[1], // Move the last color to the first position
                colors[2], // Move the first color to the second position
                colors[3], // Move the second color to the third position
                colors[0]  // Move the third color to the fourth position
            ]

            // Update the squares in the group with rotated colors
            group.forEach((square, index) => {
                square.color = rotatedColors[index]
            })
        }
        else {
            const colors = group.map(square => square.color)

            // Perform anticlockwise rotation of colors
            const rotatedColors = [
                colors[3], // Move the last color to the first position
                colors[0], // Move the first color to the second position
                colors[1], // Move the second color to the third position
                colors[2]  // Move the third color to the fourth position
            ]

            // Update the squares in the group with rotated colors
            group.forEach((square, index) => {
                square.color = rotatedColors[index]
            })
        }
        for (let i = 0; i < boardSquares.length; i++) {
            let currentSquare = boardSquares[i]
            group.forEach((changedSquare) => {
                if (currentSquare.row === changedSquare.row && currentSquare.column === changedSquare.column) {
                    boardSquares[i] = changedSquare
                }
            })
        }
        model.board.squares = boardSquares
        model.moveCount ++
    }
    return model
}