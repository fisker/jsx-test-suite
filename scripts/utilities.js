import {Buffer} from 'node:buffer'
import fs from 'node:fs/promises'
import MurmurHash3 from 'imurmurhash-esm'

async function downloadFile({url, cacheFile}) {
  let stat

  try {
    stat = await fs.stat(cacheFile)
  } catch {
    // No op
  }

  if (stat) {
    if (Date.now() - stat.mtimeMs < /* 10 hours */ 10 * 60 * 60 * 1000) {
      return cacheFile
    }

    await fs.rm(cacheFile)
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Fetch '${url}' failed.`)
  }

  const arrayBuffer = await response.arrayBuffer()

  await writeRawFile(cacheFile, Buffer.from(arrayBuffer))

  return cacheFile
}

async function downloadText({url, cacheFile}) {
  await downloadFile({url, cacheFile})
  return await fs.readFile(cacheFile, 'utf8')
}

async function writeRawFile(file, content) {
  const directory = new URL('./', file)
  await fs.mkdir(directory, {recursive: true})
  return fs.writeFile(file, content)
}

function writeTextFile(file, content) {
  return writeRawFile(
    file,
    '// Generated file, do NOT edit' + '\n\n' + content + '\n',
  )
}

const hash = (string) => MurmurHash3(string).result().toString(16)

export {downloadFile, downloadText, hash, writeTextFile}
