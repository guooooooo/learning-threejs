import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from 'three'

const createMaterial = () => {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(
    '/assets/textures/uv-test-bw.png',
    // onLoad callback
    function ( texture ) {
      console.log( 'texture loaded' )
      
    },

    // onProgress callback currently not supported
    undefined,

    // onError callback
    function ( err ) {
      console.error( 'An error happened.' );
    }
  )
  const material = new MeshStandardMaterial({
    map: texture,
  })
  return material
}

const createCube = () => {

  const geometry = new BoxGeometry(2, 2, 2)

  const material = createMaterial()

  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, -0.8)

  const radiansPerSecond = MathUtils.degToRad(30)

  cube.tick = (delta) => {
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
    cube.rotation.z += radiansPerSecond * delta
  }

  return cube
}

export { createCube }