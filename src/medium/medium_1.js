import { consoleUnitTest, consoleUnitTestObject, logSectionHeader } from "../helpers/unittest.js";
import { variance } from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    return array.reduce((a, b) => a + b) 
}

// Test getSum(array)
// logSectionHeader("getSum(array)")

// const arr = [1, 2, 3, 4, 5, 6, 7]
// consoleUnitTest(getSum(arr), 28)

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort()

    if (array.length % 2 == 1) {
        const medianIndex = Math.floor(array.length / 2)
        return array[medianIndex]
    } else {
        const higherMiddle = array.length / 2
        const lowerMiddle = higherMiddle - 1

        return (array[lowerMiddle] + array[higherMiddle]) / 2
    }
}

// ++ Test getMedian(array) ++ //
// logSectionHeader("getMedian(array)")

// const odd = [1, 2, 3, 4, 5, 6, 7]
// const even = [1, 2, 3, 4, 5, 6]

// consoleUnitTest(getMedian(odd), 4)
// consoleUnitTest(getMedian(even), 3.5)

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    const length = array.length
    const sum = getSum(array)
    const mean = array.reduce((a, b) => a + b) / array.length;
    const median = getMedian(array)
    const min = Math.min(...array)
    const max = Math.max(...array)
    const arrayVariance = variance(array, mean)
    const standardDeviation = Math.sqrt(arrayVariance)

    return {
        length: length,
        sum: sum,
        mean: mean,
        median: median,
        min: min,
        max: max,
        variance: arrayVariance,
        standard_deviation: standardDeviation
    }
}

// ++ Test getStatistics(array) ++ //
// logSectionHeader('getStatistics(array)')

// const actual = getStatistics([3,2,4,5,5,5,2,6,7])
// const expected = {
//     length: 9,
//     sum: 39,
//     mean: 4.333333333333333,
//     median: 5,
//     min: 2,
//     max: 7,
//     variance: 2.6666666666666665,
//     standard_deviation: 1.632993161855452
// }

// consoleUnitTest(actual.length, expected.length)
// consoleUnitTest(actual.sum, expected.sum)
// consoleUnitTest(actual.mean, expected.mean)
// consoleUnitTest(actual.median, expected.median)
// consoleUnitTest(actual.min, expected.min)
// consoleUnitTest(actual.max, expected.max)
// consoleUnitTest(actual.variance, expected.variance)
// consoleUnitTest(actual.standard_deviation, expected.standard_deviation)