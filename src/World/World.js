import { createCamera } from './components/camera.js'
import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { Train } from './components/Train/Train.js'
import { loadBirds } from './components/birds/birds.js'

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

    this.controls = createControls(this.camera, this.renderer.domElement)

    this.controls.addEventListener('change', () => {
      this.render()
    })

    // cube.onTextureLoaded = () => {
    //   this.render()
    // }

    const { ambientLight, mainLight } = createLights()
    // const train = new Train()
    // const secondTrain = train.clone()
    // secondTrain.position.x = 6

    this.loop.updatables.push(this.controls)

    // this.loop.updatables.push(cube)

    this.scene.add(ambientLight, mainLight)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resizer.onResize = () => {
    //   this.render()
    // }
    this.scene.add(createAxesHelper(), createGridHelper())
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds()

    this.controls.target.copy(parrot.position)

    this.loop.updatables.push(parrot, flamingo, stork)

    this.scene.add(parrot, flamingo, stork)
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