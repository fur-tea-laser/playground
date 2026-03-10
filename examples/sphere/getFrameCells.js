
function getFrameCells(frameCount, frameIndex) {
  console.log(frameCount)
  console.log(frameIndex)
  const cellBuffer = Host.getFrameCellBuffer(12)
  Host.renderFrameCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells