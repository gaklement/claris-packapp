import './App.css'

import { compose, withHandlers, withState } from 'recompose'

import ItemList from './ItemList'
import React from 'react'
import Wizard from './Wizard'
import { defaultStyle } from 'substyle'
import { uniqueId } from 'lodash'

function App({
  itemName,
  items,
  onKeyDown,
  onInputChange,
  onItemAdd,
  onItemRemove,
  setItems,
  setWizardActive,
  style,
  wizardActive,
}) {
  return (
    <div {...style} className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            value={itemName}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <button type="submit" onClick={onItemAdd}>
          ADD
        </button>
      </header>
      <h2>Packliste:</h2>
      <div id="items">
        <ItemList items={items} onItemRemove={onItemRemove} />
      </div>
      {wizardActive ? (
        <Wizard
          onWizardComplete={mappedItems => {
            setItems([...items, ...mappedItems])
          }}
        />
      ) : (
        <button id="wizard" onClick={() => setWizardActive(true)}>
          Start wizard
        </button>
      )}
    </div>
  )
}
const styled = defaultStyle(() => ({
  itemName: { display: 'inline' },
}))

export default compose(
  withState('itemName', 'setItemName', 'Socken'),
  withState('items', 'setItems', []),
  withState('wizardActive', 'setWizardActive', false),
  withHandlers({
    onItemAdd: ({ items, setItems, setItemName, itemName }) => () => {
      if (!itemName) {
        return
      }

      const item = {
        id: uniqueId(),
        name: itemName,
      }

      setItems([...items, item])
      setItemName('')
    },
    onItemRemove: ({ items, setItems }) => removedItem => {
      const updatedItems = items.filter(item => item !== removedItem)
      setItems(updatedItems)
    },
    onInputChange: ({ setItemName }) => ({ target }) => {
      setItemName(target.value)
    },
  }),
  withHandlers({
    onKeyDown: ({ onItemAdd }) => ({ keyCode }) => {
      if (keyCode === 13) {
        onItemAdd()
      }
    },
  }),
  styled
)(App)
