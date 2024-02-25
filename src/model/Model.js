
import { config_4x4, config_5x5, config_6x6 } from "../configs"

export class Square {
    constructor (r, c, color) {
        this.row = r
        this.column = c
        this.color = color
    }
}

export class Board {
    constructor (config) {
        this.squares = []
        this.size = parseInt(config.numColumns)
        this.isEmpty = false
        
        for (let csq of config.baseSquares) {
            let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color)
            this.squares.push(sq)
        }
    }
}

export class Direction {
    constructor (cw) {
        this.clockwise = cw
    }
}

export class Group {
    constructor () {
        this.x = 0
        this.y = 0
    }
}

export default class Model {
    constructor() {
        this.configs = [ config_4x4, config_5x5, config_6x6 ] 
        this.currentConfig = 0
        this.board = new Board(this.configs[this.currentConfig])
        this.moveCount = 0
        this.victory = false
    }

    setConfig(configIndex) {
        if (configIndex >= 0 && configIndex < this.configs.length) {
            this.currentConfig = configIndex
            this.board = new Board(this.configs[this.currentConfig])
            this.moveCount = 0
            this.victory = false
        }
    }
}