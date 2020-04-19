const overlay = document.querySelector('#overlay')

// file for interaction between html elements and canvas
export const addEventListeners = plants => {
    console.log('adsa')
    document.querySelectorAll('.seedButton').forEach(el => {
        el.addEventListener('click', ({ target }) => {
            console.log(target.dataset.id)
            plants[target.dataset.id].plantSeed()
        })
    })
}
