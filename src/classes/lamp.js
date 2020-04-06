import { ctx, canvas } from 'shared/canvas'
import { groundY } from 'shared/globalVariables'


export class Lamp {
    constructor(positionX, positionY, image) {
        this.width = 170;
        this.height = 130;
        this.x = positionX;
        this.y = positionY;
        this.lampCenter = {
            x: positionX + this.width / 2,
            y: positionY + this.height / 2
        }
        this.image = image;
        this.turnedOn = true;
    }
    draw() {
        ctx.drawImage(this.image, this.x - this.width /2, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.x - this.width /2 + 10, this.height);
        ctx.lineTo(this.x - 300, groundY);
        ctx.lineTo(this.x + 300, groundY);
        ctx.lineTo(this.x + this.width /2 - 10, this.height);
        ctx.closePath();
        ctx.fill();
    }
}