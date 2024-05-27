import { saveTable } from './post'

async function getTable () {
  return JSON.parse(localStorage.getItem('currentGame'))
}

async function newGame () {
  const req = await fetch('../test/test.json')
  const data = await req.json()
  const newArr = data.map((item) => {
    return {
      coordinate: item.coordinate,
      base: item.base,
      attacked: item.attacked,
      id: item.id
    }
  })
  saveTable(newArr)
  return newArr
}

export { newGame, getTable }
