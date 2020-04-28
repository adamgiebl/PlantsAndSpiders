import { canvas } from 'shared/canvas'
import { groundHeight } from 'shared/canvas'
import { setUpKeyboard, setUpMouse } from '../input'
import { audioPlayer } from '../AudioPlayer'
import { loadImage, loadManifest, loadAnimations } from './loaders'
import { groundY } from 'shared/canvas'

export class Character {
    constructor(manifest) {
        this.manifest = manifest
        this.direction = {
            left: false,
            right: false,
            jumping: false
        }
        this.isOnGround = true
        this.deltaX = 0
        this.deltaY = 0
        this.angle = 0
        this.velocityX = 6
        this.velocityY = 0
        this.gravity = 0.6
        this.flip = false
        this.shot = false
        this.distance = 0
        this.ready = false
        this.lowerBody = {
            ...this.manifest.lowerBody,
            runningAnimation: this.manifest.animations.get('running'),
            jumpingAnimation: this.manifest.animations.get('jumping')
        }
        this.upperBody = {
            ...this.manifest.upperBody,
            x: this.x - 30,
            y: this.y - this.lowerBody.height + 70
        }
        this.x = 0
        this.y = canvas.height - groundHeight - this.lowerBody.height + 5
        this.flashAnimation = {
            active: false,
            duration: 3,
            frame: 0,
            image: this.manifest.flashImage
        }
        this.shootingAnimation = {
            active: false,
            duration: 4,
            frame: 0,
            size: 5
        }
    }
    draw(ctx) {
        this.upperBody = {
            ...this.upperBody,
            rotationPoint: {
                x: this.x + this.lowerBody.width / 2,
                y: this.y + 25
            },
            x: this.x - 25,
            y: this.y - this.lowerBody.height + (this.flip ? 160 : 100)
        }
        ctx.strokeStyle = 'red'
        //ctx.strokeRect(this.x, this.y, this.lowerBody.width, this.lowerBody.height)
        this.getFrame(ctx, `walk-${Math.floor(this.distance / 20) % this.lowerBody.runningAnimation.size}`)
        //this.getFrame(ctx, 'walk-1')
        ctx.translate(this.upperBody.rotationPoint.x, this.upperBody.rotationPoint.y)
        ctx.rotate(this.angle)
        ctx.translate(-this.upperBody.rotationPoint.x, -this.upperBody.rotationPoint.y)
        ctx.strokeStyle = 'limegreen'
        this.runShootingAnimation()
        ctx.drawImage(
            this.flip ? this.upperBody.imageFlipped : this.upperBody.image,
            this.upperBody.x,
            this.upperBody.y,
            this.upperBody.width,
            this.upperBody.height
        )
        //ctx.strokeRect(this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = 'blue'
        //d ctx.fillRect(this.upperBody.rotationPoint.x - 5, this.upperBody.rotationPoint.y - 5, 10, 10)
    }
    move() {
        this.velocityY += this.gravity
        this.y += this.velocityY

        if (this.y + this.lowerBody.height >= groundY) {
            this.y = groundY - this.lowerBody.height
            this.isOnGround = true
            this.velocityY = 0.0
        }

        if (this.direction.left) {
            if (this.x > 0) {
                this.x -= this.velocityX
                this.distance += this.velocityX
            }
        } else if (this.direction.right) {
            if (this.x < canvas.width - this.upperBody.width) {
                this.x += this.velocityX
                this.distance += this.velocityX
            }
        } else {
            if (this.ready) this.distance = 0
        }
        if (this.direction.jumping) {
            if (this.isOnGround) {
                this.velocityY = -12.0
                this.isOnGround = false
            }
        }
    }
    getFrame(ctx, name) {
        if (this.isOnGround) {
            const frame = this.lowerBody.runningAnimation.get(name)
            if (frame) {
                ctx.drawImage(
                    this.lowerBody.spriteSheet,
                    frame.x,
                    this.flip ? frame.y + frame.height : frame.y,
                    frame.width,
                    frame.height,
                    this.x,
                    this.y,
                    this.lowerBody.width,
                    this.lowerBody.height
                )
            } else {
                ctx.drawImage(
                    this.lowerBody.spriteSheet,
                    frame.x,
                    this.flip ? frame.y + frame.height : frame.y,
                    frame.width,
                    frame.height,
                    this.x,
                    this.y,
                    this.lowerBody.width,
                    this.lowerBody.height
                )
            }
        } else {
            const frame = this.lowerBody.jumpingAnimation.get('jump-0')
            ctx.drawImage(
                this.lowerBody.spriteSheet,
                frame.x,
                this.flip ? frame.y + frame.height : frame.y,
                frame.width,
                frame.height,
                this.x,
                this.y,
                this.lowerBody.width,
                this.lowerBody.height
            )
        }
    }
    drawFlash(maskCtx) {
        if (this.flashAnimation.active == true) {
            if (this.flashAnimation.frame >= this.flashAnimation.duration) {
                this.flashAnimation.frame = 0
                this.flashAnimation.active = false
            } else {
                this.flashAnimation.frame++
                maskCtx.fillStyle = 'rgba(249, 191, 0, 0.1)'
                maskCtx.fillRect(0, 0, canvas.width, canvas.height)
                maskCtx.translate(this.upperBody.rotationPoint.x, this.upperBody.rotationPoint.y)
                maskCtx.rotate(this.angle)
                maskCtx.translate(-this.upperBody.rotationPoint.x, -this.upperBody.rotationPoint.y)
                maskCtx.strokeStyle = 'limegreen'
                //ctx.strokeRect(this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height)
                maskCtx.drawImage(
                    this.flashAnimation.image,
                    this.upperBody.x + this.upperBody.width,
                    this.upperBody.y + (this.flip ? 0 : 100),
                    this.upperBody.width,
                    this.upperBody.height / 2
                )
                maskCtx.setTransform(1, 0, 0, 1, 0, 0)
            }
        }
    }
    runShootingAnimation() {
        if (this.shootingAnimation.active) {
            if (this.shootingAnimation.frame >= this.shootingAnimation.duration) {
                this.shootingAnimation.frame = 0
                this.shootingAnimation.active = false
            } else {
                this.shootingAnimation.frame++
                this.upperBody.x = this.upperBody.x - this.shootingAnimation.size * this.shootingAnimation.frame
            }
        }
    }
    rotate(clientX, clientY) {
        const deltaX = this.x + this.upperBody.width / 2 - clientX
        const deltaY = this.y + this.upperBody.height / 2 - clientY
        this.angle = Math.atan2(deltaY, deltaX) + Math.PI
        if (this.angle > 1.5 && this.angle < 4.7) {
            this.flip = true
        } else {
            this.flip = false
        }
    }
    onClick() {
        audioPlayer.playAudio('gunshot')
        this.flashAnimation.active = true
        this.shootingAnimation.active = true
    }
    epicEntrance() {
        return new Promise((resolve, reject) => {
            this.x = -this.upperBody.width

            const entering = setInterval(() => {
                if (this.x < canvas.width / 7) {
                    this.x += 1
                    this.distance += 2
                } else {
                    clearInterval(entering)
                    setUpKeyboard(this)
                    setUpMouse(this)
                    this.ready = true
                    resolve()
                }
            }, 10)
        })
    }
}

export const loadCharacter = async () => {
    const manifest = await loadManifest('character')
    manifest.lowerBody = {
        ...manifest.lowerBody,
        spriteSheet: await loadImage(manifest.lowerBody.spriteSheetURL)
    }
    manifest.upperBody = {
        ...manifest.upperBody,
        image: await loadImage(manifest.upperBody.imageURL),
        imageFlipped: await loadImage(manifest.upperBody.flippedImageURL)
    }
    manifest.flashImage = await loadImage(manifest.flashImageURL)
    manifest.animations = loadAnimations(manifest.animationsToBeLoaded)
    return new Character(manifest)
}
