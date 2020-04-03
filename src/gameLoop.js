import { ctx, canvas } from 'shared/canvas'
import { Character, Scene, Spider, Plant } from './classes'
import { groundHeight } from 'shared/globalVariables'
import { getRandomInt } from 'shared/helpers'


export const GameLoop = (assets, plantImages) => {
    const [spiderImage, characterImage, sceneImage] = assets;
    const plantsImages = plantImages;
    const character = new Character(characterImage);
    const scene = new Scene(sceneImage);
    let groundY = canvas.height - groundHeight;

    let characterY = canvas.height - groundHeight - character.height + 5;

    let velocityX = 6;
    let velocityY = 0;
    let positionX = 100;
    let positionY = characterY;
    let gravity = 0.6;
    let keyPresses = {};
    let isOnGround = true;
    let spiders = [];
    let plants = [];


    const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 }

    const resizeCanvas = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(scene.image, 0, 0, canvas.width, canvas.height);
    }


    function keyUpListener(event) {
        if (event.keyCode === 32) {
            keyPresses["k32"] = false;
            if (velocityY < -6.0)
                velocityY = -6.0;
        } else {
            keyPresses["k" + event.keyCode] = false;
        }
    }

    function keyDownListener(event) {
        keyPresses["k" + event.keyCode] = true;
    }

    const removeSpider = (index) => {
        delete spiders[index]
    }

    for (let i = 0; i < 10; i++) {
        spiders.push(new Spider(getRandomInt(canvas.width), getRandomInt(canvas.height), canvasCenter.x, canvasCenter.y));
    }

    for (let i = 1; i < 5; i++) {
        plants.push(new Plant((100 * i) + 125 + i * 100, groundY, i));
    }
    console.log(plants);

    const gameLoop = () => {
        ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);
        velocityY += gravity;
        positionY += velocityY;

        ctx.fillStyle = "red";

        ctx.fillRect((canvas.width / 2) - 5, (canvas.height / 2) - 5, 10, 10);

        spiders.forEach((spider, index) => {
            let positionX = spider.positionX += (spider.velocityX * 1);
            let positionY = spider.positionY += (spider.velocityY * 1);
            if (positionX === spider.destinationX || positionY === spider.destinationY) {
                console.log('das')
                removeSpider(index);
            } else {
                ctx.drawImage(spiderImage, positionX, positionY, spider.width, spider.height);
            }
        })

        plants.forEach((plant, i) => {
            ctx.drawImage(plantsImages[i], plant.positionX, plant.positionY - plant.height, plant.width, plant.height);
        })


        if (positionY > characterY) {
            positionY = characterY;
            isOnGround = true;
            velocityY = 0.0;
        }
        if (keyPresses.k65) {
            if (positionX < 0) {
                //positionX = 0;
            } else {
                positionX -= velocityX;
            }
        } else if (keyPresses.k68) {
            if (positionX > canvas.width - character.width) {
                //positionX = canvas.width - character.width
            } else {
                positionX += velocityX;
            }
        }
        if (keyPresses.k32) {
            if (isOnGround) {
                velocityY = -12.0;
                isOnGround = false;
            }
        }

        ctx.drawImage(characterImage, positionX, positionY, character.width, character.height);
        window.requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);
    window.addEventListener('resize', resizeCanvas);

    return () => { window.requestAnimationFrame(gameLoop) }
}