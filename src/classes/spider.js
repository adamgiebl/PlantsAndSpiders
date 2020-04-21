import { canvas, canvasCenter } from 'shared/canvas'
import { randomIntFromRange } from 'shared/helpers'
import { audioPlayer } from '../AudioPlayer'
import { loadImage, loadManifest } from './loaders'

export class Spider {
    constructor(manifest) {
        const { destination, position } = manifest
        this.manifest = manifest
        this.height = 50
        this.width = 50
        this.x = position.x
        this.y = position.y
        this.isShot = false
        this.hasKilledAPlant = false
        this.killer = {}
        this.deltaX = destination.x - this.x
        this.deltaY = destination.y - this.y
        this.angle = Math.atan2(this.deltaY, this.deltaX)
        this.splashAngle = 0
        this.velocityX = Math.cos(this.angle) * 1.0
        this.velocityY = Math.sin(this.angle) * 1.0
        this.direction = this.angle - Math.PI / 2
        this.distance = 0
    }
    draw(ctx) {
        if (!this.isShot && !this.hasKilledAPlant) {
            this.distance += 2
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
            ctx.rotate(this.direction)
            ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2)
            this.getFrame(ctx, `spider-${Math.floor(this.distance / 20) % this.manifest.spriteMap.size}`)
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            this.checkCollision()
        } else if (this.hasKilledAPlant) {
            //console.log('killedAPlant')
        } else {
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
            ctx.rotate(-this.splashAngle + Math.PI)
            ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2)
            ctx.drawImage(
                this.manifest.splashImage,
                this.x - 10,
                this.y - this.height,
                this.width + 20,
                this.height * 2
            )
            ctx.setTransform(1, 0, 0, 1, 0, 0)
        }
    }
    checkCollision() {
        this.manifest.plants.forEach(plant => {
            if (
                plant.plantBoundingRect.x < this.x + this.width &&
                plant.plantBoundingRect.x + plant.plantBoundingRect.width > this.x &&
                plant.plantBoundingRect.y < this.y + this.height &&
                plant.plantBoundingRect.y + plant.plantBoundingRect.height > this.y
            ) {
                console.log('collision')
                //console.log(plant)
                plant.shrink()
                this.hasKilledAPlant = true
            }
        })
    }
    getFrame(ctx, name) {
        const frame = this.manifest.spriteMap.get(name)
        if (frame) {
            ctx.drawImage(
                this.manifest.image,
                frame.x,
                frame.y,
                frame.width,
                frame.height,
                (this.x += this.velocityX * 1),
                (this.y += this.velocityY * 1),
                this.width,
                this.height
            )
        }
    }
    onClick() {
        audioPlayer.playAudio('splash')
        this.isShot = true
        this.killer = { x: this.manifest.character.upperBody.x, y: this.manifest.character.upperBody.y }
        const deltaX = this.x - (this.killer.x + this.manifest.character.upperBody.width / 2)
        const deltaY = this.y - (this.killer.y + 100)
        this.splashAngle = Math.atan2(deltaX, deltaY)
    }
}

export class SpiderFactory {
    constructor(manifest) {
        this.manifest = manifest
    }
    createSpiders(numberOfSpiders, character, plants) {
        this.manifest.character = character
        this.manifest.plants = plants
        let spiders = []
        for (let i = 0; i < numberOfSpiders; i++) {
            this.manifest.position = {
                x: randomIntFromRange(-200, canvas.width + 200),
                y: randomIntFromRange(-200, 0)
            }
            this.manifest.destination = {
                x: randomIntFromRange(canvasCenter.x - 200, canvasCenter.x + 200),
                y: canvas.height
            }
            spiders.push(new Spider(this.manifest))
        }
        return spiders
    }
}

export const loadSpiderFactory = async () => {
    const manifest = await loadManifest('spider')
    manifest.image = await loadImage(manifest.mainImageURL)
    manifest.splashImage = await loadImage(manifest.splashImageURL)
    const spriteMap = new Map()
    manifest.frames.forEach(frame => {
        spriteMap.set(frame.name, frame.rect)
    })
    manifest.spriteMap = spriteMap
    return new SpiderFactory(manifest)
}
