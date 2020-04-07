import { ctx, canvas, canvasCenter, mask, maskCtx } from 'shared/canvas'
import { Character, Scene, Spider, PotFactory, LightFactory, SpiderFactory } from './classes'
import { getRandomInt, randomIntFromRange } from 'shared/helpers'

import { checkTarget } from './clickHandler'

export const GameLoop = (assets, plantImages) => {
    const [spiderImage, characterImage, sceneImage, potImage, lampImage] = assets;

    const character = new Character(characterImage);
    const scene = new Scene(sceneImage);

    let velocityX = 6;
    let velocityY = 0;
    let positionX = 100;
    let positionY = character.y;
    let gravity = 0.6;

    const potFactory = new PotFactory(125, 100, potImage);
    const pots = potFactory.createPots(4, 50);
    const lightFactory = new LightFactory(200, 130, lampImage, 'rgba(251, 252, 214, 0.8)', 200);
    const lamps = lightFactory.createLights(3, 200);
    const spiderFactory = new SpiderFactory(40, 40, spiderImage);
    const spiders = spiderFactory.createSpiders(10);


    console.log(spiders)

    window.addEventListener('click', (e) => {
        checkTarget(e, spiders, (spider) => {
            spider.isDead = true;
        })
    })

    const gameLoop = () => {
        ctx.globalCompositeOperation = 'normal';

        scene.draw(ctx);

        velocityY += gravity;
        positionY += velocityY;

        // center point
        ctx.fillRect((canvas.width / 2) - 5, (canvas.height / 2) - 5, 10, 10);

        spiders.forEach((spider) => {
            if (!spider.isDead) {
                ctx.translate(spider.x + spider.width / 2, spider.y + spider.height / 2);
                ctx.rotate(spider.direction)
                ctx.translate(-spider.x - spider.width / 2, -spider.y - spider.height / 2);
                ctx.drawImage(
                    spiderImage,
                    spider.x += (spider.velocityX * 1),
                    spider.y += (spider.velocityY * 1),
                    spider.width,
                    spider.height
                );
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
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