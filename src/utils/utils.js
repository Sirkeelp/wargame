import { getTable, newGame } from '../api/get'

async function innitGame () {
  const savedMap = await getTable()
  if (savedMap !== null) return savedMap
  console.log('aqui')
  const newMap = await newGame()
  return newMap
}

export {
  innitGame
}
