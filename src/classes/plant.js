import { groundY } from '/src/shared/canvas'
import { canvas } from '/src/shared/canvas'
import { addEventListeners } from '/src/shared/UI'
import { loadImage, loadManifest } from '/src/classes/loaders'
import { audioPlayer } from '../AudioPlayer'

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
                    plantSizes,
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
    constructor(positionX, positionY, plantSizes, image, plantImages, id) {
        this.id = id
        this.x = positionX
        this.y = positionY - 15
        this.size = 0
        this.plantSizes = plantSizes
        this.planted = false
        this.showSeed = true
        this.plantImages = plantImages
        this.width = 170
        this.height = 120
        this.potCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        this.image = image
        this.timeToShowSeedButton = 1
        this.activePlant = plantSizes[this.size]
        this.activePlantImage = plantImages[this.size]
        this.plantBoundingRect = {
            x: this.potCenter.x - this.activePlant.width / 2,
            y: this.y - this.activePlant.height,
            width: this.activePlant.width,
            height: this.activePlant.height
        }
        this.createSeedButton()
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        if (this.planted) {
            ctx.drawImage(
                this.activePlantImage,
                this.plantBoundingRect.x,
                this.plantBoundingRect.y,
                this.plantBoundingRect.width,
                this.plantBoundingRect.height
            )
        }
    }
    grow() {
        audioPlayer.playAudio('plant')
        if (this.size < this.plantImages.length - 1 && this.planted) {
            this.size++
            this.activePlant = this.plantSizes[this.size]
            this.activePlantImage = this.plantImages[this.size]
            this.plantBoundingRect = {
                x: this.potCenter.x - this.activePlant.width / 2,
                y: this.y - this.activePlant.height,
                width: this.activePlant.width,
                height: this.activePlant.height
            }
        }
    }
    shrink() {
        if (this.size > 0 && this.planted) {
            this.size--
            this.activePlant = this.plantSizes[this.size]
            this.activePlantImage = this.plantImages[this.size]
            this.plantBoundingRect = {
                x: this.potCenter.x - this.activePlant.width / 2,
                y: this.y - this.activePlant.height,
                width: this.activePlant.width,
                height: this.activePlant.height
            }
        } else {
            this.size = -1
            this.planted = false
        }
    }
    onClick() {
        //this.grow()
    }
    plantSeed() {
        audioPlayer.playAudio('seed')
        window.game.state.seedsPlanted += 1
        this.planted = true
        document.querySelector(`.seedButton[data-id="${this.id}"]`).removeEventListener('click', this.plantSeed)
        document.querySelector(`.seedButton[data-id="${this.id}"]`).classList.remove('active')
    }
    showSeedButton() {
        document.querySelector(`.seedButton[data-id="${this.id}"]`).classList.add('active')
        document.querySelector(`.seedButton[data-id="${this.id}"]`).addEventListener('click', this.plantSeed.bind(this))
    }
    createSeedButton() {
        if (!document.querySelector(`.seedButton[data-id="${this.id}"]`)) {
            overlay.innerHTML += `
                <div 
                    class="seedButton"
                    data-id="${this.id}"
                    style="left: ${this.potCenter.x - 40}px; top: ${this.potCenter.y - 160}px;" 
                >
                    <div class="seedButton__image">
                    </div>
                </div>
            `
        }
    }
}

export const loadPlantFactory = async () => {
    const manifest = await loadManifest('plant')
    manifest.image = await loadImage(manifest.mainImageURL)
    manifest.loadedPlantImages = []
    Promise.all([
        loadImage(manifest.plantImages[0]),
        loadImage(manifest.plantImages[1]),
        loadImage(manifest.plantImages[2]),
        loadImage(manifest.plantImages[3])
    ]).then(async plants => {
        manifest.loadedPlantImages = await plants
    })
    return new PlantFactory(manifest)
}
