import { ctx, canvas, mask, maskCtx } from '/src/shared/canvas'
import { loadCharacter, loadScene, loadLightFactory, loadSpiderFactory, loadPlantFactory, Timer } from './classes'
import { randomIntFromRange } from '/src/shared/helpers'
import { showGameOver, updateLevel, hideLoadingScreen, updateScore } from '/src/shared/UI'
import { audioPlayer } from './AudioPlayer'

import { checkTarget } from '/src/clickHandler'
import { updateStreak } from '/src/shared/UI'

export const GameLoop = async config => {
    window.game = {
        config: config,
        state: {
            seedsPlanted: 0,
            seedsShown: false,
            spidersKilled: 0,
            spidersKilledTotal: 0,
            level: -1,
            currentLevel: -1,
            gameOver: false,
            levelUpdated: false,
            score: 0,
            streak: 0,
            biggestStreak: 0
        }
    }
    console.log('1')

    const timer = new Timer()
    const character = await loadCharacter()
    const scene = await loadScene()
    const plantFactory = await loadPlantFactory()
    const lightFactory = await loadLightFactory()
    const spiderFactory = await loadSpiderFactory()
    await audioPlayer.loadAllSounds()

    audioPlayer.playMusic('music')

    const plants = plantFactory.createPlants(config.settings.plants.numberOfPots)
    const lamps = lightFactory.createLights(config.settings.lights.numberOfLights, config.timing.startLights)
    let spiders = []

    //character.epicEntrance().then(() => {})

    canvas.addEventListener('mousedown', e => {
        checkTarget(e, [...spiders], entity => {
            if (entity) entity.onClick()
            else {
                window.game.state.streak = 0
            }
            updateScore()
            updateStreak(character.streak)
        })
        checkTarget(e, [...lamps, ...plants], entity => {
            if (entity) entity.onClick()
        })
    })

    const nextLevel = () => {
        window.game.state.currentLevel = window.game.state.level
        window.game.state.levelUpdated = false
        window.game.state.spidersKilled = 0
        spiders = []
    }

    timer.start()
    console.log('2')

    // forcing loading screen to see the amazingness
    //setTimeout(() => hideLoadingScreen(), 2000)
    hideLoadingScreen()

    const gameLoop = () => {
        if (window.game.state.paused) return window.requestAnimationFrame(gameLoop)
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
            updateLevel()
        }

        if (window.game.state.level === 0 && window.game.state.currentLevel !== window.game.state.level) {
            if (window.game.state.seedsPlanted == plants.length) {
                if (spiders.length == 0) {
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
        } else if (window.game.state.level === 1 && window.game.state.currentLevel !== window.game.state.level) {
            nextLevel()
            plants.forEach(plant => {
                plant.grow()
            })
            //window.game.state.gameOver = true
            window.game.plants = plants
            spiders = spiderFactory.createSpiders(window.game.config.levels[1].numberOfSpiders, character, plants)
        } else if (window.game.state.level === 2 && window.game.state.currentLevel !== window.game.state.level) {
            nextLevel()
            plants.forEach(plant => {
                plant.grow()
            })
            spiders = spiderFactory.createSpiders(window.game.config.levels[2].numberOfSpiders, character, plants)
        } else if (window.game.state.level === 3 && window.game.state.currentLevel !== window.game.state.level) {
            nextLevel()
            plants.forEach(plant => {
                plant.grow()
            })
            spiders = spiderFactory.createSpiders(window.game.config.levels[3].numberOfSpiders, character, plants)
        } else if (window.game.state.level === 4 && window.game.state.currentLevel !== window.game.state.level) {
            nextLevel()
            window.game.state.gameOver = true
            window.game.plants = plants
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
        //setInterval(gameLoop, 1000 / 60)
        window.requestAnimationFrame(gameLoop)
    }
}
