import assert from 'node:assert'
import vm from 'node:vm'
import {outdent} from 'outdent'
import writePrettierFile from 'write-prettier-file'
import {downloadText, hash} from './utilities.js'

const SCRIPT_URL =
  'https://raw.githubusercontent.com/acornjs/acorn-jsx/HEAD/test/tests-jsx.js'
const CACHE_FILE = new URL('../.cache/acorn-jsx__tests-jsx.js', import.meta.url)

async function getFixtures() {
  const code = await Promise.any(
    [SCRIPT_URL, `https://ghfast.top/${SCRIPT_URL}`].map((url) =>
      downloadText({url, cacheFile: CACHE_FILE}),
    ),
  )

  const tests = []
  const seen = new Map()
  const addTest = ({input, ...properties}) => {
    const id = hash(input).padStart(4, '0').slice(0, 4)

    if (seen.has(id) && seen.get(id) === input) {
      return
    }

    assert.ok(!seen.has(id))
    seen.set(id, input)

    const name = `${String(tests.length).padStart(4, '0')}-${id}.jsx`
    tests.push({input, id, name, ...properties})
  }

  // eslint-disable-next-line sonarjs/code-eval
  vm.runInNewContext(code, {
    test(input /* , ast, options */) {
      addTest({input, error: false})
    },
    testFail(input, errorMessage) {
      addTest({input, error: true, errorMessage: errorMessage})
    },
    jsxTokens: {},
    acornTokens: {},
  })

  return tests
}

await writePrettierFile(
  new URL('../index.js', import.meta.url),
  outdent`
    // Generated file, do NOT edit

    export default ${JSON.stringify(await getFixtures(), undefined, 2)}
  `,
)
