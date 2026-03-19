export const processHtmlContent = (html: string, baseUrl: string): string => {
  if (!html) return ''
  if (!baseUrl) return html

  return html.replace(/(<img[^>]*\ssrc=["'])([^"']+)(["'][^>]*>)/gi, (match, start, src, end) => {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//') || src.startsWith('data:')) {
      return match
    }
    return `${start}${baseUrl}${src}${end}`
  })
}