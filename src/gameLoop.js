import { ctx, canvas, mask, maskCtx } from 'shared/canvas'
import { loadCharacter, loadScene, loadLightFactory, loadSpiderFactory, loadPlantFactory, Timer } from './classes'

import { checkTarget } from './clickHandler'

export const GameLoop = async config => {
    console.log(config)
    const timer = new Timer()
    const character = await loadCharacter()
    const scene = await loadScene()
    const plantFactory = await loadPlantFactory()
    const lightFactory = await loadLightFactory()
    const spiderFactory = await loadSpiderFactory()

    const plants = plantFactory.createPlants(3)
    const lamps = lightFactory.createLights(3, config.timing.startLights)
    let spiders = []
    character.epicEntrance().then(() => {})

    canvas.addEventListener('click', e => {
        checkTarget(e, [...lamps, ...spiders, ...plants], entity => {
            if (entity) entity.onClick()
        })
    })

    timer.start()

    const gameLoop = () => {
        ctx.globalCompositeOperation = 'normal'

        scene.draw(ctx)

        character.move()

        spiders.forEach(spider => {
            spider.draw(ctx)
        })

        //check if all plants are planted
        if (timer.getTimeElapsed() >= config.timing.showSeeds) {
            if (!document.querySelector('.seedButton.active')) {
                if (spiders.length == 0) {
                    spiders = spiderFactory.createSpiders(5, character)
                }
            }
        }
        plants.forEach(plant => {
            if (plant.showSeed && config.timing.showSeeds == timer.getTimeElapsed()) {
                plant.showSeedButton()
                plant.showSeed = false
            }
            plant.draw(ctx)
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
                if (!lamp.turnedOn && lamp.turnOn == timer.getTimeElapsed()) {
                    lamp.turnedOn = true
                    //spiders = spiderFactory.createSpiders(15, character)
                }
                lamp.drawBody(ctx)
                lamp.drawLight(maskCtx)
            } else {
                lamp.drawBody(ctx)
            }
        })

        // multiply the mask with the underlying canvas
        ctx.globalCompositeOperation = 'multiply'
        ctx.drawImage(mask, 0, 0)
        timer.logTimeElapsed()

        window.requestAnimationFrame(gameLoop)
    }

    return () => {
        window.requestAnimationFrame(gameLoop)
    }
}
