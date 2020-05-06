export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')
ctx.font = '30px Anton'
canvas.width = innerWidth
canvas.height = innerHeight
export const mask = document.createElement('canvas')
export const maskCtx = mask.getContext('2d')
mask.width = innerWidth
mask.height = innerHeight

export const groundPositionX = 0

export const groundHeight = 15

export let groundY = canvas.height - groundHeight

const resizeCanvas = () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    mask.width = innerWidth
    mask.height = innerHeight
    groundY = canvas.height - groundHeight
}

export const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 }

window.addEventListener('resize', resizeCanvas)
