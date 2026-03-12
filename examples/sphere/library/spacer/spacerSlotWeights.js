import { orientatedSpacer } from "./spacerTransforms.js";
/**
 * great for understanding point distribution across a set of spacers
 *
 * @example
 * ```typescript
 * const slotWeightsA = spacerSlotWeights([
 *   spacer([5, [3, 0]]),
 *   spacer([5, [3, 1]]),
 *   spacer([5, [3, 2]])
 * ])
 * // slotWeightsA === [3, 1, 2, 2, 1]
 * ```
 */
export function spacerSlotWeights(someSpacers) {
    const resultSlotWeights = new Array(someSpacers[0][0]).fill(0);
    for (const currentSpacer of someSpacers) {
        for (const currentPoint of currentSpacer[1]) {
            resultSlotWeights[currentPoint] += 1;
        }
    }
    return resultSlotWeights;
}
/**
 * great for normalizing a spacer and it's orientations against itself
 *
 * @example
 * ```typescript
 * spacerSymmetricSlotWeights(
 *   spacer([5, [3, 0]]),
 * ) // [3, 1, 2, 2, 1]
 * ```
 */
export function spacerSymmetricSlotWeights(someSpacer) {
    return spacerSlotWeights(someSpacer[1].map((_, pointIndex) => orientatedSpacer(someSpacer, pointIndex)));
}
/**
 * great for working with a spacer's points in the context of a set of spacers
 *
 * @example
 * ```typescript
 * const pointWeightsA = spacerPointWeights(
 *   spacerSlotWeights([
 *     spacer([5, [3, 0]]),
 *     spacer([5, [3, 1]]),
 *     spacer([5, [3, 2]])
 *   ]),
 *   spacer([5, [3, 2]])
 * )
 * // const pointWeightsA === [3, 2, 2]
 * ```
 */
export function spacerPointWeights(baseSlotWeights, memberSpacer) {
    return memberSpacer[1].map((currentMemberPoint) => baseSlotWeights[currentMemberPoint]);
}
/**
 * great for differentiating a spacer against a set of spacers
 *
 * @example
 * ```typescript
 * const weightA = spacerWeight(
 *   spacerSlotWeights([
 *     spacer([5, [3, 0]]),
 *     spacer([5, [3, 1]]),
 *     spacer([5, [3, 2]])
 *   ]),
 *   spacer([5, [3, 2]])
 * )
 * // const weightA === 7
 * ```
 */
export function spacerWeight(baseSlotWeights, memberSpacer) {
    return memberSpacer[1].reduce((resultWeight, currentMemberPoint) => resultWeight + baseSlotWeights[currentMemberPoint], 0);
}
