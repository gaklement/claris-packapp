import './App.css'

import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import { uniqueId } from 'lodash'

function App({
  items,
  onKeyDown,
  onInputChange,
  onItemAdd,
  onItemRemove,
  style,
  value,
}) {
  return (
    <div {...style} className="App">
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
      <h2>Packliste:</h2>
      <div>
        {items.map((item, key) => (
          <div key={key}>
            <button onClick={() => onItemRemove(item)}>Remove</button>
            <div {...style('itemName')}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
const styled = defaultStyle(() => ({
  itemName: { display: 'inline' },
}))

export default compose(
  withState('value', 'setValue', 'Socken'),
  withState('items', 'setItems', []),
  withHandlers({
    onItemAdd: ({ items, setItems, setValue, value }) => () => {
      const item = {
        name: value,
        id: uniqueId(),
      }
      setItems([...items, item])
      setValue('')
    },
    onItemRemove: ({ items, setItems }) => ev => {
      const updatedItems = items.filter(item => item.name !== ev.name)
      setItems(updatedItems)
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
  }),
  styled
)(App)
