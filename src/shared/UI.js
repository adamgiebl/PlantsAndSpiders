import { audioPlayer } from '../AudioPlayer'
const overlay = document.querySelector('#overlay')

// file for interaction between html elements and canvas
export const addEventListeners = plants => {
    document.querySelectorAll('.seedButton').forEach(el => {
        el.addEventListener('click', ({ target }) => {
            plants[target.dataset.id].plantSeed()
        })
    })
    document.querySelector('#mute-button').addEventListener('click', function () {
        this.classList.toggle('mute')
        audioPlayer.toggleMuteAudio()
    })
}

export const showGameOver = () => {
    document.querySelector('#gameOverScreen').classList.remove('hidden')
    document.querySelector('#gameOverScreen').innerHTML += `
        <div>
            <h2>Spiders killed: ${window.game.state.spidersKilledTotal}</h2>
            <h2>Points from spiders: ${window.game.state.spidersKilledTotal * 30}</h2>
            <h2>Points from plants: ${window.game.plants.reduce((acc, plant) => {
                return acc + plant.size * 100
            }, 0)}</h2>
        </div>
    `
}

export const updateLevel = () => {
    if (window.game.state.level >= 0) {
        document.querySelector('#level').innerText = window.game.state.level + 1
        document.querySelector('#level').classList.remove('hidden')
    }
}

export const updateScore = () => {
    document.querySelector('#score').innerText = window.game.state.score
}

export const hideLoadingScreen = () => {
    document.querySelector('#loadingScreen').classList.add('hidden')
}
