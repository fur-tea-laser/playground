
function getFrameCells(frameCount, frameIndex) {
  console.log(frameCount)
  console.log(frameIndex)
  const azimuthResolution = 7
  const polarResolution = 128
  const cellCount = azimuthResolution * polarResolution
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  let azimuthAngle, polarAngle
  let cellIndex = 0
  for (let i = 0; i < azimuthResolution; i++) {
    azimuthAngle = i * azimuthAngleStep
    for (let j = 0; j < polarResolution; j++) {
      polarAngle = j * polarAngleStep
      setFrameCell(
        cellView,
        cellIndex,
        Math.sin(azimuthAngle) * Math.cos(polarAngle),        
        Math.cos(azimuthAngle),
        Math.sin(azimuthAngle) * Math.sin(polarAngle) - 5,
        0.01,
        255,
        255,
        255
      )
      cellIndex += 1
    }
  }
  Host.renderFrameCells(cellBuffer)
}

function setFrameCell(cellView, cellIndex, centerX, centerY, centerZ, halfRoot, cellRed, cellGreen, cellBlue) {
	const cellByteOffset = 35 * cellIndex;
	cellView.setFloat64(cellByteOffset, centerX, true);
	cellView.setFloat64(cellByteOffset + 8, centerY, true);
	cellView.setFloat64(cellByteOffset + 16, centerZ, true);
	cellView.setFloat64(cellByteOffset + 24, halfRoot, true);
	cellView.setUint8(cellByteOffset + 32, cellRed);
	cellView.setUint8(cellByteOffset + 33, cellGreen);
	cellView.setUint8(cellByteOffset + 34, cellBlue);
}

globalThis.getFrameCells = getFrameCells