import { GameLoop } from './gameLoop'
import { loadImage } from './classes/loaders'
import { AudioPlayer } from './AudioPlayer'
import spiderSrc from 'assets/spider.svg'
import spiderSplashSrc from 'assets/SpiderSplash.svg'
import characterUpperSrc from 'assets/CharacterUpper.svg'
import characterUpperFlippedSrc from 'assets/CharacterUpperFlipped.svg'
import characterLowerSrc from 'assets/CharacterLower.svg'
import characterLowerFlippedSrc from 'assets/CharacterLowerFlipped.svg'
import flashSrc from 'assets/Flash.svg'
import sceneSrc from 'assets/scene.png'
import plant1 from 'assets/plants/Plant1.svg'
import plant2 from 'assets/plants/Plant2.svg'
import plant3 from 'assets/plants/Plant3.svg'
import plant4 from 'assets/plants/Plant4.svg'
import potSrc from 'assets/Pot.svg'
import lampSrc from 'assets/Lamp.svg'

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
