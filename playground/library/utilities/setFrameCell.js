export function setFrameCell(cellView, cellIndex, centerX, centerY, centerZ, halfRoot, cellRed, cellGreen, cellBlue) {
	const cellByteOffset = 35 * cellIndex;
	cellView.setFloat64(cellByteOffset, centerX, true);
	cellView.setFloat64(cellByteOffset + 8, centerY, true);
	cellView.setFloat64(cellByteOffset + 16, centerZ, true);
	cellView.setFloat64(cellByteOffset + 24, halfRoot, true);
	cellView.setUint8(cellByteOffset + 32, cellRed);
	cellView.setUint8(cellByteOffset + 33, cellGreen);
	cellView.setUint8(cellByteOffset + 34, cellBlue);
}