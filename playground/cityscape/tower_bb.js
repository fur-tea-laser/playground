
import { setFrameCell, loopPoint, loopSine, loopCosine } from "../library/index.js"

export function tower_bb() {
  const halfPolarResolution_aa = 2048
  const halfPolarResolution_bb = 1024
  const halfPolarResolution_cc = 1024
  const cellCount = halfPolarResolution_aa + halfPolarResolution_bb + 2*halfPolarResolution_cc
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const originX = 1.75
  const originY = -1
  const originZ = -14
  let azimuthAngleBase, azimuthAngle, polarAngle
  let azimuthPoint, azimuthSine, azimuthCosine
  let baseX, baseY, baseZ
  const polarAngleStep_aa = 2 * Math.PI / (2 * halfPolarResolution_aa)
  azimuthAngleBase = Math.PI/2
  for (let j=0; j<halfPolarResolution_aa; j++) {
    polarAngle = j * polarAngleStep_aa
    azimuthAngle = azimuthAngleBase + Math.PI/3 * Math.sin(860 * polarAngle)
    azimuthPoint = loopPoint([[1,0,0,0,0],[0.75,0.25,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 0.875 * azimuthSine * Math.cos(polarAngle)
    baseY = 0.875 * azimuthCosine
    baseZ = 0.875 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.01,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  const polarAngleStep_bb = 2 * Math.PI / (2 * halfPolarResolution_bb)
  azimuthAngleBase = Math.PI/2
  for (let j=0; j<halfPolarResolution_bb; j++) {
    polarAngle = j * polarAngleStep_bb
    azimuthAngle = azimuthAngleBase + Math.PI/8 * Math.sin(860 * polarAngle)
    azimuthPoint = loopPoint([[1,0,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 0.5 * azimuthSine * Math.cos(polarAngle)
    baseY = 0.5 * azimuthCosine
    baseZ = 0.5 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY - 1.25,
      baseZ + originZ,
      0.008,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  const polarAngleStep_cc = 2 * Math.PI / (2 * halfPolarResolution_cc)
  azimuthAngleBase = Math.PI/2
  for (let j=0; j<halfPolarResolution_cc; j++) {
    polarAngle = j * polarAngleStep_cc
    azimuthAngle = azimuthAngleBase + Math.PI/16 * Math.sin(860 * polarAngle)
    azimuthPoint = loopPoint([[1,0,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 0.75 * azimuthSine * Math.cos(polarAngle)
    baseY = 0.75 * azimuthCosine
    baseZ = 0.75 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY - 1.7,
      baseZ + originZ,
      0.01,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  // azimuthAngleBase = Math.PI/1.875
  // for (let j=0; j<halfPolarResolution_cc; j++) {
  //   polarAngle = j * polarAngleStep_cc
  //   azimuthAngle = azimuthAngleBase + Math.PI/56 * Math.sin(860 * polarAngle)
  //   azimuthPoint = loopPoint([[1,0,0,0,0]],(azimuthAngle)%(2*Math.PI))
  //   azimuthSine = loopSine(azimuthPoint)
  //   azimuthCosine = loopCosine(azimuthPoint)
  //   baseX = 0.75 * azimuthSine * Math.cos(polarAngle)
  //   baseY = 0.75 * azimuthCosine
  //   baseZ = 0.75 * azimuthSine * Math.sin(polarAngle)
  //   setFrameCell(
  //     cellView,
  //     cellIndex,
  //     baseX + originX,
  //     baseY + originY - 1.7,
  //     baseZ + originZ,
  //     0.01,
  //     255,
  //     255,
  //     255
  //   )
  //   cellIndex += 1
  // }
  azimuthAngleBase = Math.PI/4*3
  for (let j=0; j<halfPolarResolution_cc; j++) {
    polarAngle = j * polarAngleStep_cc
    azimuthAngle = azimuthAngleBase + Math.PI/8 * Math.sin(860 * polarAngle)
    azimuthPoint = loopPoint([[1,0,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 0.75 * azimuthSine * Math.cos(polarAngle)
    baseY = 0.75 * azimuthCosine
    baseZ = 0.75 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY - 1.75,
      baseZ + originZ,
      0.01,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  Host.stampCells(cellBuffer)
}