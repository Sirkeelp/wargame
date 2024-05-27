import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { boardConfig } from '../test/inputs.js'
import { innitGame } from './utils/utils.js'
import { updatePosition } from './api/put.js'
import { deleteTable } from './api/delete.js'

Button.propTypes = {
  children: PropTypes.element,
  id: PropTypes.string,
  base: PropTypes.bool,
  attacked: PropTypes.bool,
  nextRow: PropTypes.bool
}

function Button ({ children, id, base, attacked, nextRow = false }) {
  const [active, setActive] = useState(attacked)

  async function attackPosition (e) {
    e.preventDefault()

    if (e.currentTarget.diabled) { return }
    e.currentTarget.diabled = true
    setActive(true)

    await updatePosition({ id: e.currentTarget.id })
  }

  return (
    <>
        { nextRow && <br/> }
        <button
          className={`h-10 w-10 p-1 border-2 hover:bg-gray-200 disabled:bg-red-300 ${base && 'bg-green-300'}`}
          disabled={active}
          onClick={attackPosition}
          id={id}
        >
          {children}
        </button>
    </>
  )
}

function Board () {
  const [gameMap, setGameMap] = useState([])

  async function generateMap () {
    const newGameMap = await innitGame()
    setGameMap(newGameMap)
  }

  useEffect(() => {
    generateMap()
  }, [])

  return (
    <>
      {
        gameMap.map((item, index) =>
          <Button
          key={item.id}
          base={item.base}
          attacked={item.attacked}
          id={item.id}
          nextRow={index !== 0 && index % boardConfig.board_cols === 0}
        >
          <p>{item.coordinate}</p>
        </Button>)
      }
    </>
  )
}

function Actionbuttons () {
  async function restartGame (e) {
    e.preventDefault()
    await deleteTable()
    await innitGame()
  }
  return (
    <form onSubmit={restartGame}>
      <button type='submit'>Restart</button>
    </form>
  )
}

function App () {
  return (
    <>
      <section className="p-3">
        { Board() }
        <Actionbuttons />
      </section>
    </>
  )
}

export default App
