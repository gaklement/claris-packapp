import './App.css'

import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { uniqueId, values } from 'lodash'

import ItemList from './ItemList'
import React from 'react'
import WelcomeScreen from './WelcomeScreen'
import Wizard from './Wizard'
import { database } from './firebase'
import { defaultStyle } from 'substyle'

// import { initializePackages } from './dataUtils'

function App({
  itemName,
  items,
  onKeyDown,
  onInputChange,
  onItemAdd,
  onItemRemove,
  setItems,
  setWizardActive,
  showWelcome,
  style,
  packages,
  wizardActive,
}) {
  // if (showWelcome) {
  //   return <WelcomeScreen />
  // }

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
        <ItemList
          items={items}
          onItemRemove={onItemRemove}
          packages={packages}
        />
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
  withState('showWelcome', 'setShowWelcome', true),
  withState('packages', 'setPackages', []), //
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
  lifecycle({
    componentDidMount() {
      const { setShowWelcome, setPackages } = this.props
      const ref = database.ref('packages')

      ref.on('value', snapshot => {
        setPackages(values(snapshot.val()))
      })

      // initializePackages(database)

      setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
    },
  }),
  styled
)(App)
