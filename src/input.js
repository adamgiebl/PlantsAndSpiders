import KeyboardHandler from './KeyboardHandler'

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
