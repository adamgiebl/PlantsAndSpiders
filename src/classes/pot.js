export class Pot {
    constructor(positionX, positionY, width, height) {
        this.width = width;
        this.height = height;
        this.x = positionX;
        this.y = positionY;
        this.potCenter = {
            x: positionX + this.width / 2,
            y: positionY + this.height / 2
        }
    }
}