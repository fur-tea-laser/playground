import { throwInvalidPathError } from "../utilities/throwInvalidPathError.js";
import { phasedSpacer } from "./spacerTransforms.js";
/**
 * great for working with unlayered euclid spacers
 *
 * @example
 * ```typescript
 * const spacerA = euclidSpacer(5, 3, 1, 0)
 * // spacerA === [5, [0, 2, 4]]
 * ```
 */
export function euclidSpacer(resolution, density, orientation, phase) {
    const basicSpacer = basicEuclidSpacer(resolution, density);
    const orientationPhase = basicSpacer[1][orientation] ??
        throwInvalidPathError("euclidSpacer/orientationPhase");
    return phasedSpacer(basicSpacer, (orientationPhase + phase) % resolution);
}
/**
 * great for working with euclid spacers where orientation and phase are not needed
 *
 * @example
 * ```typescript
 * const basicSpacerA = basicEuclidSpacer(5, 3)
 * // basicSpacerA === [5, [0, 1, 3]]
 * ```
 */
export function basicEuclidSpacer(resolution, density) {
    const coreSpacerMap = coreEuclidMap(resolution, density);
    const spacerPoints = [];
    for (let slotIndex = 0; slotIndex < resolution; slotIndex++) {
        if (coreSpacerMap[slotIndex % coreSpacerMap.length]) {
            spacerPoints.push(slotIndex);
        }
    }
    return [resolution, spacerPoints];
}
/**
 * great for working with simplified euclid spacers
 *
 * @example
 * ```typescript
 * const coreSpacerA = coreEuclidSpacer(8, 4)
 * // coreSpacerA === [2, [0]]
 * ```
 */
export function coreEuclidSpacer(resolution, density) {
    const coreSpacerMap = coreEuclidMap(resolution, density);
    const spacerPoints = [];
    for (let slotIndex = 0; slotIndex < coreSpacerMap.length; slotIndex++) {
        if (coreSpacerMap[slotIndex]) {
            spacerPoints.push(slotIndex);
        }
    }
    return [coreSpacerMap.length, spacerPoints];
}
/**
 * most important spacer function, but rarely invoked by itself
 *
 * @example
 * ```typescript
 * const coreSpacerMapA = coreEuclidMap(5, 3)
 * // coreSpacerMapA === [true, true, false, true, false]
 * ```
 */
export function coreEuclidMap(resolution, density) {
    let lhsCount = density;
    let rhsCount = resolution - density;
    let lhsSpacer = [true];
    let rhsSpacer = [false];
    while (rhsCount > 0) {
        if (lhsCount > rhsCount) {
            lhsCount = lhsCount - rhsCount;
            rhsSpacer = [...lhsSpacer, ...rhsSpacer];
        }
        else {
            rhsCount = rhsCount - lhsCount;
            lhsSpacer = [...lhsSpacer, ...rhsSpacer];
        }
    }
    return lhsSpacer;
}
