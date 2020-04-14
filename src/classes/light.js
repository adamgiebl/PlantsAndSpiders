import { groundY } from 'shared/globalVariables'
import { canvas, maskCtx } from 'shared/canvas'
import { audioPlayer } from '../AudioPlayer'
import { loadImage, loadManifest } from './loaders'

export class Light {
    constructor(positionX, positionY, width, height, image, color, lightWidth) {
        this.width = width
        this.height = height
        this.x = positionX
        this.y = positionY
        this.lampCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        this.turnedOn = true
        this.color = color
        this.lightWidth = lightWidth
        ;(this.image = image), (this.offset = 10)
        this.isShot = false
        this.perspective = 40
    }
    drawLight(ctx) {
        if (this.turnedOn) {
            ctx.beginPath()
            //top left
            ctx.moveTo(this.x + this.offset, this.y + this.height)
            //bottom left
            ctx.lineTo(this.x - this.lightWidth, canvas.height - 65)
            ctx.lineTo(this.x - this.lightWidth - this.perspective, canvas.height)
            //bottom right
            ctx.lineTo(this.x + +this.width + this.lightWidth + this.perspective, canvas.height)
            ctx.lineTo(this.x + this.width + this.lightWidth, canvas.height - 65)
            //top right
            ctx.lineTo(this.x + this.width - this.offset, this.y + this.height)
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
    constructor(manifest) {
        this.manifest = manifest
    }

    createLights(numberOfLights, lightMargin) {
        const { width, height, image, color, lightWidth } = this.manifest
        const lights = []
        const widthSum = width * numberOfLights + lightMargin * (numberOfLights - 1)
        const offset = (canvas.width - widthSum) / 2

        for (let i = 0; i < numberOfLights; i++) {
            lights.push(
                new Light(
                    offset + (width + (i === numberOfLights ? 0 : lightMargin)) * i,
                    0,
                    width,
                    height,
                    image,
                    color,
                    lightWidth
                )
            )
        }

        return lights
    }
}

export const loadLightFactory = async () => {
    const manifest = await loadManifest('light')
    manifest.image = await loadImage(manifest.mainImageURL)
    return new LightFactory(manifest)
}
