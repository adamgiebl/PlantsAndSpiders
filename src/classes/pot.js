import { groundY } from 'shared/globalVariables'
import { canvas } from 'shared/canvas'

export class PotFactory {
    constructor(width, height, image, plantImages) {
        this.width = width
        this.height = height
        this.image = image
        this.plantImages = plantImages
    }
    createPots(numberOfPots, potMargin) {
        const pots = []
        const widthSum = this.width * numberOfPots + potMargin * (numberOfPots - 1)
        const offset = (canvas.width - widthSum) / 2

        for (let i = 0; i < numberOfPots; i++) {
            pots.push(
                new Pot(
                    offset + (this.width + (i === numberOfPots ? 0 : potMargin)) * i,
                    groundY - this.height,
                    this.width,
                    this.height,
                    this.image,
                    this.plantImages
                )
            )
        }

        return pots
    }
}

export class Pot {
    constructor(positionX, positionY, width, height, image, plantImages) {
        this.width = width
        this.height = height
        this.x = positionX
        this.y = positionY - 15
        this.size = 0
        this.plantImages = plantImages
        this.plantSize = { width: 200, height: 400 }
        this.potCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        this.image = image
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        ctx.drawImage(
            this.plantImages[this.size],
            this.potCenter.x - this.plantSize.width / 2,
            this.y - this.plantSize.height,
            this.plantSize.width,
            this.plantSize.height
        )
    }
    grow() {
        if (this.size < this.plantImages.length - 1) {
            this.size++
        }
    }
    onClick() {
        this.grow()
    }
}
