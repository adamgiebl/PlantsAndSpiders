export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

export function loadManifest(name) {
    return fetch(`manifests/${name}.json`).then(res => res.json())
}

export function loadAnimations(animations) {
    const animationsMap = new Map()
    animations.forEach(animation => {
        const spriteMap = new Map()
        animation.frames.forEach(frame => {
            spriteMap.set(frame.name, frame.rect)
        })
        animationsMap.set(animation.name, spriteMap)
    })
    return animationsMap
}
