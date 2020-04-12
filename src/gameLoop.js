import { ctx, canvas, canvasCenter, mask, maskCtx } from 'shared/canvas'
import { Character, Scene, Spider, PotFactory, LightFactory, SpiderFactory } from './classes'
import { groundY } from 'shared/globalVariables'

import { checkTarget } from './clickHandler'

export const GameLoop = (assets, plantImages) => {
    const [
        spiderImage,
        spiderSplash,
        characterLowerImage,
        characterLowerImageFlipped,
        characterUpperImage,
        characterUpperImageFlipped,
        sceneImage,
        potImage,
        lampImage,
        flashImage
    ] = assets

    const character = new Character(
        { width: 260, height: 200, image: characterUpperImage, imageFlipped: characterUpperImageFlipped },
        { width: 120, height: 200, image: characterLowerImage, imageFlipped: characterLowerImageFlipped },
        flashImage
    )
    const scene = new Scene(sceneImage)

    let velocityX = 6
    let velocityY = 0
    let gravity = 0.6

    const potFactory = new PotFactory(150, 120, potImage, plantImages)
    const pots = potFactory.createPots(0, 50)
    const lightFactory = new LightFactory(200, 130, lampImage, 'rgba(251, 252, 214, 0.8)', 200)
    const lamps = lightFactory.createLights(3, 140)
    const spiderFactory = new SpiderFactory(40, 40, spiderImage, spiderSplash)
    const spiders = spiderFactory.createSpiders(5, character)

    window.addEventListener('click', e => {
        character.onClick()
        checkTarget(e, [...lamps, ...spiders, ...pots], entity => {
            if (entity) entity.onClick()
        })
    })

    window.addEventListener('mousemove', ({ clientX, clientY }) => {
        character.rotate(clientX, clientY)
    })

    const gameLoop = () => {
        ctx.globalCompositeOperation = 'normal'

        scene.draw(ctx)

        velocityY += gravity
        character.y += velocityY

        if (character.y + character.lowerBody.height >= groundY) {
            character.y = groundY - character.lowerBody.height
            character.isOnGround = true
            velocityY = 0.0
        }

        if (character.direction.left) {
            if (character.x > 0) {
                character.x -= velocityX
            }
        } else if (character.direction.right) {
            if (character.x < canvas.width - character.upperBody.width) {
                character.x += velocityX
            }
        }
        if (character.direction.jumping) {
            if (character.isOnGround) {
                velocityY = -12.0
                character.isOnGround = false
            }
        }

        spiders.forEach(spider => {
            spider.draw(ctx)
        })

        pots.forEach(pot => {
            pot.draw(ctx)
        })

        character.draw(ctx)

        // drawing a black mask over the whole screen
        maskCtx.fillStyle = 'rgb(68, 68, 68)'
        //maskCtx.fillStyle = "rgb(45, 45, 45)";
        maskCtx.fillRect(0, 0, mask.width, mask.height)

        character.drawFlash(maskCtx)

        // adding "white" light onto the mask
        lamps.forEach(lamp => {
            if (!lamp.isShot) {
                lamp.drawBody(ctx)
                lamp.drawLight(maskCtx)
            } else {
                lamp.drawBody(ctx)
            }
        })

        // multiply the mask with the underlying canvas
        ctx.globalCompositeOperation = 'multiply'
        ctx.drawImage(mask, 0, 0)

        window.requestAnimationFrame(gameLoop)
    }

    return () => {
        window.requestAnimationFrame(gameLoop)
    }
}
