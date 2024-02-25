
import React from 'react'
import './App.css'
import Model from './model/Model.js'
import redrawCanvas from './boundary/Boundary.js'
import reset from './controller/ResetController.js'
import choose from './controller/ChooseConfigController'
import process from './controller/GameController'
import rotate from './controller/RotateController'

function App() {
  const [model, setModel] = React.useState(new Model())
  const [redraw, forceRedraw] = React.useState(0)
  const [group, setGroup] = React.useState()
  const [victory, setVictory] = React.useState(false)

  const appRef = React.useRef(null)      // to be able to access "top level" app object
  const canvasRef = React.useRef(null)   // need to be able to refer to Canvas

  // identify WHAT STATE you monitor
  React.useEffect (() => {
    redrawCanvas(model, canvasRef.current, group, setVictory)
  }, [model, redraw, group])

  const handleClick = async (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect()

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left
    let y = e.clientY - canvasRect.top

    let result = await process(model, x, y)

    if (result.group.length > 0) {
      setGroup(result.group)
      model.moveCount += result.moveCount
      setVictory(result.victory)
      forceRedraw(redraw + 1)
    }
  }

  const chooseConfig = (configIndex) => {
    setGroup(null)
    choose(configIndex, model)
    forceRedraw(redraw + 1)
  }

  const handleRotate = async (group, clockwise, model) => {
    let newModel = await rotate(group, clockwise, model)
    setModel(newModel)
    forceRedraw(redraw + 1)
  }

  const resetHandler = () => {
    let newModel = reset(model.currentConfig)
    setGroup(null)
    setModel(newModel)
    setVictory(model.victory)
    forceRedraw(redraw + 1)
  }

  return (
    
    <div className="App">

  <div class="topnav">
  <button className="reset-button" data-testid="button-reset" onClick={(e) => resetHandler()} >Reset</button>
  <div className='welcome-message'>2x2 Madness App </div>
    <button class="quit-button">Quit</button>
  </div>

  <div class="main-content">
    <div class="canvas-container">
    <canvas tabIndex="1"  
        className="App-canvas"
        data-testid="canvas"
        ref={canvasRef}
        width="400"
        height="400"
        onClick={handleClick}
      />
    </div>
    <div className="config-buttons">
      <button data-testid="button-4x4" onClick={(e) => chooseConfig(0)}>4x4</button>
      <button data-testid="button-5x5" onClick={(e) => chooseConfig(1)}>5x5</button>
      <button data-testid="button-6x6" onClick={(e) => chooseConfig(2)}>6x6</button>
      <div className="action-buttons">
      <button className="rotate_button" data-testid="button-ccw" onClick={(e) => handleRotate(group, false, model)} disabled={victory} >Anti-Clockwise</button>
      <button className="rotate_button" data-testid="button-cw" onClick={(e) => handleRotate(group, true, model)} disabled={victory} >Clockwise</button>
    </div>
    <div>
      <p className="congratulations">MoveCount: { model.moveCount }</p>
      <h3 hidden={!victory} data-testid="victory-message">Congratulations! You completed the game.</h3>
    </div>
      </div>
    <br />
    
  </div>
    </div>
  )
}

export default App
