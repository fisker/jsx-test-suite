type TestCaseBasic = {
  readonly name: string,
  readonly id: string,
  readonly input: string,
}

type Pass = TestCaseBasic & {
  readonly error: false,
}

type Fail = TestCaseBasic & {
  readonly error: true,
  readonly errorMessage: string,
}

declare const Suite: readonly (Pass | Fail)[]

export default Suite
