import { ctx, canvas, canvasCenter } from 'shared/canvas'
import { Character, Scene, Spider, Plant, Pot, Lamp } from './classes'
import { groundHeight, groundY } from 'shared/globalVariables'
import { getRandomInt, checkCollision } from 'shared/helpers'

export const GameLoop = (assets, plantImages) => {
    const [spiderImage, characterImage, sceneImage, potImage, lampImage] = assets;
    const plantsImages = plantImages;
    const character = new Character(characterImage);
    const scene = new Scene(sceneImage);

    let characterY = canvas.height - groundHeight - character.height + 5;

    let velocityX = 6;
    let velocityY = 0;
    let positionX = 100;
    let positionY = characterY;
    let gravity = 0.6;
    let keyPresses = {};
    let isOnGround = true;
    let spiders = [];
    let pots = [];
    let lamps = [];

    lamps.push(new Lamp(canvasCenter.x, 0, lampImage))

    function keyUpListener(event) {
        if (event.keyCode === 32) {
            keyPresses["k32"] = false;
            if (velocityY < -6.0)
                velocityY = -6.0;
        } else {
            keyPresses["k" + event.keyCode] = false;
        }
    }

    function keyDownListener(event) {
        keyPresses["k" + event.keyCode] = true;
    }

    for (let i = 0; i < 10; i++) {
        spiders.push(new Spider(getRandomInt(canvas.width), getRandomInt(canvas.height), canvasCenter.x, canvasCenter.y));
    }

    //centering pots
    const potHeight = 100;
    const potWidth = 125;
    const potMargin = 50;
    const numberOfPots = 4;
    const widthSum = (potWidth * numberOfPots) + (potMargin * (numberOfPots - 1));
    const offset = (canvas.width - widthSum) / 2; 
    console.log(offset)
    for (let i = 0; i < 4; i++) {
        pots.push(new Pot(offset + ((potWidth + (i === numberOfPots ? 0 : potMargin)) * i), groundY, 125, 100));
    }
    
    const gameLoop = () => {
        ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);
        velocityY += gravity;
        positionY += velocityY;

        ctx.fillStyle = "red";

        ctx.fillRect((canvas.width / 2) - 5, (canvas.height / 2) - 5, 10, 10);

        spiders.forEach((spider, index) => {
            let positionX = spider.positionX += (spider.velocityX * 1);
            let positionY = spider.positionY += (spider.velocityY * 1);
            if (positionX === spider.destinationX || positionY === spider.destinationY) {
                console.log('das')
                removeSpider(index);
            } else {
                ctx.drawImage(spiderImage, positionX, positionY, spider.width, spider.height);
            }
        })

        pots.forEach((pot, i) => {
            ctx.drawImage(potImage, pot.x, pot.y - pot.height, pot.width, pot.height);
        })
        
        ctx.globalAlpha = 0.3
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        ctx.globalCompositeOperation = 'lighten';
        ctx.fillStyle = 'rgba(255, 240, 0, 0.2)';
        lamps.forEach(lamp => {
            lamp.draw();
        })
        ctx.globalCompositeOperation = 'normal';
        ctx.globalAlpha = 1

        if (positionY > characterY) {
            positionY = characterY;
            isOnGround = true;
            velocityY = 0.0;
        }

        if (keyPresses.k65) {
            if (positionX < 0) {
                //positionX = 0;
            } 
            else {
                positionX -= velocityX;
            }
        } else if (keyPresses.k68) {
            if (positionX > canvas.width - character.width) {
                //positionX = canvas.width - character.width
            } else {
                positionX += velocityX;
            }
        }
        if (keyPresses.k32) {
            if (isOnGround) {
                velocityY = -12.0;
                isOnGround = false;
            }
        }

        ctx.drawImage(characterImage, positionX, positionY, character.width, character.height);
        window.requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);

    return () => { window.requestAnimationFrame(gameLoop) }
}