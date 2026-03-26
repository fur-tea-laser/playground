import { loopCosine, loopPoint, loopSine, setFrameCell } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const polarResolution_aa = 1028
  const polarResolution_bb = 1028
  const polarResolution_cc = 1028
  const polarResolution_dd = 1028
  const polarResolution_ee = 1028
  const cellCount = 
    8*polarResolution_aa + 
    8*polarResolution_bb + 
    4*polarResolution_cc + 
    8*polarResolution_dd + 
    polarResolution_ee
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const cellIndex = { ref: 0 }
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_aa,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 0.75,
    azimuthAngleBase: Math.PI/4,
    azimuthPhaseAngle: Math.PI/2,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[1,0,0,0,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.006,
    translateVector: [-0.65,-0.65],
    stampLayers: [
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/2,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/4,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/8,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/16,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/32,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/64,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/128,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 714,
        baseAzimuthAngleAmplitude: Math.PI/256,
        oscAzimuthAngleFrequency: 1022,
        oscAzimuthAngleAmplitude: Math.PI,
        ringColor: [255,255,255]
      }
    ]
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_bb,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 0.75,
    azimuthAngleBase: Math.PI/4,
    azimuthPhaseAngle: Math.PI/2,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[1,0,0,0,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.006,
    translateVector: [0.65,-0.65],
    stampLayers: [
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/2,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/4,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/8,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/16,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/32,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/64,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/128,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [0,0,0]
      },
      {
        baseAzimuthAngleFrequency: 1080,
        baseAzimuthAngleAmplitude: Math.PI/256,
        oscAzimuthAngleFrequency: 1024,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      }
    ]
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_cc,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 0.75,
    azimuthAngleBase: Math.PI/4,
    azimuthPhaseAngle: Math.PI/2,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[1,0,0,0,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.006,
    translateVector: [0,-0.65],
    stampLayers: [
      {
        baseAzimuthAngleFrequency: 1544,
        baseAzimuthAngleAmplitude: Math.PI/2,
        oscAzimuthAngleFrequency: 1540,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 1544,
        baseAzimuthAngleAmplitude: Math.PI/4,
        oscAzimuthAngleFrequency: 1540,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 1544,
        baseAzimuthAngleAmplitude: Math.PI/8,
        oscAzimuthAngleFrequency: 1540,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 1544,
        baseAzimuthAngleAmplitude: Math.PI/16,
        oscAzimuthAngleFrequency: 1540,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
    ]
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_dd,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 0.75,
    azimuthAngleBase: Math.PI/4,
    azimuthPhaseAngle: Math.PI/2,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[1,0,0,0,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.006,
    translateVector: [0.65,0],
    stampLayers: [
      {
        baseAzimuthAngleFrequency: 2554,
        baseAzimuthAngleAmplitude: Math.PI/32,
        oscAzimuthAngleFrequency: 1042,
        oscAzimuthAngleAmplitude: Math.PI/64,   
        ringColor: [255,255,255]
      },
    ]
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: polarResolution_ee,
    originAngle: 0,
    originVector: [0,0,-5],
    loopsoidRadius: 0.75,
    azimuthAngleBase: Math.PI/4,
    azimuthPhaseAngle: Math.PI/2,
    azimuthLoop: [[1,0,0,0,0]],
    polarLoop: [[1,0,0,Math.PI/2,0]],
    rotationAngle: Math.PI/2,
    rotationVector: [Math.cos(0), Math.sin(0)],
    frameCellSize: 0.006,
    translateVector: [0,0],
    stampLayers: [
      {
        baseAzimuthAngleFrequency: 255,
        baseAzimuthAngleAmplitude: Math.PI/5,
        oscAzimuthAngleFrequency: 1029,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 255,
        baseAzimuthAngleAmplitude: Math.PI/4,
        oscAzimuthAngleFrequency: 1029,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 255,
        baseAzimuthAngleAmplitude: Math.PI/3,
        oscAzimuthAngleFrequency: 1029,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 255,
        baseAzimuthAngleAmplitude: Math.PI/2,
        oscAzimuthAngleFrequency: 1029,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 255,
        baseAzimuthAngleAmplitude: Math.PI,
        oscAzimuthAngleFrequency: 1029,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [255,255,255]
      },
      {
        baseAzimuthAngleFrequency: 255,
        baseAzimuthAngleAmplitude: Math.PI/10,
        oscAzimuthAngleFrequency: 1029,
        oscAzimuthAngleAmplitude: Math.PI,   
        ringColor: [0,0,0]
      },
    ]
  })
  Host.stampCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells

function stampGroup({
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
  azimuthPhaseAngle,
  stampLayers
}) {
  for (const someLayer of stampLayers) {
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
      azimuthPhaseAngle,
      baseAzimuthAngleFrequency: someLayer.baseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: someLayer.baseAzimuthAngleAmplitude,
      oscAzimuthAngleFrequency: someLayer.oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: someLayer.oscAzimuthAngleAmplitude,
      ringColor: someLayer.ringColor
    })
  }
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
  azimuthPhaseAngle
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
      (baseAzimuthAngleAmplitude + oscAzimuthAngleAmplitude * Math.sin(oscAzimuthAngleFrequency * polarAngle + azimuthPhaseAngle)) * Math.sin(baseAzimuthAngleFrequency * polarAngle + azimuthPhaseAngle)
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