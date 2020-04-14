import { GameLoop } from './gameLoop'
import config from 'assets/manifests/gameConfig.json'

GameLoop(config).then(startGame => {
    console.log('All systems are go!')
    startGame()
})

/*features:
- walk up to a plant to grow
- shadows undercharacters
- 
*/
