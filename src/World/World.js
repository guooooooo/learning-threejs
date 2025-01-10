import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'

import { createRenderer } from './systems/renderer.js'
import { createControls } from './systems/controls.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'

class World {
  constructor(container) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    container.append(this.renderer.domElement)

    const controls = createControls(this.camera, this.renderer.domElement)

    controls.addEventListener('change', () => {
      this.render()
    })

    const cube = createCube(() => this.render())
    // cube.onTextureLoaded = () => {
    //   this.render()
    // }

    const light = createLights()

    this.loop.updatables.push(controls)

    // this.loop.updatables.push(cube)

    this.scene.add(cube, light)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resizer.onResize = () => {
    //   this.render()
    // }
  }

  render() {
    console.log('render')
    
    this.renderer.render(this.scene, this.camera)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}

export { World }