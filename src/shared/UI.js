import { audioPlayer } from '../AudioPlayer'

// file for interaction between html elements and canvas
export const addEventListeners = plants => {
    document.querySelector('#settings-button').addEventListener('click', () => {
        document.querySelector('#settings').classList.remove('hidden')
        window.game.state.paused = true
    })

    document.querySelector('#close-modal').addEventListener('click', () => {
        document.querySelector('#settings').classList.add('hidden')
        window.game.state.paused = false
    })

    document.querySelector('#fx-slider').addEventListener('change', e => {
        audioPlayer.playAudio('gunshot')
        audioPlayer.changeVolume('FX', e.target.value)
    })

    document.querySelector('#music-slider').addEventListener('input', e => {
        audioPlayer.changeVolume('MUSIC', e.target.value)
    })

    document.querySelectorAll('#difficulty-setting .radio').forEach(input => {
        input.addEventListener('click', e => {
            window.game.difficulty = e.target.value
            window.game.state.shouldRestart = true
            window.game.state.paused = false
        })
    })
}

export const showGameOver = () => {
    document.querySelector('#gameOverScreen').classList.remove('hidden')
    const scorePlants = window.game.plants.reduce((acc, plant) => {
        return acc + plant.size * 1000
    }, 0)
    if (scorePlants === -3000) {
        document.querySelector('#gameOverScreen .lost').classList.remove('hidden')
    } else {
        document.querySelector('#gameOverScreen .win').classList.remove('hidden')
        document.querySelector('#gameOverScreen #score').innerText = window.game.state.score + scorePlants
        document.querySelector('#gameOverScreen #score-spiders').innerText = window.game.state.score
        document.querySelector('#gameOverScreen #score-plants').innerText = scorePlants
        document.querySelector('#gameOverScreen #score-streak').innerText = window.game.state.biggestStreak
        document.querySelector('#gameOverScreen #score-difficulty').innerText = window.game.difficulty.toLowerCase()
        document.querySelector('#gameOverScreen #score-difficulty').dataset.diff = window.game.difficulty
    }

    document.querySelector('#restart-button').addEventListener('click', () => {
        document.querySelector('#gameOverScreen').classList.add('hidden')
        window.game.state.shouldRestart = true
        window.game.state.paused = false
    })
}

export const updateLevel = () => {
    if (window.game.state.level >= 0) {
        document.querySelector('#level').innerText = window.game.state.level + 1
        //document.querySelector('#level').classList.remove('hidden')
    }
}

export const updateScore = () => {
    document.querySelector('#score').innerText = window.game.state.score
}

export const updateStreak = () => {
    const streak = document.querySelector('#streak')
    const streakCont = document.querySelector('#streak-container')
    streak.innerText = Math.floor((1 + window.game.state.streak * 0.1) * 10) / 10
    if (window.game.state.streak !== 0) {
        streakCont.classList.remove('hidden')
        streak.classList.remove('streak-animation')
        streak.offsetWidth
        streak.classList.add('streak-animation')
        //streak.style.color = '#' + (((1 << 24) * Math.random()) | 0).toString(16)
    } else {
        streakCont.classList.add('hidden')
    }
}

export const hideLoadingScreen = () => {
    document.querySelector('#loadingScreen').classList.add('hidden')
}
