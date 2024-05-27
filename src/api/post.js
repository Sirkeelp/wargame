// mock implementation of db using local storage
async function saveTable (table) {
  localStorage.setItem('currentGame', JSON.stringify(table))
}

export { saveTable }
