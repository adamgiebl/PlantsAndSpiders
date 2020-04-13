import spiderSrc from 'assets/SpiderSpriteSheet.png'
import spiderSplashSrc from 'assets/SpiderSplash.svg'
import characterUpperSrc from 'assets/CharacterUpper.svg'
import characterUpperFlippedSrc from 'assets/CharacterUpperFlipped.svg'
import characterLowerSrc from 'assets/CharacterLower.svg'
import characterLowerFlippedSrc from 'assets/CharacterLowerFlipped.svg'
import flashSrc from 'assets/Flash.svg'
import sceneSrc from 'assets/Background2.png'
import plant1 from 'assets/plants/Plant1.svg'
import plant2 from 'assets/plants/Plant2.svg'
import plant3 from 'assets/plants/Plant3.svg'
import plant4 from 'assets/plants/Plant4.svg'
import potSrc from 'assets/Pot.svg'
import lampSrc from 'assets/Lamp.svg'

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

export function loadEntities() {

}
