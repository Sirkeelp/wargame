// this is a mock of the implementation
async function updateTable (item) {
  const oldTable = JSON.parse(localStorage.getItem('currentGame'))
  const index = oldTable.findIndex((position) => position.id === item.id)
  const newTable = oldTable.splice(index, item)
  localStorage.setItem('currentGame', JSON.stringify(newTable))
}

async function updatePosition ({ id }) {
  const req = await fetch('../../test/test.json')
  const data = await req.json()

  const oldElement = data.find((item) => item.id === id)

  const newElement = {
    ...oldElement,
    attacked: true
  }

  await updateTable(newElement)
  return newElement
}
export {
  updatePosition
}
