import { orientatedSpacer, setFrameCell, spacer, spacerSymmetricSlotWeights } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const ringSpacer = spacer([60,[59,0],[43,0],[29,0],[19,0],[12,0]])
  const flagSpacerResolution = 2142
  const spacer_aa = spacer([flagSpacerResolution,[2141,0],[1092,0]])
  const points_aa = new Set(spacer_aa[1])
  const weights_aa = fasterWeights(spacer([flagSpacerResolution,[2141,0]]),spacer([2141,[1092,0]]))
  const spacer_bb = spacer([flagSpacerResolution,[2141,0],[1092,0],[12,0]])
  const cellCount = ringSpacer[1].length*8*flagSpacerResolution
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  const cellIndexRef = { value: 0 }
  const ringAngleStep = 2*Math.PI/ringSpacer[0]
  const ringRadius = 3
  let ringAngle, ringX, ringY
  let pointWeight, pointWeightStamp
  const horizontalLength = 6
  const halfHorizontal = horizontalLength/2
  const radiusAngleStep = 2*Math.PI/flagSpacerResolution
  const horizontalStep = horizontalLength/flagSpacerResolution
  const cellSize = 0.01
  const colors = [
    [[125, 235, 255], [190, 245, 255]], 
    [[226, 255, 92], [241, 255, 173]],
    [[255, 133, 228], [255, 194, 242]]
  ];
  for (let i=0; i<flagSpacerResolution; i++) {
    ringSpacer[1].forEach((someRingPoint, ringPointIndex) => {
      ringAngle = ringAngleStep*someRingPoint-Math.PI/2
      ringX = ringRadius*Math.cos(ringAngle)
      ringY = ringRadius*Math.sin(ringAngle)
      pointWeight = weights_aa[i]
        pointWeightStamp = pointWeight/weights_aa[0]
        const radiusLength_aa = 0.125*pointWeightStamp
        setFlagCell({
          cellView,
          cellIndexRef,
          radiusAngleStep,
          horizontalStep,
          spacerPoint: i,
          radiusLength: radiusLength_aa,
          radiusAngleFrequency: 220+314,
          radiusXFrequency: 9,
          radiusYFrequency: 220,
          originX: ringX-halfHorizontal,
          originY: ringY,
          originZ: -6,
          cellSize: cellSize,
          cellColor: i%2 === 0 ? [0,0,0]
            // : i%5 === 0 ? [0,0,0]
            // : i%7 === 0 ? [0,0,0]
            : i%9 === 0 ? [0,0,0]
            // : i%13 === 0 ? [0,0,0]
            : i<spacer_bb[1][1] ? interpolateColor(colors[0][0],colors[0][1],pointWeightStamp)
            : i<spacer_bb[1][2] ? interpolateColor(colors[1][0],colors[1][1],pointWeightStamp)
            : i<spacer_bb[1][3] ? interpolateColor(colors[2][0],colors[2][1],pointWeightStamp)
            : i<spacer_bb[1][4] ? interpolateColor(colors[0][0],colors[0][1],pointWeightStamp)
            : i<spacer_bb[1][5] ? interpolateColor(colors[1][0],colors[1][1],pointWeightStamp)
            : i<spacer_bb[1][6] ? interpolateColor(colors[2][0],colors[2][1],pointWeightStamp)
            : i<spacer_bb[1][7] ? interpolateColor(colors[0][0],colors[0][1],pointWeightStamp)
            : i<spacer_bb[1][8] ? interpolateColor(colors[1][0],colors[1][1],pointWeightStamp)
            : i<spacer_bb[1][9] ? interpolateColor(colors[2][0],colors[2][1],pointWeightStamp)
            : i<spacer_bb[1][10] ? interpolateColor(colors[0][0],colors[0][1],pointWeightStamp)
            : i<spacer_bb[1][11] ? interpolateColor(colors[1][0],colors[1][1],pointWeightStamp)
            : interpolateColor(colors[2][0],colors[2][1],pointWeightStamp)
            // : i<spacer_bb[1][3] ? interpolateColor([255, 82, 82],[255, 179, 179],pointWeightStamp)
            // : i<spacer_bb[1][4] ? interpolateColor([255, 215, 64],[255, 229, 127],pointWeightStamp)
            // : interpolateColor([255, 64, 129],[255, 128, 171],pointWeightStamp)
        })
    })
  }
  Host.stampCells(cellBuffer)
}

globalThis.getFrameCells = getFrameCells

/* Interpolates between two RGB colors.
 * @param {number[]} color1 - The starting RGB color as an array [R, G, B].
 * @param {number[]} color2 - The ending RGB color as an array [R, G, B].
 * @param {number} t - The interpolation factor (strictly between 0 and 1).
 * @returns {number[]} The interpolated RGB color as an array [R, G, B].
 */
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
  radiusLength,
  radiusXFrequency,
  radiusYFrequency,
  horizontalStep,
  originX,
  originY,
  originZ,
  cellView,
  cellIndexRef,
  cellSize,
  cellColor
}) {
  const radiusAngleBase = radiusAngleStep*spacerPoint
  const radiusAngle = Math.PI*Math.sin(radiusAngleFrequency*radiusAngleBase)
  const radiusX = radiusLength*Math.cos(radiusXFrequency*radiusAngle)
  const radiusY = radiusLength*Math.sin(radiusYFrequency*radiusAngle)
  const baseX = horizontalStep*spacerPoint+radiusX
  const baseY = radiusY
  setFrameCell(
    cellView,
    cellIndexRef.value,
    baseX+originX,
    baseY+originY,
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    -baseX-originX,
    baseY+originY,
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    baseX+originX,
    -baseY-originY,
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    -baseX-originX,
    -baseY-originY,
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    baseY+originY,
    baseX+originX,    
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    baseY+originY,
    -baseX-originX,    
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    -baseY-originY,
    baseX+originX,    
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
  setFrameCell(
    cellView,
    cellIndexRef.value,
    -baseY-originY,
    -baseX-originX,    
    originZ,
    cellSize,
    0,
    0,
    cellColor[0],
    cellColor[1],
    cellColor[2]
  )
  cellIndexRef.value += 1
}