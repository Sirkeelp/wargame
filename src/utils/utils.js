async function innitGame () {
  const req = await fetch('../../test/test.json')
  const data = await req.json()
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

export {
  innitGame
}
