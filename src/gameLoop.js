import { ctx, canvas, canvasCenter, mask, maskCtx } from 'shared/canvas'
import { Character, Scene, Spider, PotFactory, LightFactory } from './classes'
import { getRandomInt } from 'shared/helpers'



export const GameLoop = (assets, plantImages) => {
    const [spiderImage, characterImage, sceneImage, potImage, lampImage] = assets;

    const character = new Character(characterImage);
    const scene = new Scene(sceneImage);

    let velocityX = 6;
    let velocityY = 0;
    let positionX = 100;
    let positionY = character.y;
    let gravity = 0.6;
    let spiders = [];

    const potFactory = new PotFactory(125, 100, potImage);
    const pots = potFactory.createPots(4, 50);
    const lightFactory = new LightFactory(200, 130, lampImage, 'rgba(251, 252, 214, 0.8)', 200)
    const lamps = lightFactory.createLights(2, 200);

    for (let i = 0; i < 10; i++) {
        spiders.push(
            new Spider(
                getRandomInt(canvas.width),
                getRandomInt(canvas.height),
                canvasCenter.x,
                canvasCenter.y,
            )
        );
    }

    const gameLoop = () => {
        ctx.globalCompositeOperation = 'normal';

        scene.draw(ctx);

        velocityY += gravity;
        positionY += velocityY;

        // center point
        ctx.fillRect((canvas.width / 2) - 5, (canvas.height / 2) - 5, 10, 10);

        spiders.forEach((spider) => {
            ctx.drawImage(
                spiderImage,
                spider.positionX += (spider.velocityX * 1),
                spider.positionY += (spider.velocityY * 1),
                spider.width,
                spider.height
            );
        })

        if (positionY > character.y) {
            positionY = character.y;
            character.isOnGround = true;
            velocityY = 0.0;
        }

        if (character.direction.left) {
            if (positionX > 0) {
                positionX -= velocityX;
            }
        } else if (character.direction.right) {
            if (positionX < canvas.width - character.width) {
                positionX += velocityX;
            }
        }
        if (character.direction.jumping) {
            if (character.isOnGround) {
                velocityY = -12.0;
                character.isOnGround = false;
            }
        }

        pots.forEach((pot) => {
            pot.draw(ctx);
        })

        ctx.drawImage(
            characterImage,
            positionX,
            positionY,
            character.width,
            character.height
        );

        // drawing a black mask over the whole screen
        maskCtx.fillStyle = "rgb(68, 68, 68)";
        maskCtx.fillRect(0, 0, mask.width, mask.height);

        // adding "white" light onto the mask
        lamps.forEach(lamp => {
            lamp.draw(ctx, maskCtx)
        })

        // multiply the mask with the underlying canvas
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(mask, 0, 0);

        window.requestAnimationFrame(gameLoop);
    }

    return () => { window.requestAnimationFrame(gameLoop) }
}