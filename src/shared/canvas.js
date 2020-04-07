export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

export const mask = document.createElement('canvas');
export const maskCtx = mask.getContext('2d');
mask.width = innerWidth;
mask.height = innerHeight;

const resizeCanvas = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mask.width = innerWidth;
    mask.height = innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);
}

export const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 }

window.addEventListener('resize', resizeCanvas);