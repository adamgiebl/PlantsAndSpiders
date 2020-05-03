import { canvas } from '/src/shared/canvas'
import { loadImage, loadManifest } from '/src/classes/loaders'

export class Scene {
    constructor(manifest) {
        this.manifest = manifest
    }
    draw(ctx) {
        ctx.drawImage(this.manifest.image, 0, 0, canvas.width, canvas.height)
    }
}

export const loadScene = async () => {
    const manifest = await loadManifest('scene')
    manifest.image = await loadImage(manifest.mainImageURL)
    return new Scene(manifest)
}
