import { groundY } from 'shared/canvas'
import { canvas, maskCtx } from 'shared/canvas'
import { audioPlayer } from '../AudioPlayer'
import { loadImage, loadManifest } from './loaders'

export class Light {
    constructor(id, positionX, positionY, width, height, image, color, lightWidth, turnOn, numberOfLights) {
        this.id = id
        this.width = width
        this.height = height
        this.x = positionX
        this.y = positionY
        this.lampCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        this.turnedOn = false
        this.color = color
        this.lightWidth = lightWidth
        this.image = image
        this.offset = 10
        this.isShot = false
        this.perspective = 40
        this.turnOn = turnOn
        this.numberOfLights = numberOfLights
    }
    drawLight(ctx) {
        if (this.turnedOn) {
            ctx.beginPath()
            //top left
            ctx.moveTo(this.x + this.offset, this.y + this.height)
            //bottom left
            if (this.id == 0) {
                ctx.lineTo(this.x - this.lightWidth, canvas.height - 65)
                ctx.lineTo(this.x - this.lightWidth - this.perspective, canvas.height)
            } else {
                ctx.lineTo(this.x - this.lightWidth, canvas.height)
            }
            //bottom right
            if (this.id == this.numberOfLights - 1) {
                ctx.lineTo(this.x + +this.width + this.lightWidth + this.perspective, canvas.height)
                ctx.lineTo(this.x + this.width + this.lightWidth, canvas.height - 65)
            } else {
                ctx.lineTo(this.x + this.width + this.lightWidth, canvas.height)
            }
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

    createLights(numberOfLights, delay) {
        const { width, height, image, color, lightWidth, lightMargin } = this.manifest
        const lights = []
        const widthSum = width * numberOfLights + lightMargin * (numberOfLights - 1)
        const offset = (canvas.width - widthSum) / 2

        for (let i = 0; i < numberOfLights; i++) {
            const turnOn = i + delay
            const light = new Light(
                i,
                offset + (width + (i === numberOfLights ? 0 : lightMargin)) * i,
                0,
                width,
                height,
                image,
                color,
                lightWidth,
                turnOn,
                numberOfLights
            )
            lights.push(light)
        }

        return lights
    }
}

export const loadLightFactory = async () => {
    const manifest = await loadManifest('light')
    manifest.image = await loadImage(manifest.mainImageURL)
    return new LightFactory(manifest)
}
