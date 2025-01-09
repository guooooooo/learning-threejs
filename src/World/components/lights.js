import { DirectionalLight } from 'three'

const createLights = () => {
  const light = new DirectionalLight('white', 8)

  light.position.set(10, 10, 10)

  return light
}

export { createLights }