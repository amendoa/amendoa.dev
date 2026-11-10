class StlViewer extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('.stl-stage')) return

    const portuguese = document.documentElement.lang.startsWith('pt')
    const stage = document.createElement('div')
    stage.className = 'stl-stage'
    stage.setAttribute('role', 'group')
    stage.setAttribute('aria-label', this.getAttribute('title') ?? (portuguese ? 'Modelo 3D' : '3D model'))

    const status = document.createElement('p')
    status.className = 'stl-status'
    status.setAttribute('role', 'status')
    status.textContent = portuguese ? 'Carregando visualização 3D…' : 'Loading 3D preview…'
    stage.append(status)
    this.append(stage)

    const src = this.getAttribute('src')
    if (!src) return

    const load = async () => {
      stage.setAttribute('aria-busy', 'true')
      try {
        const { renderStl } = await import('./stl-viewer-renderer')
        await renderStl(stage, src, this.getAttribute('title') ?? '', portuguese)
        stage.removeAttribute('aria-busy')
        this.dataset.ready = 'true'
      } catch (error) {
        console.error('Unable to display STL preview:', error)
        stage.removeAttribute('aria-busy')
        status.textContent = portuguese
          ? 'Visualização indisponível. Você ainda pode baixar o arquivo STL.'
          : 'Preview unavailable. You can still download the STL file.'
        stage.replaceChildren(status)
      }
    }

    if (!('IntersectionObserver' in window)) {
      void load()
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      void load()
    }, { rootMargin: '200px' })
    observer.observe(this)
  }
}

if (!customElements.get('stl-viewer')) customElements.define('stl-viewer', StlViewer)
