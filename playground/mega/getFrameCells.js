import { loopCosine, loopPoint, loopSine, setFrameCell } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const megaPolarResolution = 1028
  const cellCount = 
    4*22*megaPolarResolution
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const cellIndex = { ref: 0 }
  const megaOriginAngle = 0
  const megaOriginVector = [0,0,-5]
  const megaLoopsoidRadius = 2
  const megaAzimuthAngleBase = Math.PI/4
  const megaAzimuthPhaseAngle = 0
  const megaAzimuthLoop = [[1,0,0,0,0]]
  const megaPolarLoop = [[1,0,0,0,0]]
  const megaRotationAngle = Math.PI/2
  const megaRotationVector = [Math.cos(0), Math.sin(0)]
  const megaTranslateVector = [0,0]
  const megaBaseAzimuthAngleFrequency = 513+2*171//1001
  const oscAzimuthAngleFrequency = 3+2*263//769
  const megaStampLayers = [
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/12,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/11.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/11,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/10.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/10,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/9.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/9,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/8.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/8,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/7.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/7,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/6.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/6,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/5.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/4.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/4,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/3.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/3,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/2.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/2,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [255,255,255]
    },
    {
      baseAzimuthAngleFrequency: megaBaseAzimuthAngleFrequency,
      baseAzimuthAngleAmplitude: Math.PI/1.5,
      oscAzimuthAngleFrequency: oscAzimuthAngleFrequency,
      oscAzimuthAngleAmplitude: Math.PI,   
      ringColor: [0,0,0]
    },
  ]
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: megaPolarResolution,
    originAngle: megaOriginAngle,
    originVector: megaOriginVector,
    loopsoidRadius: megaLoopsoidRadius,
    azimuthAngleBase: megaAzimuthAngleBase,
    azimuthPhaseAngle: megaAzimuthPhaseAngle,
    azimuthLoop: megaAzimuthLoop,
    polarLoop: megaPolarLoop,
    rotationAngle: megaRotationAngle,
    rotationVector: megaRotationVector,
    translateVector: megaTranslateVector,
    stampLayers: megaStampLayers,
    frameCellSize: 0.05,    
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: megaPolarResolution,
    originAngle: megaOriginAngle,
    originVector: megaOriginVector,
    loopsoidRadius: megaLoopsoidRadius,
    azimuthAngleBase: megaAzimuthAngleBase,
    azimuthPhaseAngle: megaAzimuthPhaseAngle,
    azimuthLoop: megaAzimuthLoop,
    polarLoop: megaPolarLoop,
    rotationAngle: megaRotationAngle,
    rotationVector: megaRotationVector,
    translateVector: megaTranslateVector,
    stampLayers: megaStampLayers,
    frameCellSize: 0.025,
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: megaPolarResolution,
    originAngle: megaOriginAngle,
    originVector: megaOriginVector,
    loopsoidRadius: megaLoopsoidRadius,
    azimuthAngleBase: megaAzimuthAngleBase,
    azimuthPhaseAngle: megaAzimuthPhaseAngle,
    azimuthLoop: megaAzimuthLoop,
    polarLoop: megaPolarLoop,
    rotationAngle: megaRotationAngle,
    rotationVector: megaRotationVector,
    translateVector: megaTranslateVector,
    stampLayers: megaStampLayers,
    frameCellSize: 0.0125,
  })
  stampGroup({
    frameStamp,
    cellView,
    cellIndex,
    polarResolution: megaPolarResolution,
    originAngle: megaOriginAngle,
    originVector: megaOriginVector,
    loopsoidRadius: megaLoopsoidRadius,
    azimuthAngleBase: megaAzimuthAngleBase,
    azimuthPhaseAngle: megaAzimuthPhaseAngle,
    azimuthLoop: megaAzimuthLoop,
    polarLoop: megaPolarLoop,
    rotationAngle: megaRotationAngle,
    rotationVector: megaRotationVector,
    translateVector: megaTranslateVector,
    stampLayers: megaStampLayers,
    frameCellSize: 0.00625,
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