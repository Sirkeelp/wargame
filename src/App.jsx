import { useState } from "react"
import { coordinates, board_config } from "../test/inputs.js"

function Button({children, base, attacked}) {
  const [active, setActive] = useState(false)
  
  function disableBtn(e) {
    e.preventDefault()
    if (e.currentTarget.diabled)
      return
    e.currentTarget.diabled = true
    setActive(true)
  }

  return (
    <>
      {
        (!base)
          ? (<button
              className="h-10 w-10 p-1 border-2 hover:bg-gray-200 disabled:bg-red-300"
              disabled={active}
              onClick={disableBtn}
            >
                {children}
            </button>)
          : (<button
              className="h-10 w-10 p-1 border-2 hover:bg-gray-200 disabled:bg-red-300 bg-green-300"
              disabled={active}
              onClick={disableBtn}
            >
                {children}
            </button>)
      }
    </>
  )
}

function Board() {
  return (
    <>
      { 
        coordinates.map((item, index) => {
          if (index != 0 && index % board_config.board_cols == 0)
            return (
          <>
              <Button
                  key={item.position}
                  base={item.base}
                  attacked={item.attacked}
                >
                  <p>{item.position}</p>
                </Button>
              <br/>
          </>
          )
          return (<Button
          key={item.position}
          base={item.base}
          attacked={item.attacked}
        >
          <p>{item.position}</p>
        </Button>)
        }
      )}
    </>
  )
}

function App() {
  return (
    <>
      <section className="p-3">
        { Board() }
      </section>
    </>
  )
}

export default App
