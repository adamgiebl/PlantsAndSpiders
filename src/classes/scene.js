import { canvas } from 'shared/canvas'

export class Scene {
    constructor(image) {
        this.image = image
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height)
    }
}
