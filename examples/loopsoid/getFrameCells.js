import { loopPoint, loopCosine, loopSine } from "../library/loop/index.js"
import { phasedSpacer, spacer, spacerSymmetricSlotWeights } from "../library/spacer/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const azimuthResolution = frameCount
  const azimuthDensity = 5
  const polarResolution = 1024
  const ringResolution = 31
  const ringOrientation_aa = spacerOrientation(spacer([frameCount, [4,0]]), frameIndex)
  const ringOrientation_bb = spacerOrientation(spacer([frameCount, [7,0]]), frameIndex)
  const ringSpacer = spacer([ringResolution, [29,0],[19,0],[17,0],[13,0],[11,0],[7,ringOrientation_bb],[4,ringOrientation_aa]])
  const ringRadiusWeights = spacerSymmetricSlotWeights(spacer([ringResolution, [29,0],[19,0],[17,0]]))
  const orbShapeWeights = spacerSymmetricSlotWeights(spacer([ringResolution, [29,0],[19,0]]))
  const cellCount = azimuthDensity * polarResolution * ringSpacer[1].length * 2
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const ringAngleStep = 2 * Math.PI / ringResolution
  const originZ = -7
  let azimuthPoint, azimuthCosine, azimuthSine
  let polarPoint, polarCosine, polarSine
  let originAngle, azimuthAngle, azimuthAngleBase, polarAngle
  let originX, originY
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let rotateX, rotateY, rotateZ
  let uX, uY
  const rotationAngle = 2 * Math.PI * frameStamp
  const c = Math.cos(rotationAngle)
  const s = Math.sin(rotationAngle)
  const t = 1 - Math.cos(rotationAngle)
  const azimuthOrientation_bb = spacerOrientation(spacer([frameCount, [7,0]]), frameIndex)
  for (const ringIndex of ringSpacer[1]) {
    const azimuthOrientation = spacerOrientation(spacer([ringResolution, [azimuthDensity,0]]), ringIndex)
    const azimuthSpacer = phasedSpacer(spacer([frameCount, [521,0],[30,0],[29,0],[19,0],[17,0],[13,0],[11,0],[7,azimuthOrientation_bb],[azimuthDensity,azimuthOrientation]]), frameIndex)
    const ringRadius = ringRadiusWeights[ringIndex] / ringRadiusWeights[0]
    const orbShape = orbShapeWeights[ringIndex] / orbShapeWeights[0]
    originAngle = ringIndex * ringAngleStep
    originX = ringRadius * Math.cos(originAngle - Math.PI / 2)
    originY = ringRadius * Math.sin(originAngle - Math.PI / 2)
    uX = Math.cos(originAngle)
    uY = Math.sin(originAngle)
    for (const i of azimuthSpacer[1]) {
      azimuthAngleBase = i * azimuthAngleStep
      for (let j=0; j<polarResolution; j++) {
        polarAngle = j * polarAngleStep
        azimuthAngle = azimuthAngleBase + ringRadiusWeights[ringIndex] * azimuthAngleStep * Math.sin((i + 1) * 220 * polarAngle + frameStamp)
        azimuthPoint = loopPoint([[orbShape,1,originAngle,Math.PI/2,0]], azimuthAngle + Math.PI / 2)
        azimuthCosine = loopCosine(azimuthPoint)
        azimuthSine = loopSine(azimuthPoint)
        polarPoint = loopPoint([[orbShape,1,originAngle,Math.PI/2,0]], polarAngle)
        polarCosine = loopCosine(polarPoint)
        polarSine = loopSine(polarPoint)
        baseX = 1 * azimuthSine * polarCosine
        baseY = 1 * azimuthCosine
        baseZ = 1 * azimuthSine * polarSine
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

globalThis.getFrameCells = getFrameCells

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

function spacerOrientation(someSpacer, targetIndex) {
  for (let i=0; i<someSpacer[1].length; i++) {
    if (targetIndex === someSpacer[1][i]) {
      return i
    }
    else if (targetIndex < someSpacer[1][i]) {
      return i - 1
    }
  }
}