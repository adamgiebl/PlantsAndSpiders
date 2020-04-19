export class Timer {
    constructor() {
        this.startTime = 0
        this.timeElapsed = 0
    }
    start() {
        this.startTime = new Date()
    }
    logTimeElapsed() {
        let timeDiff = (new Date() - this.startTime) / 1000
        let seconds = Math.round(timeDiff)
        if (this.timeElapsed != seconds) {
            this.timeElapsed = seconds
            //console.log(this.timeElapsed)
        }
    }
    getTimeElapsed() {
        return this.timeElapsed
    }
}
