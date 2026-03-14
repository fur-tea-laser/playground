import { loopPoint, loopCosine, loopSine } from "../library/loop/index.js"
import { phasedSpacer, spacer, spacerSymmetricSlotWeights } from "../library/spacer/index.js"

let inferno128RGB = [
  // [0, 0, 4], [1, 1, 6], [2, 1, 10], [2, 2, 14], [4, 3, 18], [5, 4, 23], [7, 5, 27], [9, 6, 31],
  // [11, 7, 36], [13, 8, 41], [16, 9, 45], [18, 10, 50], [21, 11, 55], [24, 12, 60], [27, 12, 65], [30, 12, 69],
  // [33, 12, 74], [36, 12, 79], [40, 11, 83], [43, 11, 87], [47, 10, 91], [50, 10, 94], [54, 9, 97], [57, 9, 99],
  // [61, 9, 101], [64, 10, 103], [68, 10, 104], [71, 11, 106], [74, 12, 107], [77, 13, 108], [81, 14, 108], [84, 15, 109],
  // [87, 16, 110], [90, 17, 110], [93, 18, 110], [97, 19, 110], [100, 21, 110], [103, 22, 110], [106, 23, 110], [109, 24, 110],
  // [113, 25, 110], [116, 26, 110], [119, 28, 109], [122, 29, 109], [125, 30, 109], [128, 31, 108], [132, 32, 107], [135, 33, 107],
  // [138, 34, 106], [141, 35, 105], [144, 37, 104], [147, 38, 103], [151, 39, 102], [154, 40, 101], [157, 41, 100], [160, 42, 99],
  [163, 44, 97], [166, 45, 96], [169, 46, 94], [173, 48, 93], [176, 49, 91], [179, 50, 90], [182, 52, 88], [185, 53, 86],
  [189, 56, 83], [192, 58, 81], [195, 59, 79], [198, 61, 77], [200, 63, 75], [203, 65, 73], [206, 67, 71], [208, 69, 69],
  [211, 71, 67], [213, 74, 65], [216, 76, 62], [218, 78, 60], [221, 81, 58], [223, 83, 55], [225, 86, 53], [227, 89, 51],
  [229, 92, 48], [231, 94, 46], [233, 97, 43], [235, 100, 41], [236, 103, 38], [238, 106, 36], [239, 110, 33], [241, 113, 31],
  [242, 116, 28], [243, 120, 25], [245, 123, 23], [246, 126, 20], [247, 130, 18], [248, 133, 15], [248, 137, 12], [249, 140, 10],
  [250, 144, 8], [250, 148, 7], [251, 151, 6], [251, 155, 6], [252, 159, 7], [252, 163, 9], [252, 166, 12], [252, 170, 15],
  [252, 174, 18], [252, 178, 22], [251, 182, 26], [251, 186, 31], [251, 190, 35], [250, 194, 40], [250, 198, 45], [249, 201, 50],
  [248, 205, 55], [247, 209, 61], [246, 213, 67], [245, 217, 73], [244, 221, 79], [244, 225, 86], [243, 229, 93], [242, 232, 101],
  [241, 236, 109], [241, 239, 117], [242, 242, 125], [243, 245, 134], [244, 248, 142], [246, 250, 150], [249, 252, 157], [252, 255, 164]
];

inferno128RGB = [...inferno128RGB, ...inferno128RGB.reverse()]


