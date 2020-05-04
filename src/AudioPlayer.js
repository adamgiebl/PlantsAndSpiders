import gunshotSrc from '/static/sounds/ShotgunQuieter.mp3'
import splashSrc from '/static/sounds/Splash.mp3'
import glassShatterSrc from '/static/sounds/GlassShatter.mp3'
import musicSrc from '/static/sounds/reggae.mp3'

export class AudioPlayer {
    constructor() {
        this.audioContext = new AudioContext()
        this.audioBuffers = new Map()
        this.muted = false
        this.gainNodeFx = this.audioContext.createGain()
        this.gainNodeMusic = this.audioContext.createGain()
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
        source.connect(this.gainNodeFx)
        this.gainNodeFx.connect(this.audioContext.destination)
        source.buffer = this.audioBuffers.get(name)
        source.start(0)
    }
    playMusic(name) {
        const source = this.audioContext.createBufferSource()
        source.connect(this.gainNodeMusic)
        this.gainNodeMusic.connect(this.audioContext.destination)
        source.buffer = this.audioBuffers.get(name)
        source.start(0)
    }
    changeVolume(type, value) {
        if (type === 'MUSIC') {
            this.gainNodeMusic.gain.value = value
        } else if (type === 'FX') {
            this.gainNodeFx.gain.value = value
        }
    }
    async loadAllSounds() {
        await Promise.all([
            audioPlayer.loadAudio(gunshotSrc),
            audioPlayer.loadAudio(splashSrc),
            audioPlayer.loadAudio(glassShatterSrc),
            audioPlayer.loadAudio(musicSrc)
        ]).then(([gunshot, splash, glass, music]) => {
            audioPlayer.addAudio('gunshot', gunshot)
            audioPlayer.addAudio('splash', splash)
            audioPlayer.addAudio('glass', glass)
            audioPlayer.addAudio('music', music)
        })
    }
}

export const audioPlayer = new AudioPlayer()
