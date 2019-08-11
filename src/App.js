import './App.css'

import { compose, withHandlers, withState } from 'recompose'

import React from 'react'

function App({ items, onKeyDown, onInputChange, onItemAdd, setValue, value }) {
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={value}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <button type="submit " onClick={onItemAdd}>
          ADD
        </button>
      </header>
      <div>Packliste: </div>
      <div>
        {items.map((item, key) => (
          <div key={key}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default compose(
  withState('value', 'setValue', 'something'),
  withState('items', 'setItems', []),
  withHandlers({
    onItemAdd: ({ items, setItems, setValue, value }) => () => {
      setItems([...items, value])
      setValue('')
    },
  }),
  withHandlers({
    onKeyDown: ({ onItemAdd }) => ({ keyCode }) => {
      if (keyCode === 13) {
        onItemAdd()
      }
    },
    onInputChange: ({ setValue }) => ({ target }) => {
      setValue(target.value)
    },
  })
)(App)
