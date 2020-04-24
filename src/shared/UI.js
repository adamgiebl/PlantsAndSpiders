const overlay = document.querySelector('#overlay')

// file for interaction between html elements and canvas
export const addEventListeners = plants => {
    console.log('adsa')
    document.querySelectorAll('.seedButton').forEach(el => {
        el.addEventListener('click', ({ target }) => {
            plants[target.dataset.id].plantSeed()
        })
    })
}

export const showGameOver = () => {
    document.querySelector('#gameOverScreen').classList.remove('hidden')
}
