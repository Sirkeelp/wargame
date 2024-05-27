import mock from '../test/test.json'

/* async function getTable () {
  return JSON.parse(localStorage.getItem('currentGame'))
}
 */
async function newGame () {
  const req = await fetch(mock)
  console.log(req)
  const data = await req.json()
  // const data = mock
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

export { newGame }
