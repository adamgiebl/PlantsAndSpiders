import { GameLoop } from './gameLoop'
import { loadImage } from './classes/loaders'




Promise.all([loadImage(plant1), loadImage(plant2), loadImage(plant3), loadImage(plant4)]).then(plants => {
    Promise.all([
        loadImage(spiderSrc),
        loadImage(spiderSplashSrc),
        loadImage(characterLowerSrc),
        loadImage(characterLowerFlippedSrc),
        loadImage(characterUpperSrc),
        loadImage(characterUpperFlippedSrc),
        loadImage(sceneSrc),
        loadImage(potSrc),
        loadImage(lampSrc),
        loadImage(flashSrc)
    ]).then(assets => {
        const startGame = GameLoop(assets, plants)
        startGame()
    })
})
