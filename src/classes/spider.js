import { canvas, canvasCenter } from 'shared/canvas'
import { randomIntFromRange } from 'shared/helpers'
import { audioPlayer } from '../AudioPlayer'
import { loadImage, loadManifest } from './loaders'

export class Spider {
    constructor(positionX, positionY, destinationX, destinationY, image, splash, character) {
        this.height = 50
        this.width = 50
        this.x = positionX
        this.y = positionY
        this.destinationX = destinationX
        this.destinationY = destinationY
        this.isShot = false
        this.character = character
        this.killer = {}
        this.image = image

        this.deltaX = destinationX - positionX
        this.deltaY = destinationY - positionY
        this.angle = Math.atan2(this.deltaY, this.deltaX)
        this.splash = splash
        this.splashAngle = 0
        this.velocityX = Math.cos(this.angle) * 1.0
        this.velocityY = Math.sin(this.angle) * 1.0
        this.direction = this.angle - Math.PI / 2
    }
    draw(ctx) {
        if (!this.isShot) {
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
            ctx.rotate(this.direction)
            ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2)
            this.getImage(ctx)
            ctx.setTransform(1, 0, 0, 1, 0, 0)
        } else {
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
            ctx.rotate(-this.splashAngle + Math.PI)
            ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2)
            ctx.drawImage(this.splash, this.x - 10, this.y - this.height, this.width + 20, this.height * 2)
            ctx.setTransform(1, 0, 0, 1, 0, 0)
        }
    }
    getImage(ctx) {
        ctx.drawImage(
            this.image,
            0,
            0,
            130,
            150,
            (this.x += this.velocityX * 1),
            (this.y += this.velocityY * 1),
            this.width,
            this.height
        )
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
    constructor(manifest) {
        this.manifest = manifest
    }
    createSpiders(numberOfSpiders, character) {
        const { image, splashImage, width, height } = this.manifest
        let spiders = []
        for (let i = 0; i < numberOfSpiders; i++) {
            spiders.push(
                new Spider(
                    randomIntFromRange(-200, canvas.width + 200),
                    randomIntFromRange(-200, 0),
                    randomIntFromRange(canvasCenter.x - 200, canvasCenter.x + 200),
                    canvas.height,
                    image,
                    splashImage,
                    character
                )
            )
        }
        return spiders
    }
}

export const loadSpiderFactory = async () => {
    const manifest = await loadManifest('spider')
    manifest.image = await loadImage(manifest.mainImageURL)
    manifest.splashImage = await loadImage(manifest.splashImageURL)
    return new SpiderFactory(manifest)
}
