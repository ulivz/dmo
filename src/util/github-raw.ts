import { get } from './fetch'

const SUFFIX = 'https://raw.githubusercontent.com/'

export function getGithubRaw(path) {
  return get(SUFFIX + path)
}
