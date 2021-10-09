export function consoleUnitTest(actual, expected) {
    console.log(actual == expected ? '✅' : '❌', actual)
}

export function consoleUnitTestObject(actual, expected) {
    console.log(Object.is(actual, expected) ? '✅' : '❌', actual)
}

export function logSectionHeader(title) {
    console.log('++', title, '++')
}