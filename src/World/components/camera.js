import { PerspectiveCamera } from 'three'

const createCamera = () => {
  const camera = new PerspectiveCamera(
    35, // fov
    1, // aspect
    0.1, // near clipping plane
    100, // far clipping plane
  )

  camera.position.set(-5, 5, 7)

  return camera
}

export { createCamera }