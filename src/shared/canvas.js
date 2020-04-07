export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')


export const canvasOverlay = document.createElement('canvas');
canvasOverlay.width = canvas.width;
canvasOverlay.height = canvas.height;
export const canvasOverlayCtx = canvasOverlay.getContext('2d');
canvasOverlayCtx.fillStyle = "rgba(0,0,0, 0.6)";


const resizeCanvas = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);
}

canvas.width = innerWidth
canvas.height = innerHeight

export const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 }

window.addEventListener('resize', resizeCanvas);