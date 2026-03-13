import { throwInvalidPathError } from "../utilities/throwInvalidPathError.js";
/**
 * great for phasing a spacer after it's been created
 *
 * @example
 * ```typescript
 * const spacerA = spacer([5, [3, 1]]),
 * const  spacerB = phasedSpacer(spacerA, 1)
 * // spacerB === [5, [1, 3, 4]]
 * ```
 */
export function phasedSpacer(someSpacer, spacerPhase) {
    let phaseWrapPointIndex = null;
    return [
        someSpacer[0],
        someSpacer[1].reduce((result, currentSpacerPoint, pointIndex) => {
            if (spacerPhase > currentSpacerPoint) {
                const phasedSpacerPoint = currentSpacerPoint - spacerPhase + someSpacer[0];
                result.push(phasedSpacerPoint);
            }
            else {
                phaseWrapPointIndex = phaseWrapPointIndex ?? pointIndex;
                const phasedSpacerPoint = currentSpacerPoint - spacerPhase;
                result.splice(pointIndex - phaseWrapPointIndex, 0, phasedSpacerPoint);
            }
            return result;
        }, []),
    ];
}
/**
 * great for reorienting an aligned spacer after it's been created
 *
 * @example
 * ```typescript
 * const spacerA = spacer(5, [3, 1])
 * const spacerB = orientatedSpacer(spacerA, 1)
 * // spacerB === [5, [0, 2, 3]]
 * ```
 */
export function orientatedSpacer(someSpacer, spacerOrientation) {
    return phasedSpacer(someSpacer, someSpacer[1][spacerOrientation] ??
        throwInvalidPathError("orientatedSpacer"));
}
/**
 * great for normalizing spacers across different resolutions
 *
 * @example
 * ```typescript
 * const relativePointsA = relativeSpacerPoints(
 *   spacer([5, [3, 1]])
 * )
 * // relativePointsA === [0, 0.4, 0.8]
 * ```
 */
export function relativeSpacerPoints(someSpacer) {
    return someSpacer[1].map((someSpacerPoint) => someSpacerPoint / someSpacer[0]);
}
/**
 * great for making calculations between spacer points
 *
 * @example
 * ```typescript
 * const intervalsA = spacerIntervals(
 *   spacer([5, [3, 1]])
 * )
 * // intervalsA === [2, 2, 1]
 * ```
 */
export function spacerIntervals(someSpacer) {
    return someSpacer[1].map((currentPoint, pointIndex) => {
        const nextPoint = someSpacer[1][(pointIndex + 1) % someSpacer[1].length];
        return (nextPoint - currentPoint + someSpacer[0]) % someSpacer[0];
    });
}
/**
 * great for logging and visualizing short spacers
 *
 * @example
 * ```typescript
 * const stringA = spacerString(
 *   spacer([5, [3, 1]])
 * )
 * // stringA === "10101"
 * ```
 */
export function spacerString(someSpacer) {
    const spacerDigitArray = new Array(someSpacer[0]).fill(0);
    for (const currentPoint of someSpacer[1]) {
        spacerDigitArray[currentPoint] = 1;
    }
    return spacerDigitArray.join("");
}
