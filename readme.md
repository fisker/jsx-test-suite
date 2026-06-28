# jsx-test-suite

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]
[![Coverage][coverage_badge]][coverage_link]

[coverage_badge]: https://img.shields.io/codecov/c/github/fisker/jsx-test-suite.svg?style=flat-square
[coverage_link]: https://app.codecov.io/gh/fisker/jsx-test-suite
[license_badge]: https://img.shields.io/npm/l/jsx-test-suite.svg?style=flat-square
[license_link]: https://github.com/fisker/jsx-test-suite/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/jsx-test-suite.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/jsx-test-suite

> JSX Parsing Test Suite.

## Install

```bash
yarn add jsx-test-suite
```

## Usage

```js
import jsxTestSuite from 'jsx-test-suite'

console.log(jsxTestSuite)
// =>
// [
//  {
//     input: 'var x = <div>one</div><div>two</div>;',
//     id: '161c',
//     name: '0000-161c.jsx',
//     error: true,
//     errorMessage: 'Adjacent JSX elements must be wrapped in an enclosing tag (1:22)'
//   },
//   ...,
// ]
```

## Acknowledgments

Test cases comes from [acorn-jsx](https://github.com/acornjs/acorn-jsx/blob/main/test/tests-jsx.js) project.
