import { loopCosine, loopPoint, loopSine, setFrameCell } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const polarResolution_aa = 1028
  const polarResolution_bb = 1028
  const polarResolution_cc = 1028
  const cellCount = polarResolution_aa + polarResolution_bb + polarResolution_cc
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const cellIndex = { ref: 0 }
  loopsoidRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_aa,
    originAngle: 0,
    originVector: [0.0,0,-5],
    loopsoidRadius: 1,
    azimuthAngleBase: Math.PI/4,
    getAzimuthAngleOffset: (polarAngle, frameStamp) => (Math.PI/16 + Math.PI/1.125 * Math.sin((336+176)*polarAngle+Math.PI/2*3)) * Math.sin(220*polarAngle+Math.PI/2),
    azimuthLoop: [[0.875,1,0,0,0]],
    polarLoop: [[0.75,1,0,Math.PI/2,0],[0.875,1,0,0,0],[0.95,1,0,0,0]],
    rotationAngle: Math.PI / 2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.0075,
    translateVector: [0,0.45],
    ringColor: [255,255,255]
  })
  loopsoidRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_bb,
    originAngle: Math.PI,
    originVector: [0.0,0,-5],
    loopsoidRadius: 1,
    azimuthAngleBase: Math.PI/4,
    getAzimuthAngleOffset: (polarAngle, frameStamp) => (Math.PI/16 + Math.PI/4 * Math.sin(336*polarAngle+Math.PI/2*3)) * Math.sin(860*polarAngle+Math.PI/2),
    azimuthLoop: [[0.875,1,0,0,0]],
    polarLoop: [[0.75,1,0,Math.PI/2,0],[0.875,1,0,0,0],[0.95,1,0,0,0]],
    rotationAngle: Math.PI / 2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.0075,
    translateVector: [0,-0.025],
    ringColor: [255,255,255]
  })
  loopsoidRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_cc,
    originAngle: Math.PI,
    originVector: [0.0,0,-5],
    loopsoidRadius: 1,
    azimuthAngleBase: Math.PI/4,
    getAzimuthAngleOffset: (polarAngle, frameStamp) => (Math.PI + Math.PI/2*Math.sin((516)*polarAngle+Math.PI/2*3)) * Math.sin(520*polarAngle+Math.PI/2),
    azimuthLoop: [[0.75,0,0,0,0]],
    polarLoop: [[0.75,1,Math.PI/2,0,0],[0.875,1,Math.PI/2,0,0],[0.95,1,Math.PI/2,0,0]],
    rotationAngle: Math.PI / 2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.0085,
    translateVector: [0.0,-0.7125],
    ringColor: [255,255,255]
  })
  Host.stampCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells

function loopsoidRing({
  polarResolution,
  originAngle,
  rotationAngle,
  azimuthAngleBase,
  getAzimuthAngleOffset,
  frameStamp,
  azimuthLoop,
  polarLoop,
  loopsoidRadius,
  rotationVector,
  cellView,
  cellIndex,
  originVector, 
  frameCellSize,
  translateVector,
  ringColor, 
}) {
  const polarAngleStep = 2 * Math.PI / polarResolution
  const originCos = Math.cos(originAngle)
  const originSin = Math.sin(originAngle)
  const rotationCos = Math.cos(rotationAngle)
  const rotationSin = Math.sin(rotationAngle)
  const invertRotationCos = 1 - Math.cos(rotationAngle)
  let polarAngle, azimuthAngle
  let azimuthPoint, azimuthCos, azimuthSin
  let polarPoint, polarCos, polarSin
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let rotateX, rotateY, rotateZ
  for (let polarIndex=0; polarIndex<polarResolution; polarIndex++) {
    polarAngle = polarIndex * polarAngleStep
    azimuthAngle = azimuthAngleBase + getAzimuthAngleOffset(polarAngle, frameStamp)
    azimuthPoint = loopPoint(azimuthLoop, (azimuthAngle) % (2 * Math.PI))
    azimuthCos = loopCosine(azimuthPoint)
    azimuthSin = loopSine(azimuthPoint)
    polarPoint = loopPoint(polarLoop, polarAngle)
    polarCos = loopCosine(polarPoint)
    polarSin = loopSine(polarPoint)
    baseX = loopsoidRadius * azimuthSin * polarCos
    baseY = loopsoidRadius * azimuthCos
    baseZ = loopsoidRadius * azimuthSin * polarSin
    rotateX = baseX * (rotationCos + rotationVector[0] * rotationVector[0] * invertRotationCos) + baseY * (rotationVector[0] * rotationVector[1] * invertRotationCos) + baseZ * (rotationVector[1] * rotationSin)
    rotateY = baseX * (rotationVector[0] * rotationVector[1] * invertRotationCos) + baseY * (rotationCos + rotationVector[1] * rotationVector[1] * invertRotationCos) - baseZ * (rotationVector[0] * rotationSin)
    rotateZ = -baseX * (rotationVector[1] * rotationSin) + baseY * (rotationVector[0] * rotationSin) + baseZ * (rotationCos)
    orientX = rotateX * originCos - rotateY * originSin
    orientY = rotateX * originSin + rotateY * originCos
    orientZ = rotateZ
    setFrameCell(
      cellView,
      cellIndex.ref,
      orientX + originVector[0],
      orientY + originVector[1],
      orientZ + originVector[2],
      frameCellSize,
      translateVector[0],
      translateVector[1],
      ringColor[0],
      ringColor[1],
      ringColor[2]
    )
    cellIndex.ref += 1
  }
}