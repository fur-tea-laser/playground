import { prime, primeSequenceInclusive } from "./prime.js";
/**
 * great for rounding some number to nearest prime
 *
 * @example
 * ```typescript
 * nearestPrimes(1) // [null, 2]
 * nearestPrimes(3) // [3, 3]
 * nearestPrimes(8) // [7, 11]
 * ```
 */
export function nearestPrimes(someNumber) {
    const currentPrimeSequence = primeSequenceInclusive(someNumber);
    const maybePrimeLessThanIndex = currentPrimeSequence.length - 1;
    const maybePrimeLessThanIncluding = currentPrimeSequence[maybePrimeLessThanIndex] ?? null;
    return [
        maybePrimeLessThanIncluding,
        someNumber === maybePrimeLessThanIncluding
            ? maybePrimeLessThanIncluding
            : prime(maybePrimeLessThanIndex + 1),
    ];
}
