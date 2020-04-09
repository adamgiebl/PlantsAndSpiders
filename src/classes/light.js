import { groundY } from 'shared/globalVariables'
import { canvas, maskCtx } from 'shared/canvas'
import { audioPlayer } from '../AudioPlayer'

export class Light {
    constructor(positionX, positionY, width, height, image, color, lightWidth) {
        this.width = width
        this.height = height
        this.x = positionX
        this.y = positionY
        this.lampCenter = {
            x: positionX + this.width / 2,
            y: positionY + this.height / 2
        }
        this.image = image
        this.turnedOn = true
        this.color = color
        this.lightWidth = lightWidth
        this.offset = 20
        this.isShot = false
    }
    drawLight(ctx) {
        if (this.turnedOn) {
            ctx.beginPath()
            ctx.moveTo(this.x + this.offset, this.height)
            ctx.lineTo(this.x - this.lightWidth, groundY)
            ctx.lineTo(this.x + this.width + this.lightWidth, groundY)
            ctx.lineTo(this.x + this.width - this.offset, this.height)
            ctx.closePath()
            ctx.fillStyle = this.color
            ctx.fill()
        }
    }
    drawBody(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    draw(ctx) {
        this.drawBody(ctx)
        this.drawLight(maskCtx)
    }
    onClick() {
        if (!this.isShot) {
            audioPlayer.playAudio('glass')
        }
        this.isShot = true
    }
}

export class LightFactory {
    constructor(width, height, image, color, lightWidth) {
        this.width = width
        this.height = height
        this.color = color
        this.image = image
        this.lightWidth = lightWidth
    }

    createLights(numberOfLights, lightMargin) {
        const lights = []
        const widthSum = this.width * numberOfLights + lightMargin * (numberOfLights - 1)
        const offset = (canvas.width - widthSum) / 2

        for (let i = 0; i < numberOfLights; i++) {
            lights.push(
                new Light(
                    offset + (this.width + (i === numberOfLights ? 0 : lightMargin)) * i,
                    0,
                    this.width,
                    this.height,
                    this.image,
                    this.color,
                    this.lightWidth
                )
            )
        }

        return lights
    }
}
