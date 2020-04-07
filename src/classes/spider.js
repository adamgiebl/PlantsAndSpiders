export class Spider {
    constructor(positionX, positionY, destinationX, destinationY) {
        this.height = 50;
        this.width = 50;
        this.positionX = positionX;
        this.positionY = positionY;
        this.destinationX = destinationX;
        this.destinationY = destinationY;

        this.deltaX = destinationX - positionX;
        this.deltaY = destinationY - positionY;
        this.angle = Math.atan2(this.deltaY, this.deltaX);
        this.velocityX = Math.cos(this.angle) * 1.0;
        this.velocityY = Math.sin(this.angle) * 1.0;
    }
}