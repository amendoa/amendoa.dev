import { DirectionalLight, DoubleSide, HemisphereLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

export async function renderStl(stage: HTMLElement, src: string, title: string, portuguese: boolean) {
  const geometry = await new STLLoader().loadAsync(src)
  geometry.center()
  geometry.computeBoundingSphere()
  const radius = geometry.boundingSphere?.radius ?? 0
  if (!Number.isFinite(radius) || radius <= 0) {
    geometry.dispose()
    throw new Error(`Invalid STL geometry: ${src}`)
  }

  const scene = new Scene()
  const camera = new PerspectiveCamera(45, 1, Math.max(radius / 100, 0.01), radius * 100)
  camera.position.set(radius * 1.8, radius * 1.3, radius * 1.8)
  scene.add(new HemisphereLight(0xffffff, 0x778899, 2))
  const light = new DirectionalLight(0xffffff, 2)
  light.position.set(2, 3, 4)
  scene.add(light)

  const material = new MeshStandardMaterial({ color: 0x9b87e9, roughness: 0.75, metalness: 0.05, side: DoubleSide })
  scene.add(new Mesh(geometry, material))

  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  } catch (error) {
    geometry.dispose()
    material.dispose()
    throw error
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.domElement.tabIndex = 0
  renderer.domElement.setAttribute('aria-label', portuguese
    ? `Modelo 3D: ${title}. Arraste para girar, Shift e arraste para mover, use a roda para aproximar e as setas para mover.`
    : `3D model: ${title}. Drag to rotate, Shift and drag to pan, scroll to zoom, and use the arrow keys to pan.`)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.cursorStyle = 'grab'
  controls.enableDamping = false
  controls.minDistance = radius * 1.2
  controls.maxDistance = radius * 15
  controls.listenToKeyEvents(renderer.domElement)
  controls.update()
  controls.addEventListener('change', () => renderer.render(scene, camera))

  stage.replaceChildren(renderer.domElement)
  const hint = document.createElement('p')
  hint.className = 'stl-hint'
  hint.textContent = portuguese
    ? 'Arraste para girar · Shift + arraste para mover · Role para aproximar'
    : 'Drag to rotate · Shift + drag to pan · Scroll to zoom'
  stage.after(hint)

  const resize = new ResizeObserver(() => {
    const width = stage.clientWidth
    const height = stage.clientHeight
    if (!width || !height) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    renderer.render(scene, camera)
  })
  resize.observe(stage)
}
