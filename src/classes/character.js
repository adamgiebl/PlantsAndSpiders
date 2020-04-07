import { ctx, canvas } from 'shared/canvas'
import { groundHeight } from 'shared/globalVariables'
import { setUpKeyboard } from '../input';

export class Character {
    constructor() {
        this.height = 310;
        this.width = 200;
        this.x = 0;
        this.y = canvas.height - groundHeight - this.height + 5;
        this.direction = {
            left: false,
            right: false,
            jumping: false
        }
        this.isOnGround = true;
        setUpKeyboard(this);
    }
}