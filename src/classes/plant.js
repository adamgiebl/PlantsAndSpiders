export class Plant {
    constructor(positionX, positionY, size) {
        switch (size) {
            case 1:
                this.height = 200;
                this.width = 130;
                break;
            case 2:
                this.height = 292;
                this.width = 130;
                break;
            case 3:
                this.height = 345;
                this.width = 140;
                break;
            case 4:
                this.height = 470;
                this.width = 200;
                break;

        }
        this.positionX = positionX;
        this.positionY = positionY;
        this.plantCenter = {
            x: positionX + this.width / 2,
            y: positionY + this.height / 2
        }
        console.log(this.plantCenter);
    }
}