import { ctx, canvas } from 'shared/canvas'
import { groundHeight } from 'shared/globalVariables'
import { setUpKeyboard } from '../input'

export class Character {
    constructor(upperBody, lowerBody) {
        this.direction = {
            left: false,
            right: false,
            jumping: false
        }
        this.isOnGround = true
        this.deltaX = 0
        this.deltaY = 0
        this.angle = 0
        this.flip = false
        this.lowerBody = {
            ...lowerBody
        }
        this.x = 0
        this.y = canvas.height - groundHeight - this.lowerBody.height + 5
        this.upperBody = {
            ...upperBody,
            x: this.x - 30,
            y: this.y - this.lowerBody.height + 70
        }
        setUpKeyboard(this)
    }
    draw(ctx) {
        this.upperBody = {
            ...this.upperBody,
            rotationPoint: {
                x: this.x + this.lowerBody.width / 2,
                y: this.y + this.upperBody.height / 2 - 70
            },
            x: this.x - 20,
            y: this.y - this.lowerBody.height + 100
        }
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.x, this.y, this.lowerBody.width, this.lowerBody.height)
        ctx.drawImage(this.lowerBody.image, this.x, this.y, this.lowerBody.width, this.lowerBody.height)
        ctx.translate(this.upperBody.rotationPoint.x, this.upperBody.rotationPoint.y)
        ctx.rotate(this.angle)
        ctx.translate(-this.upperBody.rotationPoint.x, -this.upperBody.rotationPoint.y)
        ctx.strokeStyle = 'limegreen'
        ctx.strokeRect(this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height)
        ctx.drawImage(
            this.upperBody.image,
            this.upperBody.x,
            this.upperBody.y,
            this.upperBody.width,
            this.upperBody.height
        )
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.upperBody.rotationPoint.x - 5, this.upperBody.rotationPoint.y - 5, 10, 10)
    }
    rotate(clientX, clientY) {
        const deltaX = this.x + this.upperBody.width / 2 - clientX
        const deltaY = this.y + this.upperBody.height / 2 - clientY
        this.angle = Math.atan2(deltaY, deltaX) + Math.PI
        if (this.angle > 1.5 && this.angle < 4.7) {
            //character should flip upperbody
            this.flip = true
        }
    }
}
