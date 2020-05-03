import KeyboardHandler from './KeyboardHandler'
import { canvas } from '/src/shared/canvas'

export const setUpKeyboard = character => {
    const keyboard = new KeyboardHandler()

    keyboard.addMapping('KeyD', keyState => {
        character.direction.right = keyState
    })

    keyboard.addMapping('KeyA', keyState => {
        character.direction.left = keyState
    })

    keyboard.addMapping('Space', keyState => {
        character.direction.jumping = keyState
    })

    keyboard.listenTo(window)
}

export const setUpMouse = character => {
    canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
        character.rotate(clientX, clientY)
    })
    canvas.addEventListener('click', e => {
        character.onClick()
    })
}
