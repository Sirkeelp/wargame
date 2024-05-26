const board_col = ['a','b', 'c', 'd', 'e',' f']
const board_row = ['1','2', '3', '4', '5','6']

function Button({children}) {
  return (
    <>
      <button className="h-10 w-10 p-1 border-2 hover:bg-gray-200">
          {children}
      </button>
    </>
  )
}

function App() {
  return (
    <>
      <section className="p-3">
        {
          board_col.map((letter, index) => {
            return (
              <>
                {
                  board_row.map((num) =>
                  <Button key={index + letter + num}>
                    <p>{letter.toUpperCase() + num}</p>
                  </Button>
                  )
                }
                <br />
              </>
              )
          })
        }
      </section>
    </>
  )
}

export default App
