const w = window.innerWidth
const h = window.innerHeight
const n = 10
const size = Math.min(w, h) / n

const createGreenBlock = (i) => {
    const div = document.createElement('div')
    div.style.width = size
    div.style.height = size
    div.style.position = 'absolute'
    div.style.background = 'green'
    div.style.left = 0
    div.style.top = i * size
    document.body.appendChild(div)
    return div
}

const createBlocks = () => {
    const blocks = []
    for (var i = 0; i < n; i++) {
        blocks.push(createGreenBlock(i))
    }
    return blocks
}
export {createBlocks}
