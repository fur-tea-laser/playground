import { phasedSpacer, spacer } from "./library/spacer/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const spacer_aa = getSymmetricalSpacer(spacer([13, [11,0],[7,0],[3,0]]))
  const azimuthResolution = 8
  const polarResolution = 512
  const cellCount = azimuthResolution * polarResolution * spacer_aa[0]
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const originAngleStep = 2 * Math.PI / spacer_aa[0]
  const rotationAngle = 2 * Math.PI * frameStamp
  const originZ = -7
  let originX_aa, originY_aa
  let azimuthAngle, polarAngle
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  const c = Math.cos(rotationAngle)
  const s = Math.sin(rotationAngle)
  const t = 1 - Math.cos(rotationAngle)
  let uX, uY
  let rotateX, rotateY, rotateZ
  let cellIndex = 0
  for (const k of spacer_aa[1]) {
    const originAngle = k * originAngleStep
    originX_aa = 0.5 * Math.cos(originAngle - Math.PI / 2)
    originY_aa = 0.5 * Math.sin(originAngle - Math.PI / 2)
    uX = Math.cos(originAngle)
    uY = Math.sin(originAngle)
    for (let i = 0; i < azimuthResolution; i++) {
      azimuthAngle = i * azimuthAngleStep
      for (let j = 0; j < polarResolution; j++) {
        polarAngle = j * polarAngleStep
        azimuthAngle = Math.PI / 4 * Math.sin(16 * polarAngle + frameStamp) + azimuthAngle
        baseX = 0.5 * Math.sin(azimuthAngle) * Math.cos(polarAngle)
        baseY = 0.5 * Math.cos(azimuthAngle)
        baseZ = 0.5 * Math.sin(azimuthAngle) * Math.sin(polarAngle)
        orientX = baseX * Math.cos(originAngle) - baseY * Math.sin(originAngle)
        orientY = baseX * Math.sin(originAngle) + baseY * Math.cos(originAngle)
        orientZ = baseZ
        rotateX = orientX * (c + uX * uX * t) + orientY * (uX * uY * t) + orientZ * (uY * s)
        rotateY = orientX * (uX * uY * t) + orientY * (c + uY * uY * t) - orientZ * (uX * s)
        rotateZ = -orientX * (uY * s) + orientY * (uX * s) + orientZ * (c)
        setFrameCell(
          cellView,
          cellIndex,
          rotateX + originX_aa,
          rotateY + originY_aa,
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

function getSymmetricalSpacer(someSpacer) {
  const nextSpacerPoints = new Set(someSpacer[1])
  for (const someSpacerPoint of someSpacer[1]) {
    const mirrorPoint = (someSpacer[0] - someSpacerPoint) % someSpacer[0]
    if (!nextSpacerPoints.has(mirrorPoint)) {
      nextSpacerPoints.add(mirrorPoint)
    }
  }
  return [someSpacer[0], Array.from(nextSpacerPoints)]
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