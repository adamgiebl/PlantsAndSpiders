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
