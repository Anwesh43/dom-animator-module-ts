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
            cb()
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

class Loop {

    constructor() {
        this.loopObjects = []
    }

    start(cb) {
        const loopObject = new LoopObject(cb)
        this.loopObjects.push(loopObject)
        if (this.loopObjects.length == 1) {
            console.log("loop started")
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
            console.log("loop stopped")
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
            console.log("stopping animation")
            loop.stop(this.t)
        }
    }
}

export default class DOMAnimatorNode {
    constructor(cb, from, to) {
        this.cb = cb
        this.from = from
        this.to = to
        this.state = new State()
        this.animator = new Animator()
        console.log(this.property)
    }

    update() {
        this.cb(this.from + (this.to - this.from) * this.state.scale)
        console.log(this.property)
    }

    start() {
        this.state.startUpdating(() => {
            this.animator.start(() => {
                this.update()
                this.state.update(() => {
                    this.animator.stop()
                })
            })
        })
    }

    static animate(propertycb, from, to) {
        const dan = new DOMAnimatorNode(propertycb, from, to)
        dan.start()
    }
}
