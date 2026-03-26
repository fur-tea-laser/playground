import { tower_aa } from "./tower_aa.js"
import { tower_bb } from "./tower_bb.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  tower_aa()
  tower_bb()
}

globalThis.getFrameCells = getFrameCells

