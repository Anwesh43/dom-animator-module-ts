import DOMAnimator from './DOMAnimator.mjs'
import {createBlocks} from './BlockCreator.mjs'
const blocks = createBlocks()
var start = 0
var blocksDelay = 60
console.log(blocks)
const updateBlocks = () => {
    console.log(start)
    var i = start
    DOMAnimator.animate((value) => {
        blocks[i].style.left = value
    }, 0, 1000)
    start++
    if (start < blocks.length) {
        setTimeout(updateBlocks, blocksDelay)
    }
}
updateBlocks()
