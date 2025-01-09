import {WebGLRenderer} from 'three'

const createRenderer = () => {
  const renderer = new WebGLRenderer()

  renderer.physicallyCorrectLights = true

  return renderer
}

export { createRenderer }