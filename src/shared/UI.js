import { audioPlayer } from '../AudioPlayer'

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
            <h2>Points from spiders: ${window.game.state.score}</h2>
            <h2>Highest killstreak: ${window.game.state.biggestStreak}</h2>
            <h2>Points from plants: ${window.game.plants.reduce((acc, plant) => {
                return acc + plant.size * 1000
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
