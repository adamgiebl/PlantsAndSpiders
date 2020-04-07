import { canvas, canvasCenter } from 'shared/canvas'
import { randomIntFromRange } from 'shared/helpers'

export class Spider {
    constructor(positionX, positionY, destinationX, destinationY) {
        this.height = 50;
        this.width = 50;
        this.x = positionX;
        this.y = positionY;
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.isDead = false;

        this.deltaX = destinationX - positionX;
        this.deltaY = destinationY - positionY;
        this.angle = Math.atan2(this.deltaY, this.deltaX);
        this.velocityX = Math.cos(this.angle) * 1.0;
        this.velocityY = Math.sin(this.angle) * 1.0;
        this.direction = this.angle - Math.PI / 2;
    }
}

export class SpiderFactory {
    constructor(width, height, image) {
        this.width = width;
        this.height = height;
        this.image = image;
    }
    createSpiders(numberOfSpiders) {
        let spiders = [];
        for (let i = 0; i < numberOfSpiders; i++) {
            spiders.push(
                new Spider(
                    randomIntFromRange(-200, canvas.width + 200),
                    randomIntFromRange(-200, 0),
                    randomIntFromRange(canvasCenter.x - 200, canvasCenter.x + 200),
                    canvas.height,
                )
            );
        }
        return spiders;
    }
}