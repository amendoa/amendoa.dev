const dialog = document.querySelector<HTMLDialogElement>('.image-zoom-dialog')
const zoomedImage = dialog?.querySelector<HTMLImageElement>('img')

if (dialog && zoomedImage) {
  const portuguese = document.documentElement.lang.startsWith('pt')
  let sourceImage: HTMLImageElement | null = null

  const open = (image: HTMLImageElement) => {
    sourceImage = image
    const width = Math.max(1, image.naturalWidth || image.width)
    const height = Math.max(1, image.naturalHeight || image.height)
    const scale = Math.min(2, (innerWidth - 48) / width, (innerHeight - 48) / height)
    zoomedImage.style.width = `${Math.round(width * scale)}px`
    zoomedImage.style.height = `${Math.round(height * scale)}px`
    zoomedImage.src = image.currentSrc || image.src
    zoomedImage.alt = image.alt
    dialog.showModal()
    dialog.focus()
  }

  for (const image of document.querySelectorAll<HTMLImageElement>('.article-copy img')) {
    if (image.closest('a')) continue
    image.dataset.zoomable = 'true'
    image.tabIndex = 0
    image.setAttribute('role', 'button')
    image.setAttribute('aria-haspopup', 'dialog')
    image.setAttribute('aria-label', `${portuguese ? 'Ampliar imagem' : 'Zoom image'}${image.alt ? `: ${image.alt}` : ''}`)
    image.addEventListener('click', () => open(image))
    image.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      open(image)
    })
  }

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target === zoomedImage) dialog.close()
  })
  const closeOnScroll = () => { if (dialog.open) dialog.close() }
  window.addEventListener('wheel', closeOnScroll, { capture: true, passive: true })
  window.addEventListener('touchmove', closeOnScroll, { capture: true, passive: true })
  dialog.addEventListener('close', () => {
    sourceImage?.focus({ preventScroll: true })
    sourceImage = null
    zoomedImage.removeAttribute('src')
  })
}
