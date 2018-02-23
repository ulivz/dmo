const RESPONSIVE_TAG = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'

function injectResponsiveTag(head: Element) {
  head.insertAdjacentHTML('afterbegin', RESPONSIVE_TAG)
}

function injectTitle(head: Element, title: string) {
  head.insertAdjacentHTML('afterbegin', `  <title>${title}</title>`)
}

export default function inject(document: Document, { title } = { title: '' }) {
  const head: Element = document.querySelector('head')
  injectResponsiveTag(head)
  injectTitle(head, title)
}
