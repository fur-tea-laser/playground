import { loopCosine, loopPoint, loopSine, setFrameCell } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const polarResolution_aa = 1028
  const polarResolution_bb = 1028
  const polarResolution_cc = 1028
  const cellCount = 8*polarResolution_aa + 8*polarResolution_bb + 4*polarResolution_cc
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const cellIndex = { ref: 0 }
  stamp_aa({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_aa,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 1,
    azimuthAngleBase: Math.PI/4,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[0.675,1,0,Math.PI/2*3,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.0075,
    translateVector: [-0.6,-0.4],
  })
  stamp_bb({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_bb,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 1,
    azimuthAngleBase: Math.PI/4,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[0.675,1,Math.PI/2*3,Math.PI,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.0075,
    translateVector: [0.5,0.625],
  })
  stamp_cc({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_cc,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 1,
    azimuthAngleBase: Math.PI/4,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[0.625,1,0,Math.PI/2,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.0075,
    translateVector: [-0.05,0],
  })
  Host.stampCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells

function stamp_aa({
  frameStamp,
  cellView,
  cellIndex,
  polarResolution,
  originAngle,
  originVector,
  loopsoidRadius,
  azimuthAngleBase,
  azimuthLoop,
  polarLoop,
  rotationAngle,
  rotationVector,
  frameCellSize,
  translateVector,
}) {
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/2,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/4,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/8,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/16,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/32,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/64,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/128,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 714,
    baseAzimuthAngleAmplitude: Math.PI/256,
    oscAzimuthAngleFrequency: 1022,
    oscAzimuthAngleAmplitude: Math.PI,
    ringColor: [255,255,255],
  })
}

function stamp_bb({
  frameStamp,
  cellView,
  cellIndex,
  polarResolution,
  originAngle,
  originVector,
  loopsoidRadius,
  azimuthAngleBase,
  azimuthLoop,
  polarLoop,
  rotationAngle,
  rotationVector,
  frameCellSize,
  translateVector,
}) {
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/2,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/4,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/8,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/16,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/32,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/64,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/128,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [0,0,0]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080,
    baseAzimuthAngleAmplitude: Math.PI/256,
    oscAzimuthAngleFrequency: 1024,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
}

function stamp_cc({
  frameStamp,
  cellView,
  cellIndex,
  polarResolution,
  originAngle,
  originVector,
  loopsoidRadius,
  azimuthAngleBase,
  azimuthLoop,
  polarLoop,
  rotationAngle,
  rotationVector,
  frameCellSize,
  translateVector,
}) {
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080+464,
    baseAzimuthAngleAmplitude: Math.PI/2,
    oscAzimuthAngleFrequency: 1024+258*2,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080+464,
    baseAzimuthAngleAmplitude: Math.PI/4,
    oscAzimuthAngleFrequency: 1024+258*2,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080+464,
    baseAzimuthAngleAmplitude: Math.PI/8,
    oscAzimuthAngleFrequency: 1024+258*2,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
  stampRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    baseAzimuthAngleFrequency: 1080+464,
    baseAzimuthAngleAmplitude: Math.PI/16,
    oscAzimuthAngleFrequency: 1024+258*2,
    oscAzimuthAngleAmplitude: Math.PI,   
    ringColor: [255,255,255]
  })
}

function stampRing({
  frameStamp,
  cellView,
  cellIndex,
  polarResolution,
  originAngle,
  originVector,
  loopsoidRadius,
  azimuthAngleBase,
  azimuthLoop,
  polarLoop,
  rotationAngle,
  rotationVector,
  frameCellSize,
  translateVector,
  ringColor,
  baseAzimuthAngleAmplitude,
  oscAzimuthAngleAmplitude,
  oscAzimuthAngleFrequency,
  baseAzimuthAngleFrequency,
  
}) {
  loopsoidRing({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution,
    originAngle,
    originVector,
    loopsoidRadius,
    azimuthAngleBase,
    azimuthLoop,
    polarLoop,
    rotationAngle,
    rotationVector,
    frameCellSize,
    translateVector,
    ringColor,
    getAzimuthAngleOffset: (polarAngle, frameStamp) => 
      (baseAzimuthAngleAmplitude + oscAzimuthAngleAmplitude * Math.sin(oscAzimuthAngleFrequency * polarAngle + Math.PI/2)) * Math.sin(baseAzimuthAngleFrequency * polarAngle + Math.PI/2)
  })
}

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