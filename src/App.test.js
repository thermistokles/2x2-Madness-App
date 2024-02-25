
import Model from './model/Model.js'
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import App from './App.js'

//Tests the presence of components
//Welcome text
test('Validate Welcome text', () => {
    render(<App />)
    const textElement = screen.getByText('2x2 Madness App')
    expect(textElement).toBeInTheDocument()
})

//Canvas
//Check whether canvas is drawn correctly and has all the required colors
test('Canvas is drawn correctly', () => {
    render(<App />)
    const canvas = screen.getByTestId('canvas')
  
    // Now you can assert the canvas has been drawn correctly
    expect(canvas).toBeInTheDocument()
  
    // You can also check specific attributes or properties of the canvas
    expect(canvas).toHaveAttribute('width', '400')
    expect(canvas).toHaveAttribute('height', '400')
  
    const ctx = canvas.getContext('2d')

    // Track the colors found on the canvas
    const pixels = [[24, 16], [90, 28], [149, 23], [209, 25]]
    const colors = ["rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(128, 128, 128)", "rgb(0, 0, 255)"]

    //Check the colors of each square
    for (let i=0; i < pixels.length; i++){
        const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
        const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
        expect(colors[i]).toBe(color)
    }
  })

  //Test to check select group functionality
  test('Group is selected', async () => {
    render(<App />)
    const canvas = screen.getByTestId('canvas')
  
    // Now you can assert the canvas has been drawn correctly
    expect(canvas).toBeInTheDocument()

    const ctx = canvas.getContext('2d')

    act(() => {
        fireEvent.click(canvas, { clientX: 182, clientY: 119, screenX: 1637, screenY: 269 })
      })
      await new Promise(resolve => setTimeout(resolve, 100))

    const pixelData = ctx.getImageData(182, 119, 1, 1).data
    const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`

    expect(color).toBe("rgb(255, 0, 0)")
  })



//Config buttons
test('Check if "4x4", "5x5", and "6x6" buttons are present', () => {
    render(<App />)
  
    const button4x4 = screen.getByText('4x4')
    const button5x5 = screen.getByText('5x5')
    const button6x6 = screen.getByText('6x6')
  
    expect(button4x4).toBeInTheDocument()
    expect(button5x5).toBeInTheDocument()
    expect(button6x6).toBeInTheDocument()
  })

  //Rotate buttons
  test('Check if rotate buttons are present', () => {
    render(<App />)
  
    const antiClockwiseButton = screen.getByText('Anti-Clockwise')
    const clockwiseButton = screen.getByText('Clockwise')
  
    expect(antiClockwiseButton).toBeInTheDocument()
    expect(clockwiseButton).toBeInTheDocument()
  })

  //Reset button
  test('Check if Reset button is present', () => {
    render(<App />)
  
    const resetButton = screen.getByText('Reset')
    expect(resetButton).toBeInTheDocument()
  })

  //Default config
  test('validate config is default one', () => {
    let m = new Model()
    expect(m.currentConfig).toEqual(0)
})

//Test to validate button functionality
//4x4 button
test('Clicking "4x4" config button', async () => {
    render(<App />)
    const canvas = screen.getByTestId('canvas')
    const button4x4 = screen.getByTestId('button-4x4')

    const ctx = canvas.getContext('2d')

    act(() => {
        fireEvent.click(button4x4)
      })
      await new Promise(resolve => setTimeout(resolve, 100))

    // Track the colors found on the canvas
    const pixels = [[24, 16], [90, 28], [149, 23], [209, 25]]
    const colors = ["rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(128, 128, 128)", "rgb(0, 0, 255)"]

    //Check the colors of each square
    for (let i=0; i < pixels.length; i++){
        const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
        const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
        expect(colors[i]).toBe(color)
    }
  })

    //5x5 button
    test('Clicking "5x5" config button', async () => {
        render(<App />)
        const canvas = screen.getByTestId('canvas')
        const button5x5 = screen.getByTestId('button-5x5')

        const ctx = canvas.getContext('2d')

        act(() => {
            fireEvent.click(button5x5)
        })
        await new Promise(resolve => setTimeout(resolve, 100))

        // Track the colors found on the canvas
        const pixels = [[22, 27], [83, 27], [149, 27], [205, 27]]
        const colors = ["rgb(255, 165, 0)", "rgb(255, 0, 0)", "rgb(128, 0, 128)", "rgb(0, 128, 0)"]

        //Check the colors of each square
        for (let i=0; i < pixels.length; i++){
            const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
            const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
            expect(colors[i]).toBe(color)
        }
    })

    //6x6 button
    test('Clicking "6x6" config button', async () => {
        render(<App />)
        const canvas = screen.getByTestId('canvas')
        const button6x6 = screen.getByTestId('button-6x6')

        const ctx = canvas.getContext('2d')

        act(() => {
            fireEvent.click(button6x6)
        })
        await new Promise(resolve => setTimeout(resolve, 100))

        // Track the colors found on the canvas
        const pixels = [[23, 30], [82, 22], [149, 27], [205, 27], [264, 27], [329, 32]]
        const colors = ["rgb(255, 0, 0)", "rgb(255, 192, 203)", "rgb(128, 0, 128)", "rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"]

        //Check the colors of each square
        for (let i=0; i < pixels.length; i++){
            const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
            const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
            expect(color).toBe(colors[i])
        }
    })

    //Rotate Anti clockwisebutton
    test('Rotate anti-clockwise', async () => {
        render(<App />)
        const canvas = screen.getByTestId('canvas')
        const buttonccw = screen.getByTestId('button-ccw')

        const ctx = canvas.getContext('2d')

        //select rotated group
        act(() => {
            fireEvent.click(canvas, { clientX: 56, clientY: 56, screenX: 1637, screenY: 269 })
        })
        await new Promise(resolve => setTimeout(resolve, 100))

        act(() => {
            fireEvent.click(buttonccw)
        })
        await new Promise(resolve => setTimeout(resolve, 100))

        // Track the colors of rotated group
        const pixels = [[24, 16], [90, 28], [30, 84], [89, 88]]
        //]
        const colors = ["rgb(255, 255, 0)", "rgb(128, 128, 128)", "rgb(0, 128, 0)", "rgb(0, 128, 0)"]
        //]

        //Check the colors of each square
        for (let i=0; i < pixels.length; i++){
            const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
            const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
            expect(color).toBe(colors[i])
        }
    })

    //Rotate clockwisebutton
    test('Rotate clockwise', async () => {
      render(<App />)
      const canvas = screen.getByTestId('canvas')
      const buttoncw = screen.getByTestId('button-cw')

      const ctx = canvas.getContext('2d')

      //select group
      act(() => {
          fireEvent.click(canvas, { clientX: 56, clientY: 56, screenX: 1637, screenY: 269 })
      })
      await new Promise(resolve => setTimeout(resolve, 100))

      //Rotate
      act(() => {
          fireEvent.click(buttoncw)
      })
      await new Promise(resolve => setTimeout(resolve, 100))

      // Track the colors of rotated group
      const pixels = [[24, 16], [90, 28], [30, 84], [89, 88]]
      //]
      const colors = ["rgb(0, 128, 0)", "rgb(0, 128, 0)", "rgb(128, 128, 128)", "rgb(255, 255, 0)"]
      //]

      //Check the colors of each square
      for (let i=0; i < pixels.length; i++){
          const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
          const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
          expect(color).toBe(colors[i])
      }
  })

  //Reset button
  test('Reset', async () => {
    render(<App />)
    const canvas = screen.getByTestId('canvas')
    const buttonccw = screen.getByTestId('button-ccw')
    const reset = screen.getByTestId('button-reset')

    const ctx = canvas.getContext('2d')

    //select rotated group
    act(() => {
      fireEvent.click(canvas, { clientX: 56, clientY: 56, screenX: 1637, screenY: 269 })
    })
    await new Promise(resolve => setTimeout(resolve, 100))

  act(() => {
      fireEvent.click(buttonccw)
  })
  await new Promise(resolve => setTimeout(resolve, 100))

  act(() => {
    fireEvent.click(reset)
})
await new Promise(resolve => setTimeout(resolve, 100))

    // Track the colors of rotated group
    const pixels = [[24, 16], [90, 28], [149, 23], [209, 25]]
    const colors = ["rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(128, 128, 128)", "rgb(0, 0, 255)"]

    //Check the colors of each square
    for (let i=0; i < pixels.length; i++){
        const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
        const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
        expect(color).toBe(colors[i])
    }
})

//Test functionality
//Remove color
test('Remove color', async () => {
  render(<App />)
  const canvas = screen.getByTestId('canvas')
  const buttoncw = screen.getByTestId('button-cw')
  const buttonccw = screen.getByTestId('button-ccw')

  const ctx = canvas.getContext('2d')

  //select group
  act(() => {
    fireEvent.click(canvas, { clientX: 56, clientY: 56, screenX: 1637, screenY: 269 })
  })
  await new Promise(resolve => setTimeout(resolve, 100))

  //Rotate
  act(() => {
      fireEvent.click(buttonccw)
  })
  await new Promise(resolve => setTimeout(resolve, 100))

  //select another group
  act(() => {
    fireEvent.click(canvas, { clientX: 56, clientY: 186, screenX: 1637, screenY: 269 })
  })
  await new Promise(resolve => setTimeout(resolve, 100))

  //Rotate
  act(() => {
      fireEvent.click(buttoncw)
  })
  await new Promise(resolve => setTimeout(resolve, 100))

  //select removed group
  act(() => {
    fireEvent.click(canvas, { clientX: 59, clientY: 118, screenX: 1637, screenY: 269 })
  })
  await new Promise(resolve => setTimeout(resolve, 100))

  // Track the colors of rotated group
  const pixels = [[30, 87], [87, 90], [32, 147], [86, 147]]
  const white = "rgb(255, 255, 255)"

  //Check the colors of each square
  for (let i=0; i < pixels.length; i++){
      const pixelData = ctx.getImageData(pixels[i][0], pixels[i][1], 1, 1).data
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
      expect(color).toBe(white)
  }
})

describe('Victory condition', () => {
  it('Changes victory state directly', () => {
    // Render the component
    const getByTestId = render(<App />);

    // Access the component's state and update it directly
    App.defaultProps = {
      ...App.defaultProps,
      initialVictory: true, // Set the initial state value to 5
    };

    const victoryMessage = screen.getByText('Congratulations! You completed the game.');
    expect(victoryMessage).toBeInTheDocument();
  });
});
