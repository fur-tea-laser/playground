export function setFrameCell(cellView, cellIndex, centerX, centerY, centerZ, halfRoot, translateScalarX, translateScalarY, cellRed, cellGreen, cellBlue) {
	const cellByteOffset = 51 * cellIndex;
	cellView.setFloat64(cellByteOffset, centerX, true);
	cellView.setFloat64(cellByteOffset + 8, centerY, true);
	cellView.setFloat64(cellByteOffset + 16, centerZ, true);
	cellView.setFloat64(cellByteOffset + 24, halfRoot, true);
	cellView.setFloat64(cellByteOffset + 32, translateScalarX, true);
	cellView.setFloat64(cellByteOffset + 40, translateScalarY, true);
	cellView.setUint8(cellByteOffset + 48, cellRed);
	cellView.setUint8(cellByteOffset + 49, cellGreen);
	cellView.setUint8(cellByteOffset + 50, cellBlue);
}