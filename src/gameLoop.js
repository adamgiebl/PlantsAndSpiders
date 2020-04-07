import { ctx, canvas, canvasCenter, canvasOverlay, canvasOverlayCtx } from 'shared/canvas'
import { Character, Scene, Spider, Plant, Pot, Light } from './classes'
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

    lamps.push(new Light(700, 0, lampImage, 'rgb(251, 252, 214)'));
    lamps.push(new Light(300, 0, lampImage, 'rgb(251, 252, 214)'));

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
        ctx.globalCompositeOperation = 'source-over';
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

        if (positionY > characterY) {
            positionY = characterY;
            isOnGround = true;
            velocityY = 0.0;
        }

        if (keyPresses.k65) {
            if (positionX < 0) {
                //positionX = 0;
            } else {
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




        const canvasOverlay = document.createElement('canvas');
        canvasOverlay.width = canvas.width;
        canvasOverlay.height = canvas.height;
        const canvasOverlayCtx = canvasOverlay.getContext('2d');




        canvasOverlayCtx.fillStyle = "rgba(0,0,0, 0.6)";
        canvasOverlayCtx.fillRect(0, 0, canvasOverlay.width, canvasOverlay.height);

        canvasOverlayCtx.fillStyle = 'transparent';
        canvasOverlayCtx.fillRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        canvasOverlayCtx.fillStyle = 'white';
        lamps.forEach(lamp => {
            lamp.draw(canvasOverlayCtx);
        })


        ctx.globalCompositeOperation = 'multiply';

        ctx.drawImage(canvasOverlay, 0, 0);




        window.requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);

    return () => { window.requestAnimationFrame(gameLoop) }
}