import { orientatedSpacer, setFrameCell, spacer, spacerSymmetricSlotWeights } from "../library/index.js"

function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const spacer_aa = spacer([2142,[2141,0],[1092,0]])
  const weights_aa = fasterWeights(spacer([2142,[2141,0]]),spacer([2141,[1092,0]]))
  const waveResolution_aa = spacer_aa[0]
  const waveHorizStep_aa = 2/waveResolution_aa
  const waveAngleStep_bb = 2*Math.PI/waveResolution_aa
  const cellCount = 2*8*waveResolution_aa
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  let originX = -1
  let originY = 0
  let originZ = -3
  let pointStamp, pointWeight, pointWeightStamp
  let radiusAngle, radiusX, radiusY
  let radiusAngle_bb, radiusX_bb, radiusY_bb
  let baseX, baseY, baseZ
  let cellColor 
  let cellSize = 0.03
  for (const i of spacer_aa[1]) {
    pointStamp = i/spacer_aa[0]
    pointWeight = weights_aa[i]
    pointWeightStamp = pointWeight/weights_aa[0]
    radiusAngle = (111+2*239)*Math.PI*Math.sin(1*waveAngleStep_bb*i)
    radiusX = Math.cos(2*radiusAngle)
    radiusY = Math.sin(5*radiusAngle)
    radiusAngle_bb = Math.PI/2*Math.sin(1*waveAngleStep_bb*i)
    radiusX_bb = Math.cos(3*radiusAngle_bb)
    radiusY_bb = Math.sin(2*radiusAngle_bb)
    baseX = waveHorizStep_aa*i+radiusX+radiusX_bb
    baseY = radiusY+radiusY_bb
    cellColor = i % 6 === 0 ? [0,0,0] 
              : i % 6 === 1 ? interpolateColor([4, 231, 98],[245, 184, 0],pointWeightStamp)
              : i % 6 === 2 ? [0,0,0]
              : i % 6 === 3 ? interpolateColor([4, 231, 98],[220, 0, 115],pointWeightStamp)
              : i % 6 === 4 ? [0,0,0]
              : i % 6 === 5 ? interpolateColor([245, 184, 0],[220, 0, 115],pointWeightStamp)
              : null                 
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
  }
  cellSize = 0.02
  for (const i of spacer_aa[1]) {
    pointStamp = i/spacer_aa[0]
    pointWeight = weights_aa[i]
    pointWeightStamp = pointWeight/weights_aa[0]
    radiusAngle = (110+2*frameIndex)*Math.PI*Math.sin(1*waveAngleStep_bb*i)
    radiusX = Math.cos(2*radiusAngle)
    radiusY = Math.sin(5*radiusAngle)
    radiusAngle_bb = Math.PI/2*Math.sin(1*waveAngleStep_bb*i)
    radiusX_bb = Math.cos(3*radiusAngle_bb)
    radiusY_bb = Math.sin(2*radiusAngle_bb)
    baseX = waveHorizStep_aa*i+radiusX+radiusX_bb
    baseY = radiusY+radiusY_bb
    cellColor = [0,0,0]               
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
    setFrameCell(
      cellView,
      cellIndex,
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
    cellIndex += 1
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