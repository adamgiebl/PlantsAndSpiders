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
}

export const updateLevel = () => {
    document.querySelector('#level').innerHTML = window.game.state.currentLevel
}

export const hideLoadingScreen = () => {
    document.querySelector('#loadingScreen').classList.add('hidden')
}
