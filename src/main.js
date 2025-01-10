import { World } from './World/World.js'

function main() {
  const container = document.querySelector('#scene-container')
  const world = new World(container)

  // produce a single frame (render on demand)
  world.render()

  // start the loop (produce a stream of frames)
  // world.start()
}

main()