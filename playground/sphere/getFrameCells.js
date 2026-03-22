import { setFrameCell } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const azimuthResolution = 8
  const polarResolution = 1024
  const cellCount = azimuthResolution * polarResolution
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const originX = 0
  const originY = 0
  const originZ = -7
  const originAngle = 0
  const uX = Math.cos(originAngle)
  const uY = Math.sin(originAngle)
  const rotationAngle = 2 * Math.PI * frameStamp
  const c = Math.cos(rotationAngle)
  const s = Math.sin(rotationAngle)
  const t = 1 - Math.cos(rotationAngle)
  let azimuthAngle, polarAngle
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let rotateX, rotateY, rotateZ
  for (let i = 0; i < azimuthResolution; i++) {
    azimuthAngle = i * azimuthAngleStep
    for (let j = 0; j < polarResolution; j++) {
      polarAngle = j * polarAngleStep
      baseX = 1 * Math.sin(azimuthAngle) * Math.cos(polarAngle)
      baseY = 1 * Math.cos(azimuthAngle)
      baseZ = 1 * Math.sin(azimuthAngle) * Math.sin(polarAngle)
      orientX = baseX * uX - baseY * uY
      orientY = baseX * uY + baseY * uX
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
    }
  }
  Host.stampCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells