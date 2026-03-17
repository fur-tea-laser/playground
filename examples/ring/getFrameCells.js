import { spacer, spacerSymmetricSlotWeights, phasedSpacer } from "../library/spacer/index.js"
import { loopCosine, loopPendulum, loopPoint, loopSine } from "../library/loop/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const orientation_aa = mapSpacer(spacer([frameCount,[5,0]]),frameIndex)
  const orientation_bb = mapSpacer(spacer([frameCount,[7,0]]),frameIndex)
  const orientation_cc = mapSpacer(spacer([frameCount,[11,0]]),frameIndex)
  const orientation_dd = mapSpacer(spacer([frameCount,[13,0]]),frameIndex)
  const orientation_ee = mapSpacer(spacer([frameCount,[17,0]]),frameIndex)
  const orientation_ff = mapSpacer(spacer([frameCount,[19,0]]),frameIndex)
  const orientation_gg = mapSpacer(spacer([frameCount,[29,0]]),frameIndex)
  const orientation_hh = mapSpacer(spacer([frameCount,[31,0]]),frameIndex)
  const ringSpacer = spacer([31,[30,0],[29,orientation_gg],[19,orientation_ff],[18,0],[17,orientation_ee],[13,orientation_dd],[12,0],[11,orientation_cc],[7,orientation_bb],[6,0],[5,orientation_aa]])
  const ringRadiusWeights = spacerSymmetricSlotWeights(spacer([31,[29,orientation_gg],[19,orientation_ff]]))
  const orbRadiusWeights = spacerSymmetricSlotWeights(spacer([31,[29,orientation_gg],[19,orientation_ff],[17,orientation_ee]]))
  const orbShapeWeights = spacerSymmetricSlotWeights(spacer([31,[30,0],[29,orientation_gg],[19,orientation_ff],[18,0],[17,orientation_ee]]))
  const azimuthOrientationWeights = spacerSymmetricSlotWeights(ringSpacer)
  const azimuthResolution = 31
  const azimuthDensity = 5
  const polarResolution = 1024
  const cellCount = ringSpacer[1].length * azimuthDensity * polarResolution * 2
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const ringAngleStep = 2 * Math.PI / ringSpacer[0]
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const originZ = -7
  let azimuthAngleBase, azimuthAngle, polarAngle
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let rotateX, rotateY, rotateZ
  for (const ringIndex of ringSpacer[1]) {
    const ringRadiusScalar = ringRadiusWeights[ringIndex]/ringRadiusWeights[0]
    const orbRadiusScalar = orbRadiusWeights[ringIndex]/orbRadiusWeights[0]
    const orbShapeScalar = orbShapeWeights[ringIndex]/orbShapeWeights[0]
    const azimuthSpacer = phasedSpacer(spacer([31,[30,0],[29,orientation_gg],[19,orientation_ff],[18,0],[17,orientation_ee],[13,orientation_dd],[12,0],[11,orientation_cc],[7,orientation_bb],[6,0],[5,azimuthOrientationWeights[ringIndex]-1]]),orientation_hh)
    const originAngle = ringIndex * ringAngleStep
    const originX = 1 * ringRadiusScalar * Math.cos(originAngle-Math.PI/2)
    const originY = 1 * ringRadiusScalar * Math.sin(originAngle-Math.PI/2)
    const uX = Math.cos(originAngle)
    const uY = Math.sin(originAngle)
    const rotationAngle = ringRadiusWeights[ringIndex] * 2 * Math.PI * frameStamp + Math.PI * (orbShapeWeights[ringIndex] / orbShapeWeights[0]) * Math.sin(2 * Math.PI * frameStamp) + originAngle
    const c = Math.cos(rotationAngle)
    const s = Math.sin(rotationAngle)
    const t = 1 - Math.cos(rotationAngle)
    for (const azimuthIndex of azimuthSpacer[1]) {
      if (azimuthIndex === 30) { continue }
      azimuthAngleBase = azimuthIndex * azimuthAngleStep
      for (let polarIndex=0; polarIndex<polarResolution; polarIndex++) {
        polarAngle = polarIndex * polarAngleStep
        azimuthAngle = azimuthAngleBase + (azimuthAngleStep / 2 + azimuthAngleStep / 2.5 * (1-orbRadiusScalar) * Math.sin(polarAngle + Math.PI))  * Math.sin(220 * polarAngle + 2 * Math.PI * frameStamp)
        // azimuthAngle = azimuthAngleBase + orbRadiusWeights[ringIndex] * azimuthAngleStep * Math.sin((azimuthIndex + 1) * orbShapeWeights[ringIndex] * polarAngle + 2 * Math.PI * frameStamp)
        const subOrientationAngle = (originAngle+2*Math.PI*frameStamp)%(2*Math.PI)
        const azimuthPoint = loopPoint([[0.25+orbShapeScalar*0.5,0.5,subOrientationAngle,Math.PI/2,0]], (azimuthAngle+Math.PI/2)%(2*Math.PI))
        const azimuthSine = loopSine(azimuthPoint)
        const azimuthCosine = loopCosine(azimuthPoint)
        const polarPoint = loopPoint([[0.25+orbShapeScalar*0.5,0.5,subOrientationAngle,Math.PI/2,0]], (polarAngle+Math.PI/2)%(2*Math.PI))
        const polarSine = loopSine(polarPoint)
        const polarCosine = loopCosine(polarPoint)
        baseX = (2-orbRadiusScalar) * azimuthSine * polarCosine
        baseY = (2-orbRadiusScalar) * azimuthCosine
        baseZ = (2-orbRadiusScalar) * azimuthSine * polarSine
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

function mapSpacer(someSpacer, targetIndex) {
  for (let i=0; i<someSpacer[1].length; i++) {
    if (targetIndex === someSpacer[1][i]) {
      return i
    }
    else if (targetIndex < someSpacer[1][i]) {
      return i - 1
    }
  }
  return someSpacer[1].length - 1
}