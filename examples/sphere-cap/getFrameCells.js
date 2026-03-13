
function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const azimuthResolution = 8
  const polarResolution = 512
  const cellCount = azimuthResolution * polarResolution
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const azimuthAngleStep = Math.PI / 8 / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const originZ = -5
  let originX, originY
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let rotateX, rotateY, rotateZ
  let uX, uY
  const rotationAngle = Math.PI / 2
  const c = Math.cos(rotationAngle)
  const s = Math.sin(rotationAngle)
  const t = 1 - Math.cos(rotationAngle)
  const originAngle = 0
  originX = 0.0 * Math.cos(originAngle - Math.PI / 2)
  originY = 0.0 * Math.sin(originAngle - Math.PI / 2)
  uX = Math.cos(originAngle)
  uY = Math.sin(originAngle)
  for (let i=0; i<azimuthResolution; i++) {
    const azimuthAngle =  Math.PI - i * azimuthAngleStep 
    for (let j=0; j<polarResolution; j++) {
      const polarAngle = j * polarAngleStep
      baseX = 1 * Math.sin(azimuthAngle) * Math.cos(polarAngle)
      baseY = 1 * Math.cos(azimuthAngle)
      baseZ = 1 * Math.sin(azimuthAngle) * Math.sin(polarAngle)
      orientX = baseX * Math.cos(originAngle) - baseY * Math.sin(originAngle)
      orientY = baseX * Math.sin(originAngle) + baseY * Math.cos(originAngle)
      orientZ = baseZ
      rotateX = orientX * (c + uX * uX * t) + orientY * (uX * uY * t) + orientZ * (uY * s)
      rotateY = orientX * (uX * uY * t) + orientY * (c + uY * uY * t) - orientZ * (uX * s)
      rotateZ = -orientX * (uY * s) + orientY * (uX * s) + orientZ * (c)
      setFrameCell(
        cellView,
        cellIndex,
        rotateX + originX,
        rotateY + originY,
        rotateZ + originZ,
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