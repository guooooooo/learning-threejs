import { createCamera } from './components/camera.js'
import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { Train } from './components/Train/Train.js'

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

    // cube.onTextureLoaded = () => {
    //   this.render()
    // }

    const { ambientLight, mainLight } = createLights()
    const train = new Train()
    const secondTrain = train.clone()
    secondTrain.position.x = 6

    this.loop.updatables.push(controls, train, secondTrain)

    // this.loop.updatables.push(cube)

    this.scene.add(ambientLight, mainLight, train, secondTrain)

    const resizer = new Resizer(container, this.camera, this.renderer)
    // resizer.onResize = () => {
    //   this.render()
    // }
    this.scene.add(createAxesHelper(), createGridHelper())
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