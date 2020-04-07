import { groundY } from 'shared/globalVariables';
import { canvas } from 'shared/canvas'

export class PotFactory {
    constructor(width, height, image) {
        this.width = width;
        this.height = height;
        this.image = image;
    }
    createPots(numberOfPots, potMargin) {
        const pots = [];
        const widthSum = (this.width * numberOfPots) + (potMargin * (numberOfPots - 1));
        const offset = (canvas.width - widthSum) / 2;

        for (let i = 0; i < numberOfPots; i++) {
            pots.push(new Pot(offset + ((this.width + (i === numberOfPots ? 0 : potMargin)) * i), groundY, this.width, this.height, this.image));
        }

        return pots;
    }
}

export class Pot {
    constructor(positionX, positionY, width, height, image) {
        this.width = width;
        this.height = height;
        this.x = positionX;
        this.y = positionY;
        this.potCenter = {
            x: positionX + this.width / 2,
            y: positionY + this.height / 2
        }
        this.image = image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height);
    }
}