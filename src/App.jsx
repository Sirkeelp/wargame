import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { boardConfig } from '../test/inputs.js'
import { innitGame } from './utils/utils.js'
import { updatePosition } from './api/put.js'
import { deleteTable } from './api/delete.js'

AttackButton.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

function AttackButton ({ item, index }) {
  const {
    id,
    base,
    attacked,
    coordinate
  } = item

  const nextRow = index !== 0 && index % boardConfig.board_cols === 0

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
          <p>{coordinate}</p>
        </button>
    </>
  )
}

Board.propTypes = {
  children: PropTypes.array,
  restartGame: PropTypes.func
}

function Board ({ children, restartGame }) {
  return (
    <>
      <article>
        { children }
      </article>
      <button type='button' onClick={restartGame}>Restart</button>
    </>
  )
}

function App () {
  const [cpuGame, setCpuGame] = useState(false)
  function soloGame () {
    setCpuGame(true)
  }

  const [gameMap, setGameMap] = useState([])

  async function generateMap () {
    const newGameMap = await innitGame()
    setGameMap(newGameMap)
  }

  async function restartGame (e) {
    e.preventDefault()
    await deleteTable()
    setGameMap([])
  }

  useEffect(() => {
    if (gameMap.length === 0) generateMap()
  }, [gameMap])
  return (
    <>
      <section className="p-3">
        {
          cpuGame
            ? <>
              <Board restartGame={restartGame}>
                {
                  gameMap.map((item, index) =>
                    <AttackButton
                      key={item.id}
                      item={item}
                      index={index}
                    />)
                }
              </Board>
            </>
            : <button className='p-2 rounded-md bg-slate-300 hover:bg-slate-600' onClick={soloGame}>1 vs CPU</button>
        }
      </section>
    </>
  )
}

export default App