function getFrameCells(frameCount, frameIndex) {
  const frameStamp = frameIndex / frameCount
  const azimuthResolution = frameCount
  const azimuthDensity = 5
  const polarResolution = 1024
  const ringResolution = 31
  const ringOrientation_aa = spacerOrientation(spacer([frameCount, [4,0]]), frameIndex)
  const ringOrientation_bb = spacerOrientation(spacer([frameCount, [7,0]]), frameIndex)
  const ringSpacer = spacer([ringResolution, [29,0],[19,0],[17,0],[13,0],[11,0],[7,ringOrientation_bb],[4,ringOrientation_aa]])
  const ringRadiusWeights = spacerSymmetricSlotWeights(spacer([ringResolution, [29,0],[19,0],[17,0]]))
  const orbShapeWeights = spacerSymmetricSlotWeights(spacer([ringResolution, [29,0],[19,0]]))
  const cellCount = azimuthDensity * polarResolution * ringSpacer[1].length * 2
  const cellBuffer = Host.getFrameCellBuffer(cellCount)
  const cellView = new DataView(cellBuffer)
  let cellIndex = 0
  const azimuthAngleStep = Math.PI / (azimuthResolution - 1)
  const polarAngleStep = 2 * Math.PI / polarResolution
  const ringAngleStep = 2 * Math.PI / ringResolution
  const originZ = -7
  let azimuthPoint, azimuthCosine, azimuthSine
  let polarPoint, polarCosine, polarSine
  let originAngle, azimuthAngle, azimuthAngleBase, polarAngle
  let originX, originY
  let baseX, baseY, baseZ
  let orientX, orientY, orientZ
  let rotateX, rotateY, rotateZ
  let uX, uY  
  const azimuthOrientation_bb = spacerOrientation(spacer([frameCount, [7,0]]), frameIndex)
  for (const ringIndex of ringSpacer[1]) {
    const azimuthOrientation = spacerOrientation(spacer([ringResolution, [azimuthDensity,0]]), ringIndex)
    const azimuthSpacer = phasedSpacer(spacer([frameCount, [521,0],[30,0],[29,0],[19,0],[17,0],[13,0],[11,0],[7,azimuthOrientation_bb],[azimuthDensity,azimuthOrientation]]), frameIndex)
    const ringRadius = ringRadiusWeights[ringIndex] / ringRadiusWeights[0]
    const orbShape = orbShapeWeights[ringIndex] / orbShapeWeights[0]
    originAngle = ringIndex * ringAngleStep
    originX = ringRadius * Math.cos(originAngle - Math.PI / 2)
    originY = ringRadius * Math.sin(originAngle - Math.PI / 2)
    uX = Math.cos(originAngle)
    uY = Math.sin(originAngle)
    const rotationAngle = 2 * Math.PI * frameStamp + Math.PI * (orbShapeWeights[ringIndex] / orbShapeWeights[0]) * Math.sin(2 * Math.PI * frameStamp) + originAngle
    const c = Math.cos(rotationAngle)
    const s = Math.sin(rotationAngle)
    const t = 1 - Math.cos(rotationAngle)
    for (const i of azimuthSpacer[1]) {
      azimuthAngleBase = i * azimuthAngleStep
      for (let j=0; j<polarResolution; j++) {
        polarAngle = j * polarAngleStep
        azimuthAngle = azimuthAngleBase + ringRadiusWeights[ringIndex] * azimuthAngleStep * Math.sin((i + 1) * ringRadiusWeights[ringIndex] * polarAngle + 2 * Math.PI * frameStamp)
        azimuthPoint = loopPoint([[orbShape,0.675,originAngle,Math.PI/2,0]], azimuthAngle + Math.PI / 2)
        azimuthCosine = loopCosine(azimuthPoint)
        azimuthSine = loopSine(azimuthPoint)
        polarPoint = loopPoint([[orbShape,0.675,originAngle,Math.PI/2,0]], polarAngle)
        polarCosine = loopCosine(polarPoint)
        polarSine = loopSine(polarPoint)
        baseX = 1 * azimuthSine * polarCosine
        baseY = 1 * azimuthCosine
        baseZ = 1 * azimuthSine * polarSine
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
          0.004,
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
          0.004,
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

function spacerOrientation(someSpacer, targetIndex) {
  for (let i=0; i<someSpacer[1].length; i++) {
    if (targetIndex === someSpacer[1][i]) {
      return i
    }
    else if (targetIndex < someSpacer[1][i]) {
      return i - 1
    }
  }
}