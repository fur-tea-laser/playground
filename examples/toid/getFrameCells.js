
function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const ringResolution = 12
  const azimuthResolution = 5
  const polarResolution = 512
  const cellCount = ringResolution * azimuthResolution * polarResolution * 2
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const originAngleStep = 2 * Math.PI / ringResolution
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const rotationAngle = 2 * Math.PI * frameStamp
  const c = Math.cos(rotationAngle)
  const s = Math.sin(rotationAngle)
  const t = 1 - Math.cos(rotationAngle)
  const originZ = -7
  let originX, originY
  let azimuthAngle, polarAngle
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let uX, uY
  let rotateX, rotateY, rotateZ
  for (let ringIndex=0; ringIndex<ringResolution; ringIndex++) {
    const originAngle = ringIndex * originAngleStep
    originX = 2 * Math.cos(originAngle-Math.PI/2)
    originY = 2 * Math.sin(originAngle-Math.PI/2)
    uX = Math.cos(originAngle)
    uY = Math.sin(originAngle)
    for (let azimuthIndex=0; azimuthIndex<azimuthResolution; azimuthIndex++) {
      azimuthAngle = azimuthIndex * azimuthAngleStep
      for (let polarIndex=0; polarIndex<polarResolution; polarIndex++) {
        polarAngle = polarIndex * polarAngleStep
        baseX = 0.25 * Math.sin(azimuthAngle) * Math.cos(polarAngle)
        baseY = 0.25 * Math.cos(azimuthAngle)
        baseZ = 0.25 * Math.sin(azimuthAngle) * Math.sin(polarAngle)
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
          0.005,
          255,
          255,
          255
        )
        cellIndex += 1
        setFrameCell(
          cellView,
          cellIndex,
          -rotateX - originX,
          rotateY + originY,
          rotateZ + originZ,
          0.005,
          255,
          255,
          255
        )
        cellIndex += 1
      }
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