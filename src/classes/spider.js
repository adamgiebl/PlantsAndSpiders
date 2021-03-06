import { canvas, canvasCenter } from '/src/shared/canvas'
import { randomIntFromRange } from '/src/shared/helpers'
import { audioPlayer } from '../AudioPlayer'
import { loadImage, loadManifest } from './loaders'

export class Spider {
    constructor(manifest) {
        const { destination, position, width, height, speed } = manifest
        this.manifest = manifest
        this.height = width
        this.width = height
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
        this.speed = speed
        this.points = {
            shown: false,
            value: Math.floor(1000 / this.width),
            y: this.y,
            speed: 2,
            multiplier: 1
        }
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
            if (this.points.shown) {
                this.drawPoints(ctx)
            }
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
                plant.shrink()
                audioPlayer.playAudio('spiderBite')
                this.hasKilledAPlant = true
                window.game.state.spidersKilled += 1
                if (window.game.state.spidersKilled === window.game.levels[window.game.state.level].numberOfSpiders) {
                    window.game.state.level++
                }
                const res = this.manifest.plants.reduce((acc, plant) => {
                    return acc + plant.size
                }, 0)
                if (res === this.manifest.plants.length * -1) {
                    window.game.state.gameOver = true
                }
            }
        })
    }
    drawPoints(ctx) {
        this.points.y -= this.points.speed
        ctx.font = `${this.width - 10}px Anton`
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(Math.floor(this.points.value * this.points.multiplier), this.x + this.width / 2, this.points.y)
        if (this.points.y < 0) {
            this.points.shown = false
        }
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
                (this.x += this.velocityX * this.speed),
                (this.y += this.velocityY * this.speed),
                this.width,
                this.height
            )
        }
    }
    onClick() {
        window.game.state.streak += 1
        window.game.state.spidersKilledTotal += 1
        window.game.state.spidersKilled += 1
        this.points.multiplier = 1 + window.game.state.streak * 0.1
        window.game.state.score += Math.floor(this.points.value * this.points.multiplier)
        if (window.game.state.streak > window.game.state.biggestStreak) {
            window.game.state.biggestStreak = window.game.state.streak
        }
        setTimeout(() => audioPlayer.playAudio('splash'), 100)
        this.isShot = true
        this.points.shown = true
        this.points.y = this.y
        this.killer = { x: this.manifest.character.upperBody.x, y: this.manifest.character.upperBody.y }
        const deltaX = this.x - (this.killer.x + this.manifest.character.upperBody.width / 2)
        const deltaY = this.y - (this.killer.y + 100)
        this.splashAngle = Math.atan2(deltaX, deltaY)
        if (window.game.state.spidersKilled === window.game.levels[window.game.state.level].numberOfSpiders) {
            window.game.state.level++
        }
    }
}

export class SpiderFactory {
    constructor(manifest) {
        this.manifest = manifest
    }
    createSpiders(numberOfSpiders, character, plants) {
        this.manifest.character = character
        this.manifest.plants = plants
        this.manifest.speed = window.game.config.settings.spiders[window.game.difficulty].speed
        let spiders = []
        for (let i = 0; i < numberOfSpiders; i++) {
            this.manifest.position = {
                x: randomIntFromRange(-200, canvas.width + 200),
                y: randomIntFromRange(-200, 0)
            }
            const size = randomIntFromRange(25, 80)
            this.manifest.width = size
            this.manifest.height = size

            //spider will pick a random plant and attack it
            const plant = plants[randomIntFromRange(0, plants.length - 1)]
            this.manifest.destination = {
                x: plant.x + plant.width / 2,
                y: plant.y
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

document.querySelectorAll('audio').forEach(function (audioElement) {
    if (audioElement.muted) {
        audioElement.muted = false
    } else {
        audioElement.muted = true
    }
})
