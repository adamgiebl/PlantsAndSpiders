import { ctx, canvas, mask, maskCtx } from 'shared/canvas'
import { loadCharacter, loadScene, loadLightFactory, loadSpiderFactory, loadPlantFactory, Timer } from './classes'
import { randomIntFromRange } from 'shared/helpers'
import { showGameOver, updateLevel, hideLoadingScreen } from 'shared/UI'
import { audioPlayer } from './AudioPlayer'

import { checkTarget } from './clickHandler'

export const GameLoop = async config => {
    window.game = {
        config: config,
        state: {
            seedsPlanted: 0,
            seedsShown: false,
            spidersKilled: 0,
            level: -1,
            currentLevel: -1,
            gameOver: false,
            levelUpdated: false
        }
    }

    const timer = new Timer()
    const character = await loadCharacter()
    const scene = await loadScene()
    const plantFactory = await loadPlantFactory()
    const lightFactory = await loadLightFactory()
    const spiderFactory = await loadSpiderFactory()
    await audioPlayer.loadAllSounds()

    const plants = plantFactory.createPlants(3)
    const lamps = lightFactory.createLights(3, config.timing.startLights)
    let spiders = []

    character.epicEntrance().then(() => {
        // do something when character is ready to move
    })

    canvas.addEventListener('click', e => {
        checkTarget(e, [...lamps, ...spiders, ...plants], entity => {
            if (entity) entity.onClick()
        })
    })

    timer.start()

    // forcing loading screen to see the amazingness
    setTimeout(() => hideLoadingScreen(), 2000)

    const gameLoop = () => {
        ctx.globalCompositeOperation = 'normal'

        scene.draw(ctx)

        character.move()

        spiders.forEach(spider => {
            spider.draw(ctx)
        })

        if (!window.game.state.levelUpdated) {
            window.game.state.levelUpdated = true
            updateLevel()
        }

        if (config.timing.showSeeds == timer.getTimeElapsed()) {
            window.game.state.level = 0
        }

        if (window.game.state.level === 0 && window.game.state.currentLevel !== 0) {
            // spawn spiders when plants are planted
            if (window.game.state.seedsPlanted == plants.length) {
                if (spiders.length == 0) {
                    console.log('current level', 0)
                    window.game.state.currentLevel = 0
                    window.game.state.levelUpdated = false
                    spiders = spiderFactory.createSpiders(
                        window.game.config.levels[0].numberOfSpiders,
                        character,
                        plants
                    )
                }
            }
            if (!window.game.state.seedsShown) {
                window.game.state.seedsShown = true
                plants.forEach(plant => {
                    if (plant.showSeed) {
                        plant.showSeedButton()
                        plant.showSeed = false
                    }
                })
            }
        } else if (window.game.state.level === 1 && window.game.state.currentLevel !== 1) {
            window.game.state.currentLevel = 1
            window.game.state.levelUpdated = false
            console.log('current level', 1)
            window.game.state.spidersKilled = 0
            plants.forEach(plant => {
                plant.grow()
            })
            spiders = []
            spiders = spiderFactory.createSpiders(window.game.config.levels[1].numberOfSpiders, character, plants)
        } else if (window.game.state.level === 2 && window.game.state.currentLevel !== 2) {
            window.game.state.currentLevel = 2
            window.game.state.levelUpdated = false
            console.log('current level', 2)
            window.game.state.spidersKilled = 0
            plants.forEach(plant => {
                plant.grow()
            })
            spiders = []
            spiders = spiderFactory.createSpiders(window.game.config.levels[2].numberOfSpiders, character, plants)
        } else if (window.game.state.level === 3 && window.game.state.currentLevel !== 3) {
            window.game.state.currentLevel = 3
            window.game.state.levelUpdated = false
            console.log('current level', 3)
            window.game.state.spidersKilled = 0
            plants.forEach(plant => {
                plant.grow()
            })
            spiders = []
            spiders = spiderFactory.createSpiders(window.game.config.levels[3].numberOfSpiders, character, plants)
        } else if (window.game.state.level === 4 && window.game.state.currentLevel !== 4) {
            window.game.state.currentLevel = 4
            window.game.state.levelUpdated = false
            console.log('current level', 4)
            window.game.state.gameOver = true
        }

        plants.forEach(plant => {
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

        if (!window.game.state.gameOver) {
            window.requestAnimationFrame(gameLoop)
        } else {
            showGameOver()
        }
    }

    return () => {
        window.requestAnimationFrame(gameLoop)
    }
}
