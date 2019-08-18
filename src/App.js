import './App.css'

import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import Wizard from './Wizard'
import { defaultStyle } from 'substyle'
import { uniqueId } from 'lodash'

function App({
  amount,
  itemName,
  items,
  onAmountChange,
  onKeyDown,
  onInputChange,
  onItemAdd,
  onItemRemove,
  setWizardActive,
  style,
  wizardActive,
}) {
  return (
    <div {...style} className="App">
      <header className="App-header">
        <div>
          <input
            {...style('amount')}
            min={1}
            type="number"
            value={amount}
            onChange={onAmountChange}
          />
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
        {items.map((item, key) => (
          <div key={key}>
            <button onClick={() => onItemRemove(item)}>Remove</button>
            <div {...style('itemName')}>{`${item.amount} ${item.name}`}</div>
          </div>
        ))}
      </div>
      {wizardActive ? (
        <Wizard />
      ) : (
        <button id="wizard" onClick={() => setWizardActive(true)}>
          Start wizard
        </button>
      )}
    </div>
  )
}
const styled = defaultStyle(() => ({
  amount: {
    width: 40,
  },
  itemName: { display: 'inline' },
}))

export default compose(
  withState('itemName', 'setItemName', 'Socken'),
  withState('amount', 'setAmount', 1),
  withState('items', 'setItems', []),
  withState('wizardActive', 'setWizardActive', false),
  withHandlers({
    onItemAdd: ({
      amount,
      items,
      setAmount,
      setItems,
      setItemName,
      itemName,
    }) => () => {
      if (!itemName) {
        return
      }
      const item = {
        name: itemName,
        amount,
        id: uniqueId(),
      }
      setItems([...items, item])
      setItemName('')
      setAmount(1)
    },
    onItemRemove: ({ items, setItems }) => removedItem => {
      const updatedItems = items.filter(item => item.name !== removedItem.name)
      setItems(updatedItems)
    },
    onInputChange: ({ setItemName }) => ({ target }) => {
      setItemName(target.value)
    },
    onAmountChange: ({ setAmount }) => ({ target }) => {
      setAmount(target.value)
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
