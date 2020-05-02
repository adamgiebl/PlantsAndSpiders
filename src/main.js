import { GameLoop } from './gameLoop'
import config from 'assets/manifests/gameConfig.json'
import './style.css'

const titleScreen = document.querySelector('#titleScreen')
const tutorialScreen = document.querySelector('#tutorialScreen')
titleScreen.addEventListener('click', () => {
    titleScreen.classList.add('hidden')

    tutorialScreen.addEventListener('click', () => {
        tutorialScreen.classList.add('hidden')

        GameLoop(config).then(startGame => {
            console.log('All systems are go!')
            startGame()
        })
    })
})

/*features:
- walk up to a plant to grow
- shadows undercharacters
- 
*/

/* 
    GAME IDEA:
    - player starts with planting plants
    - spiders are coming towards your plants and want to eat them
    - protect plants against spiders by shooting them
    - plants grow every round
    - spider touching a plant will cause the plant losing one growth cycle thus becoming smaller
    - there will be more spiders and they will be faster or smaller each round (making them harder to hit)
    - each spider picks one of the plants to attack at the beginning of his journey
    - you get points subtracted every time you miss a shot
    - collect plants at the end after 4 rounds, your score depends on how much of your plants is left
    - best achievable score is when all plants are fully grown after 4 rounds and you have missed no shots
*/
