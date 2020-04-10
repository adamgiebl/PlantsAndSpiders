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
        { width: 120, height: 200, image: characterLowerImage, imageFlipped: characterLowerImageFlipped }
    )
    const scene = new Scene(sceneImage)

    let velocityX = 6
    let velocityY = 0
    let gravity = 0.6

    let shotFrames = 0

    const potFactory = new PotFactory(150, 120, potImage, plantImages)
    const pots = potFactory.createPots(3, 50)
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

        spiders.forEach(spider => {
            if (!spider.isShot) {
                ctx.translate(spider.x + spider.width / 2, spider.y + spider.height / 2)
                ctx.rotate(spider.direction)
                ctx.translate(-spider.x - spider.width / 2, -spider.y - spider.height / 2)
                ctx.drawImage(
                    spiderImage,
                    (spider.x += spider.velocityX * 1),
                    (spider.y += spider.velocityY * 1),
                    spider.width,
                    spider.height
                )
                ctx.setTransform(1, 0, 0, 1, 0, 0)
            } else {
                ctx.translate(spider.x + spider.width / 2, spider.y + spider.height / 2)
                ctx.rotate(-spider.splashAngle + Math.PI)
                ctx.translate(-spider.x - spider.width / 2, -spider.y - spider.height / 2)
                ctx.drawImage(
                    spiderSplash,
                    spider.x - 10,
                    spider.y - spider.height,
                    spider.width + 20,
                    spider.height * 2
                )
                ctx.setTransform(1, 0, 0, 1, 0, 0)
            }
        })

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

        pots.forEach(pot => {
            pot.draw(ctx)
        })

        character.draw(ctx)

        // drawing a black mask over the whole screen
        maskCtx.fillStyle = 'rgb(68, 68, 68)'
        //maskCtx.fillStyle = "rgb(45, 45, 45)";
        maskCtx.fillRect(0, 0, mask.width, mask.height)

        if (character.shot == true) {
            if (shotFrames >= 3) {
                shotFrames = 0
                character.shot = false
            } else {
                shotFrames++
                maskCtx.fillStyle = 'rgba(249, 191, 0, 0.1)'
                maskCtx.fillRect(0, 0, canvas.width, canvas.height)
                maskCtx.translate(character.upperBody.rotationPoint.x, character.upperBody.rotationPoint.y)
                maskCtx.rotate(character.angle)
                maskCtx.translate(-character.upperBody.rotationPoint.x, -character.upperBody.rotationPoint.y)
                maskCtx.strokeStyle = 'limegreen'
                //ctx.strokeRect(this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height)
                maskCtx.drawImage(
                    flashImage,
                    character.upperBody.x + character.upperBody.width,
                    character.upperBody.y + (character.flip ? 0 : 100),
                    character.upperBody.width,
                    character.upperBody.height / 2
                )
                maskCtx.setTransform(1, 0, 0, 1, 0, 0)
            }
        }

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
