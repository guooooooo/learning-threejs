import { World } from './World/World.js'

async function main() {
  const container = document.querySelector('#scene-container')
  const world = new World(container)

  await world.init()

  // produce a single frame (render on demand)
  // world.render()

  // start the loop (produce a stream of frames)
  world.start()
}

main().catch(error => {
  console.error('An error occurred:', error)
})