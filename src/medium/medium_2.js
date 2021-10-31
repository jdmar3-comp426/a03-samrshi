import mpg_data from "./data/mpg_data.js";
import { getMean, getMedian, getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
const city_mpgs = mpg_data.map((car) => car.city_mpg);
const highway_mpgs = mpg_data.map((car) => car.highway_mpg);
const all_mpgs = city_mpgs.concat(highway_mpgs);

const all_years = mpg_data.map((car) => car.year);
const hybrids = mpg_data.filter((car) => car.hybrid);

export const allCarStats = {
    avgMpg: getMedian(all_mpgs),
    allYearStats: getStatistics(all_years),
    ratioHybrids: hybrids.length / mpg_data.length
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

function makerHybrids(mpg_data) {
    var makes = new Set()

    mpg_data.map(a => a.make).forEach(make => {
        makes.add(make)
    })

    var result = []

    makes.forEach(make => {
        let hybrids = mpg_data.filter(a => a.make == make && a.hybrid)

        if (hybrids.length > 0) {
            result.push({
                "make": make,
                "hybrids": hybrids.map(a => a.id)
            })
        }
    })

    return result
}

function avgMpgByYearAndHybrid(mpg_data) {
    var years = new Set();
    mpg_data.map(a => a.year).forEach(year => {
        years.add(year)
    })

    var result = {}

    years.forEach(year => {
        var hybrids = []
        var nonhybrids = []

        mpg_data.forEach(a => {
            if (a.year === year && a.hybrid) {
                hybrids.push(a)
            } else if (a.year === year) {
                nonhybrids.push(a)
            }
        })

        result[year] = {
            hybrids: {
                city: getMean(hybrids.map(a => a.city_mpg)),
                highway: getMean(hybrids.map(a => a.highway_mpg))
            },
            notHybrid: {
                city: getMean(nonhybrids.map(a => a.city_mpg)),
                highway: getMean(nonhybrids.map(a => a.highway_mpg))
            }
        }      
    })

    return result
}

export const moreStats = {
    makerHybrids: makerHybrids(mpg_data),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybrid(mpg_data)
};
