import { setFrameCell, spacer, orientatedSpacer } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const flagSpacerResolution = 2142
  const spacer_aa = spacer([flagSpacerResolution,[2141,0],[1092,0]])
  const points_aa = new Set(spacer_aa[1])
  const weights_aa = fasterWeights(spacer([flagSpacerResolution,[2141,0]]),spacer([2141,[1092,0]]))
  const colorsSpacer = spacer([flagSpacerResolution,[2141,0],[1092,0],[3,0]])
  const radiusAngleFrequencies = [
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
    224,
  ]
  const cellCount = radiusAngleFrequencies.length*2*flagSpacerResolution
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const cellIndexRef = { value: 0 }
  const rotationAngle_aa = -Math.PI/4
  const colors = [
  // Nuclear Lime: [Base, Lighter]
  [[204, 255, 0], [224, 255, 102]],
  // Plasma Blue: [Base, Lighter]
  [[0, 102, 255], [102, 163, 255]],
  // Radiant Amber: [Base, Lighter]
  [[255, 153, 0], [255, 194, 102]]
];
  let pointWeight, pointWeightStamp
  let cellColor
  const cellSize = 0.025
  const radiusAngleStep = 2*Math.PI/flagSpacerResolution
  const horizontalStep = 2/flagSpacerResolution
  const radiusXLength = 4
  const radiusXFrequency = 220
  const radiusYLength = 4
  const radiusYFrequency = 3//+327
  let rotationAxisX = Math.cos(0)
  let rotationAxisY = Math.sin(0)
  const rotationCos = Math.cos(rotationAngle_aa)
  const rotationSin = Math.sin(rotationAngle_aa)
  const rotationCosInv = 1-Math.cos(rotationAngle_aa)
  const originX = -1
  const originY = 0
  const originZ = -10
  const translateX = 0
  const translateYShift = -0.975
  for (let i=0; i<flagSpacerResolution; i++) {
    pointWeight = weights_aa[i]
    pointWeightStamp = pointWeight/weights_aa[0]
    cellColor = 
      i<colorsSpacer[1][1] ? colors[0][0]
      : i<colorsSpacer[1][2] ? colors[1][0]
      : colors[2][0]
    radiusAngleFrequencies.forEach((someRadiusAngleFrequency, frequencyIndex) => {
      const axisAngle = 0//Math.PI/8*Math.sin((220+327)*2*Math.PI/radiusAngleFrequencies.length*frequencyIndex)
      rotationAxisX = Math.cos(axisAngle)
      rotationAxisY = Math.sin(axisAngle)
      if (points_aa.has(i)) {
        setFlagCell({
          cellView,
          cellIndexRef,
          spacerPoint: i,
          radiusAngleStep,
          horizontalStep,
          radiusXLength,
          radiusXFrequency,
          radiusYLength,
          radiusYFrequency,
          rotationAxisX,
          rotationAxisY,
          rotationCos,
          rotationSin,
          rotationCosInv,
          originX,
          originY,
          originZ,
          translateX,
          cellSize,
          cellColor,
          radiusAngleFrequency: someRadiusAngleFrequency,
          translateY: -0.31+0.06*frequencyIndex+translateYShift,
        })
      }
    })
  }
  Host.stampCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells

function interpolateColor(color1, color2, t) {
  const r = Math.round(color1[0] + (color2[0] - color1[0]) * t);
  const g = Math.round(color1[1] + (color2[1] - color1[1]) * t);
  const b = Math.round(color1[2] + (color2[2] - color1[2]) * t);
  return [r, g, b];
}

function fasterWeights(baseSpacer,terminalSpacer) {
  const weightsResult = new Array(baseSpacer[0]).fill(0)
  terminalSpacer[1].forEach((someTerminalPoint, pointIndex) => {
    const currentSpacer = orientatedSpacer(terminalSpacer,pointIndex)
    for (const someBasePoint of currentSpacer[1]) {
      weightsResult[baseSpacer[1][someBasePoint]] += 1
    }
  })
  return weightsResult
}

function setFlagCell({
  spacerPoint,
  radiusAngleStep,
  radiusAngleFrequency,
  radiusXLength,
  radiusXFrequency,
  radiusYLength,
  radiusYFrequency,
  horizontalStep,
  rotationAxisX,
  rotationAxisY,
  rotationCos,
  rotationSin,
  rotationCosInv,
  originX,
  originY,
  originZ,
  cellView,
  cellIndexRef,
  cellSize,
  translateX,
  translateY,
  cellColor
}) {
  const radiusAngleBase = radiusAngleStep*spacerPoint
  const radiusAngle = Math.PI*Math.sin(radiusAngleFrequency*radiusAngleBase)
  const radiusX = radiusXLength*Math.cos(radiusXFrequency*radiusAngle)
  const radiusY = radiusYLength*Math.sin(radiusYFrequency*radiusAngle)
  const baseX = horizontalStep*spacerPoint+radiusX
  const baseY = radiusY
  const orientX = baseX * rotationAxisX - baseY * rotationAxisY
  const orientY = baseX * rotationAxisY + baseY * rotationAxisX
  const orientZ = 0
  const rotateX = orientX * (rotationCos + rotationAxisX * rotationAxisX * rotationCosInv) + orientY * (rotationAxisX * rotationAxisY * rotationCosInv) + orientZ * (rotationAxisY * rotationSin)
  const rotateY = orientX * (rotationAxisX * rotationAxisY * rotationCosInv) + orientY * (rotationCos + rotationAxisY * rotationAxisY * rotationCosInv) - orientZ * (rotationAxisX * rotationSin)
  const rotateZ = -orientX * (rotationAxisY * rotationSin) + orientY * (rotationAxisX * rotationSin) + orientZ * (rotationCos)
  setFrameCell(
    cellView,
    cellIndexRef.value,
    rotateX+originX,
    rotateY+originY,
    rotateZ+originZ,
    cellSize,
    translateX,
    translateY,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  // setFrameCell(
  //   cellView,
  //   cellIndexRef.value,
  //   -rotateX-originX,
  //   rotateY+originY,
  //   rotateZ+originZ,
  //   cellSize,
  //   translateX,
  //   translateY,
  //   cellColor[0],
  //   cellColor[1],
  //   cellColor[2]
  // )
  // cellIndexRef.value += 1
}