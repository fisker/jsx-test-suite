import {expectType} from 'tsd'
import testCases from './index.js'

for (const testCase of testCases) {
  expectType<string>(testCase.name)
  expectType<string>(testCase.input)
  expectType<boolean>(testCase.error)

  if (testCase.error) {
    expectType<true>(testCase.error)
    expectType<string>(testCase.errorMessage)
  } else {
    expectType<false>(testCase.error)
  }
}
