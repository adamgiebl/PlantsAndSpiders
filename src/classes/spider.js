import { canvas, canvasCenter } from 'shared/canvas'
import { randomIntFromRange } from 'shared/helpers'
import { audioPlayer } from '../AudioPlayer'

export class Spider {
    constructor(positionX, positionY, destinationX, destinationY, character) {
        this.height = 50
        this.width = 50
        this.x = positionX
        this.y = positionY
        this.destinationX = destinationX
        this.destinationY = destinationY
        this.isShot = false
        this.character = character
        this.killer = {}

        this.deltaX = destinationX - positionX
        this.deltaY = destinationY - positionY
        this.angle = Math.atan2(this.deltaY, this.deltaX)
        this.splashAngle = 0
        this.velocityX = Math.cos(this.angle) * 1.0
        this.velocityY = Math.sin(this.angle) * 1.0
        this.direction = this.angle - Math.PI / 2
    }
    onClick() {
        audioPlayer.playAudio('splash')
        this.isShot = true
        this.killer = { x: this.character.upperBody.x, y: this.character.upperBody.y }
        const deltaX = this.x - (this.killer.x + this.character.upperBody.width / 2)
        const deltaY = this.y - (this.killer.y + 100)
        this.splashAngle = Math.atan2(deltaX, deltaY)
    }
}

export class SpiderFactory {
    constructor(width, height, image) {
        this.width = width
        this.height = height
        this.image = image
    }
    createSpiders(numberOfSpiders, character) {
        let spiders = []
        for (let i = 0; i < numberOfSpiders; i++) {
            spiders.push(
                new Spider(
                    randomIntFromRange(-200, canvas.width + 200),
                    randomIntFromRange(-200, 0),
                    randomIntFromRange(canvasCenter.x - 200, canvasCenter.x + 200),
                    canvas.height,
                    character
                )
            )
        }
        return spiders
    }
}
