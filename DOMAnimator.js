const scGap = 0.05
const delay = 30

const updateValue = (scale, dir) => {
    return scale + dir * scGap
}
class State {

    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale = updateValue(this.scale, this.dir)
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class LoopObject {
    constructor(cb) {
        this.t = new Date().getTime()
        this.cb = cb
    }

    execute() {
        this.cb()
    }
}

class Loop() {

    constructor() {
        this.loopObjects = []
    }

    start(cb) {
        const loopObject = new LoopObject()
        this.loopObjects.push(loopObject)
        if (this.loopObjects.length == 1) {
            this.loop()
        }
        return loopObject.t
    }

    loop() {
        this.interval = setInterval(() => {
            this.loopObjects.forEach((loopObject) => {
                loopObject.execute()
            })
        }, delay)
    }

    stop(t) {
        this.loopObjects = this.loopObjects.filter(loopObject => loopObject.t != t)
        if (this.loopObjects.length == 0) {
            clearInterval(this.interval)
        }
    }
}

const loop = new Loop()

class Animator {

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.t = loop.start(cb)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            loop.stop(this.t)
        }
    }
}
