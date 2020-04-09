import { ctx, canvas } from 'shared/canvas'
import { groundHeight } from 'shared/globalVariables'
import { setUpKeyboard } from '../input'

export class Character {
    constructor(upperBody, lowerBody) {
        this.x = 0
        this.y = canvas.height - groundHeight - this.lowerHeight + 5
        this.direction = {
            left: false,
            right: false,
            jumping: false
        }
        this.isOnGround = true
        this.deltaX = 0
        this.deltaY = 0
        this.angle = 0
        this.upperBody = {
            ...upperBody,
            x: this.x,
            y: this.y - this.lowerHeight + 70
        }
        this.lowerBody = {
            ...upperBody
        }
        setUpKeyboard(this)
    }
    draw(ctx) {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.x, this.y, this.lowerWidth, this.lowerHeight)
        ctx.drawImage(this.lowerBody.image, this.x, this.y, this.lowerBody.width, this.lowerBody.height)
        ctx.translate(this.x, this.y + this.upperBody.height / 2 - 70)
        ctx.rotate(this.angle)
        ctx.translate(-this.x, -this.y - this.upperBody.height / 2 + 70)
        ctx.strokeStyle = 'limegreen'
        ctx.strokeRect(this.x, this.y - this.lowerBody.height + 70, this.upperBody.width, this.upperBody.height)
        ctx.drawImage(
            this.upperBody.image,
            this.x,
            this.y - this.lowerBody.height + 70,
            this.upperBody.width,
            this.upperBody.height
        )
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillRect(this.x - 5, this.y + this.upperBody.height / 2 - 70 - 5, 10, 10)
    }
    rotate(clientX, clientY) {
        const deltaX = this.x + this.upperWidth / 2 - clientX
        const deltaY = this.y + this.upperHeight / 2 - clientY
        this.angle = Math.atan2(deltaY, deltaX) + Math.PI
    }
}
