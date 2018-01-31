import { get } from './fetch'

const SUFFIX = 'https://raw.githubusercontent.com/'

export function getGithubFileRawContent(path) {
  return get(SUFFIX + path)
}

export function isGithubResourceURL(input: string): { isUrl: boolean, input: string } {
  let isUrl = false
  if (input.startsWith('$github')) {
    isUrl = true
    input = input.slice(input.indexOf('$github') + 8)
  } else if (input.startsWith('https://github.com/')) {
    isUrl = true
    input = input.replace('https://github.com/', '')
  }
  if (isUrl) {
    input = input.replace('blob/', '')
  }
  return {
    isUrl,
    input
  }
}
