
function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const azimuthResolution = 9
  const polarResolution = 128
  const cellCount = azimuthResolution * polarResolution
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const rotationAngle = 2 * Math.PI * frameStamp
  let azimuthAngle, polarAngle
  let baseX, baseY, baseZ
  let cellIndex = 0
  for (let i = 0; i < azimuthResolution; i++) {
    azimuthAngle = i * azimuthAngleStep
    for (let j = 0; j < polarResolution; j++) {
      polarAngle = j * polarAngleStep
      baseX = Math.sin(azimuthAngle) * Math.cos(polarAngle)
      baseY = Math.cos(azimuthAngle)
      baseZ = Math.sin(azimuthAngle) * Math.sin(polarAngle)
      setFrameCell(
        cellView,
        cellIndex,
        Math.sin(azimuthAngle) * Math.cos(polarAngle),        
        baseY * Math.cos(rotationAngle) - baseZ * Math.sin(rotationAngle),
        baseY * Math.sin(rotationAngle) + baseZ * Math.cos(rotationAngle) - 5,
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