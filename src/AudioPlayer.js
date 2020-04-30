import gunshotSrc from 'assets/sounds/ShotgunQuieter.mp3'
import splashSrc from 'assets/sounds/Splash.mp3'
import glassShatterSrc from 'assets/sounds/GlassShatter.mp3'
import musicSrc from 'assets/sounds/reggae.mp3'

export class AudioPlayer {
    constructor() {
        this.audioContext = new AudioContext()
        this.audioBuffers = new Map()
        this.muted = false
        this.gainNode = this.audioContext.createGain()
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
        source.connect(this.gainNode)
        this.gainNode.connect(this.audioContext.destination)
        source.buffer = this.audioBuffers.get(name)
        source.start(0)
    }
    toggleMuteAudio() {
        if (!this.muted) {
            this.muted = true
            this.gainNode.gain.value = 0
        } else {
            this.muted = false
            this.gainNode.gain.value = 1
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
audioPlayer.toggleMuteAudio()
