import { setFrameCell, loopPoint, loopSine, loopCosine } from "../library/index.js"

export function tower_aa() {
  const azimuthResolution = 9
  const halfPolarResolution = 512
  const cellCount = azimuthResolution * halfPolarResolution
  const cellBuffer = Host.getCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const polarAngleStep = 2 * Math.PI / (2 * halfPolarResolution)
  const originX = -2.5
  const originY = -0.25
  const originZ = -10
  let azimuthAngleBase, azimuthAngle, polarAngle
  let azimuthPoint, azimuthSine, azimuthCosine
  let baseX, baseY, baseZ
  azimuthAngleBase = Math.PI/5
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/16 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/2.675
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/32 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/2.05
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/24 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/1.625
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/128 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/1.55
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/256 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/1.4125
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/24 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/1.2875
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/192 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.5,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  azimuthAngleBase = Math.PI/1.15
  for (let j=0; j<halfPolarResolution; j++) {
    polarAngle = j * polarAngleStep
    azimuthAngle = azimuthAngleBase + Math.PI/32 * Math.sin(430 * polarAngle)
    azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
    azimuthSine = loopSine(azimuthPoint)
    azimuthCosine = loopCosine(azimuthPoint)
    baseX = 2 * azimuthSine * Math.cos(polarAngle)
    baseY = 2 * azimuthCosine
    baseZ = 2 * azimuthSine * Math.sin(polarAngle)
    setFrameCell(
      cellView,
      cellIndex,
      baseX + originX,
      baseY + originY,
      baseZ + originZ,
      0.0075,
      255,
      255,
      255
    )
    cellIndex += 1
  }
  // azimuthAngleBase = Math.PI/4
  // for (let j=0; j<halfPolarResolution; j++) {
  //   polarAngle = j * polarAngleStep
  //   azimuthAngle = azimuthAngleBase + Math.PI/8 * Math.sin(430 * polarAngle)
  //   azimuthPoint = loopPoint([[0.375,1,0,0,0]],(azimuthAngle)%(2*Math.PI))
  //   azimuthSine = loopSine(azimuthPoint)
  //   azimuthCosine = loopCosine(azimuthPoint)
  //   baseX = 2 * azimuthSine * Math.cos(polarAngle)
  //   baseY = 2 * azimuthCosine
  //   baseZ = 2 * azimuthSine * Math.sin(polarAngle)
  //   setFrameCell(
  //     cellView,
  //     cellIndex,
  //     baseX + originX,
  //     baseY + originY - 3.8,
  //     baseZ + originZ,
  //     0.0075,
  //     255,
  //     255,
  //     255
  //   )
  //   cellIndex += 1
  // }
  Host.stampCells(cellBuffer)
}