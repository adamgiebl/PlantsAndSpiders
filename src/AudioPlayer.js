import gunshotSrc from 'assets/sounds/ShotgunQuieter.mp3'
import splashSrc from 'assets/sounds/Splash.mp3'
import glassShatterSrc from 'assets/sounds/GlassShatter.mp3'

export class AudioPlayer {
    constructor() {
        this.audioContext = new AudioContext()
        this.audioBuffers = new Map()
    }
    loadAudio(src) {
        return fetch(src)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    }
    addAudio(name, buffer) {
        this.audioBuffers.set(name, buffer)
    }
    playAudio(name) {
        const source = this.audioContext.createBufferSource()
        source.connect(this.audioContext.destination)
        source.buffer = this.audioBuffers.get(name)
        console.log(source.buffer)
        source.start(0)
    }
}

export const audioPlayer = new AudioPlayer()
audioPlayer.loadAudio(gunshotSrc).then(buff => {
    audioPlayer.addAudio('gunshot', buff)
})
audioPlayer.loadAudio(splashSrc).then(buff => {
    audioPlayer.addAudio('splash', buff)
})
audioPlayer.loadAudio(glassShatterSrc).then(buff => {
    audioPlayer.addAudio('glass', buff)
})
