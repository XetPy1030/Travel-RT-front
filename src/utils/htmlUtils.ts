export const processHtmlContent = (html: string, baseUrl: string): string => {
  if (!html) return ''
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  
  // Обрабатываем все изображения
  const images = doc.getElementsByTagName('img')
  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    const src = img.getAttribute('src')
    if (src && !src.startsWith('http')) {
      img.setAttribute('src', `${baseUrl}${src}`)
    }
  }
  
  return doc.body.innerHTML
} 