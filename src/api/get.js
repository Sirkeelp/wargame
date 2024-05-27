async function getTable () {
  return JSON.parse(localStorage.getItem('currentGame'))
}

async function newGame () {
  const req = await fetch('../test/test.json')
  const data = await req.json()
  console.log('no aqui')
  const newArr = data.map((item) => {
    return {
      coordinate: item.coordinate,
      base: item.base,
      attacked: item.attacked,
      id: item.id
    }
  })
  return newArr
}

export { newGame, getTable }
