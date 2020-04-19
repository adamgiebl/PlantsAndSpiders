import { groundY } from 'shared/canvas'
import { canvas } from 'shared/canvas'
import { addEventListeners } from 'shared/UI'
import { loadImage, loadManifest } from './loaders'

export class PlantFactory {
    constructor(manifest) {
        this.manifest = manifest
    }
    createPlants(numberOfPlants) {
        const { width, height, image, loadedPlantImages, potMargin, plantSizes } = this.manifest
        const plants = []
        const widthSum = width * numberOfPlants + potMargin * (numberOfPlants - 1)
        const offset = (canvas.width - widthSum) / 2
        //plantSizes.reduce((acc, b) => acc + b.width, 0)

        for (let i = 0; i < numberOfPlants; i++) {
            plants.push(
                new Plant(
                    offset + (width + (i === numberOfPlants ? 0 : potMargin)) * i,
                    groundY - height,
                    plantSizes[i].width,
                    plantSizes[i].height,
                    image,
                    loadedPlantImages,
                    i
                )
            )
        }
        addEventListeners(plants)
        return plants
    }
}

export class Plant {
    constructor(positionX, positionY, width, height, image, plantImages, id) {
        this.width = width
        this.height = height
        this.id = id
        this.x = positionX
        this.y = positionY - 15
        this.size = 0
        this.planted = false
        this.showSeed = true
        this.plantImages = plantImages
        this.potSize = { width: 170, height: 120 }
        this.potCenter = {
            x: this.x + this.potSize.width / 2,
            y: this.y + this.potSize.height / 2
        }
        this.image = image
        this.timeToShowSeedButton = 1
        this.createSeedButton()
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.potSize.width, this.potSize.height)
        if (this.planted) {
            ctx.drawImage(
                this.plantImages[this.size],
                this.potCenter.x - this.width / 2,
                this.y - this.height,
                this.width,
                this.height
            )
        }
    }
    grow() {
        if (this.size < this.plantImages.length - 1) {
            this.size++
        }
    }
    onClick() {
        this.grow()
    }
    plantSeed() {
        this.planted = true
        document.querySelector(`.seedButton[data-id="${this.id}"]`).outerHTML = ''
    }
    showSeedButton() {
        document.querySelector(`.seedButton[data-id="${this.id}"]`).classList.add('active')
    }
    createSeedButton() {
        overlay.innerHTML += `
        <div 
            class="seedButton"
            data-id="${this.id}"
            style="left: ${this.potCenter.x - 40}px; top: ${this.potCenter.y - 160}px;" 
        >
            <div class="seedButton__image" data-id="${this.id}">
            </div>
        </div>
        `
    }
}

export const loadPlantFactory = async () => {
    const manifest = await loadManifest('plant')
    manifest.image = await loadImage(manifest.mainImageURL)
    console.log(manifest)
    manifest.loadedPlantImages = []
    manifest.plantImages.forEach(async img => {
        manifest.loadedPlantImages.push(await loadImage(img))
    })
    return new PlantFactory(manifest)
}
