import { phasedSpacer, spacer, spacerSymmetricSlotWeights } from "../library/spacer/index.js"
import { loopPoint, loopSine, loopCosine } from "../library/loop/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const polarResolution = 1024
  const azimuthResolution = frameCount
  const azimuthDensity = 5
  const orientation_aa = mapSpacer(spacer([frameCount,[5,0]]),frameIndex)
  const orientation_bb = mapSpacer(spacer([frameCount,[7,0]]),frameIndex)
  const orientation_cc = mapSpacer(spacer([frameCount,[11,0]]),frameIndex)
  const orientation_dd = mapSpacer(spacer([frameCount,[13,0]]),frameIndex)
  const orientation_ee = mapSpacer(spacer([frameCount,[17,0]]),frameIndex)
  const orientation_ff = mapSpacer(spacer([frameCount,[19,0]]),frameIndex)
  const orientation_gg = mapSpacer(spacer([frameCount,[12,0]],frameIndex))
  const orientation_hh = mapSpacer(spacer([frameCount,[18,0]],frameIndex))
  const orientation_ii = mapSpacer(spacer([frameCount,[3,0]],frameIndex))
  const ringSpacer = spacer([23,[19,orientation_ff],[17,orientation_ee],[13,orientation_dd],[11,orientation_cc],[7,orientation_bb],[5,orientation_aa]])
  const innerSpacer = spacer([23,[19,orientation_ff],[17,orientation_ee],[13,orientation_dd],[11,orientation_cc],[7,orientation_bb],[5,orientation_aa],[3,orientation_ii]])
  const ringWeights_aa = spacerSymmetricSlotWeights(spacer([23,[19,orientation_ff],[17,orientation_ee],[13,orientation_dd],[12,orientation_gg]]))
  const ringWeights_bb = spacerSymmetricSlotWeights(spacer([23,[18,orientation_hh],[12,orientation_gg]]))
  const cellCount = ringSpacer[0] * azimuthDensity * polarResolution * 2 *2
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const originAngleStep = 2 * Math.PI / ringSpacer[0]
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const originZ = -7
  let originX, originY
  let azimuthAngleBase, azimuthAngle, polarAngle
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let uX, uY
  let rotateX, rotateY, rotateZ
  for (const ringIndex of ringSpacer[1]) {
    if (ringIndex === 0) continue
    const ringScalar_aa = ringWeights_aa[ringIndex]/ringWeights_aa[0]
    const ringScalar_bb = ringWeights_bb[ringIndex]/ringWeights_bb[0]
    const originAngle = ringIndex * originAngleStep
    originX = (2.25-ringScalar_aa) * Math.cos(originAngle-Math.PI/2)
    originY = (2.25-ringScalar_aa) * Math.sin(originAngle-Math.PI/2)
    const rotationVectorAngle = ringIndex>0?originAngle+originAngleStep*Math.sin(2*Math.PI*frameStamp+2*Math.PI*ringScalar_aa):originAngle
    uX = Math.cos(rotationVectorAngle)
    uY = Math.sin(rotationVectorAngle)
    const rotationAngle = ringWeights_aa[ringIndex]*2*Math.PI*frameStamp+originAngle+Math.PI*ringScalar_bb*Math.sin(2*Math.PI*frameStamp)
    const c = Math.cos(rotationAngle)
    const s = Math.sin(rotationAngle)
    const t = 1 - Math.cos(rotationAngle)
    const orientation_jj = mapSpacer(spacer([ringSpacer[0],[ringWeights_aa[ringIndex],0]]),ringIndex)
    const orientation_kk = mapSpacer(spacer([ringSpacer[0],[3,0]]),ringIndex)
    const azimuthSpacer = spacer([frameCount,[ringSpacer[0],ringIndex],[ringWeights_aa[ringIndex],orientation_jj],[3,orientation_kk]])
    const azimuthWeights = spacerSymmetricSlotWeights(azimuthSpacer)
    const phasedAzimuthSpacer = phasedSpacer(azimuthSpacer,frameIndex)
    for (let __azimuthIndex=0; __azimuthIndex<phasedAzimuthSpacer[1].length; __azimuthIndex++) {
      const azimuthWeight = azimuthWeights[azimuthSpacer[1][__azimuthIndex]]
      const azimuthIndex = phasedAzimuthSpacer[1][__azimuthIndex];
      azimuthAngleBase = azimuthIndex * azimuthAngleStep
      for (let polarIndex=0; polarIndex<polarResolution; polarIndex++) {
        polarAngle = polarIndex * polarAngleStep
        azimuthAngle = azimuthAngleBase + azimuthWeight*Math.PI/64*Math.sin(220*polarAngle+2*Math.PI*frameStamp)
        const subOrientationAngle = ringIndex>0?(originAngle+2*Math.PI*frameStamp)%(2*Math.PI):originAngle
        const azimuthPoint = loopPoint([[0.875-0.5*ringScalar_aa,0.75-ringScalar_bb*0.5,subOrientationAngle,Math.PI/2,0]], (azimuthAngle+Math.PI/2)%(2*Math.PI))
        const azimuthSine = loopSine(azimuthPoint)
        const azimuthCosine = loopCosine(azimuthPoint)
        const polarPoint = loopPoint([[0.875-0.5*ringScalar_aa,0.75-ringScalar_bb*0.5,subOrientationAngle,Math.PI/2,0]], (polarAngle+Math.PI/2)%(2*Math.PI))
        const polarSine = loopSine(polarPoint)
        const polarCosine = loopCosine(polarPoint)
        baseX = (0.33 + 0.33*ringScalar_bb) * azimuthSine * polarCosine
        baseY = (0.33 + 0.33*ringScalar_bb) * azimuthCosine
        baseZ = (0.33 + 0.33*ringScalar_bb) * azimuthSine * polarSine
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
          0.0035,
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
          0.0035,
          255,
          255,
          255
        )
        cellIndex += 1
      }
    }
  }
  for (const ringIndex of innerSpacer[1]) {
    if (ringIndex === 0) continue
    const ringScalar_aa = ringWeights_aa[ringIndex]/ringWeights_aa[0]
    const ringScalar_bb = ringWeights_bb[ringIndex]/ringWeights_bb[0]
    const originAngle = ringIndex * originAngleStep
    originX = (ringScalar_aa) * Math.cos(originAngle-Math.PI/2+Math.PI)
    originY = (ringScalar_aa) * Math.sin(originAngle-Math.PI/2+Math.PI)
    const rotationVectorAngle = ringIndex>0?originAngle+originAngleStep*Math.sin(2*Math.PI*frameStamp+2*Math.PI*ringScalar_aa):originAngle
    uX = Math.cos(rotationVectorAngle)
    uY = Math.sin(rotationVectorAngle)
    const rotationAngle = ringWeights_aa[ringIndex]*2*Math.PI*frameStamp+originAngle+Math.PI*ringScalar_bb*Math.sin(2*Math.PI*frameStamp)
    const c = Math.cos(rotationAngle)
    const s = Math.sin(rotationAngle)
    const t = 1 - Math.cos(rotationAngle)
    const orientation_jj = mapSpacer(spacer([ringSpacer[0],[ringWeights_aa[ringIndex],0]]),ringIndex)
    const orientation_kk = mapSpacer(spacer([ringSpacer[0],[3,0]]),ringIndex)
    const azimuthSpacer = spacer([frameCount,[ringSpacer[0],ringIndex],[ringWeights_aa[ringIndex],orientation_jj],[3,orientation_kk]])
    const azimuthWeights = spacerSymmetricSlotWeights(azimuthSpacer)
    const phasedAzimuthSpacer = phasedSpacer(azimuthSpacer,frameIndex)
    for (let __azimuthIndex=0; __azimuthIndex<phasedAzimuthSpacer[1].length; __azimuthIndex++) {
      const azimuthWeight = azimuthWeights[azimuthSpacer[1][__azimuthIndex]]
      const azimuthIndex = phasedAzimuthSpacer[1][__azimuthIndex];
      azimuthAngleBase = azimuthIndex * azimuthAngleStep
      for (let polarIndex=0; polarIndex<polarResolution; polarIndex++) {
        polarAngle = polarIndex * polarAngleStep
        azimuthAngle = azimuthAngleBase + azimuthWeight*Math.PI/64*Math.sin(220*polarAngle+2*Math.PI*frameStamp)
        const subOrientationAngle = ringIndex>0?(originAngle+2*Math.PI*frameStamp)%(2*Math.PI):originAngle
        const azimuthPoint = loopPoint([[0.875-0.5*ringScalar_aa,0.75-ringScalar_bb*0.5,subOrientationAngle,Math.PI/2,0]], (azimuthAngle+Math.PI/2)%(2*Math.PI))
        const azimuthSine = loopSine(azimuthPoint)
        const azimuthCosine = loopCosine(azimuthPoint)
        const polarPoint = loopPoint([[0.875-0.5*ringScalar_aa,0.75-ringScalar_bb*0.5,subOrientationAngle,Math.PI/2,0]], (polarAngle+Math.PI/2)%(2*Math.PI))
        const polarSine = loopSine(polarPoint)
        const polarCosine = loopCosine(polarPoint)
        baseX = (0.33 + 0.33*ringScalar_bb) * azimuthSine * polarCosine
        baseY = (0.33 + 0.33*ringScalar_bb) * azimuthCosine
        baseZ = (0.33 + 0.33*ringScalar_bb) * azimuthSine * polarSine
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
          0.0035,
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
          0.0035,
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