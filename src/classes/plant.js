import { groundY } from 'shared/globalVariables'
import { canvas } from 'shared/canvas'
import { loadImage, loadManifest } from './loaders'

export class PlantFactory {
    constructor(manifest) {
        this.manifest = manifest
    }
    createPlants(numberOfPlants, potMargin) {
        const { width, height, image, plantImages } = this.manifest
        const plants = []
        const widthSum = width * numberOfPlants + potMargin * (numberOfPlants - 1)
        const offset = (canvas.width - widthSum) / 2

        for (let i = 0; i < numberOfPlants; i++) {
            plants.push(
                new Plant(
                    offset + (width + (i === numberOfPlants ? 0 : potMargin)) * i,
                    groundY - height,
                    width,
                    height,
                    image,
                    plantImages
                )
            )
        }

        return plants
    }
}

export class Plant {
    constructor(positionX, positionY, width, height, image, plantImages) {
        this.width = width
        this.height = height
        this.x = positionX
        this.y = positionY - 15
        this.size = 0
        this.plantImages = plantImages
        this.plantSize = { width: 200, height: 400 }
        this.potCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        this.image = image
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        /* ctx.drawImage(
            this.plantImages[this.size],
            this.potCenter.x - this.plantSize.width / 2,
            this.y - this.plantSize.height,
            this.plantSize.width,
            this.plantSize.height
        ) */
    }
    grow() {
        if (this.size < this.plantImages.length - 1) {
            this.size++
        }
    }
    onClick() {
        this.grow()
    }
}

export const loadPlantFactory = async () => {
    const manifest = await loadManifest('plant')
    manifest.image = await loadImage(manifest.mainImageURL)
    return new PlantFactory(manifest)
}
