import './App.css'

import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { uniqueId, values } from 'lodash'

import AllFavourites from './AllFavourites'
import FavouriteButton from './FavouriteButton'
import ItemList from './ItemList'
import React from 'react'
import WelcomeScreen from './WelcomeScreen'
import Wizard from './Wizard'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import { initializeTestData } from './dataUtils'

function App({
  itemName,
  items,
  itemsFromFavourites,
  onKeyDown,
  onInputChange,
  onItemAdd,
  onItemRemove,
  setItems,
  setItemsFromFavourites,
  setTravelLength,
  setWizardActive,
  style,
  packages,
  wizardActive,
}) {
  // if (!selectedMenuItem) {
  //   return <WelcomeScreen onMenuItemSelect={onMenuItemSelect} />
  // }

  return (
    <div {...style} className="App">
      <header className="App-header">
        {
          <div>
            <input
              type="text"
              id="adHocName"
              value={itemName}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
            />

            <button type="submit" onClick={onItemAdd}>
              ADD
            </button>
          </div>
        }
      </header>
      {
        <div>
          <FavouriteButton items={items} />
          <AllFavourites
            setItemsFromFavourites={itemsFromFavourites =>
              setItemsFromFavourites(itemsFromFavourites)
            }
          />
        </div>
      }
      {itemsFromFavourites.length > 0 && (
        <ItemList items={itemsFromFavourites} packages={packages} />
      )}
      <div id="items">
        <ItemList
          items={items}
          onItemRemove={onItemRemove}
          packages={packages}
        />
      </div>
      {wizardActive ? (
        <Wizard
          onTravelLengthComplete={asdf => console.log('==asdf', asdf)}
          onWizardComplete={mappedItems => {
            setItems([...items, ...mappedItems])
          }}
        />
      ) : (
        <button type="input" onClick={() => setWizardActive(true)}>
          Start wizard
        </button>
      )}
    </div>
  )
}
const styled = defaultStyle(() => ({
  fontFamily: 'Inconsolata, monospace',

  itemName: { display: 'inline' },
}))

export default compose(
  withState('itemName', 'setItemName', 'Socken'),
  withState('items', 'setItems', []),
  withState('itemsFromFavourites', 'setItemsFromFavourites', []),
  withState('packages', 'setPackages', []),
  withState('wizardActive', 'setWizardActive', false),
  withHandlers({
    onItemAdd: ({ items, setItems, setItemName, itemName }) => () => {
      if (!itemName) {
        return
      }

      const item = {
        id: uniqueId(),
        name: itemName,
        packageIds: ['adHoc'],
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
    onMenuItemSelect: ({ setSelectedMenuItem }) => menuItem => {
      setSelectedMenuItem(menuItem)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setPackages } = this.props
      const ref = database.ref('packages')

      ref.on('value', snapshot => {
        setPackages(values(snapshot.val()))
      })

      // initializeTestData(database)
    },
  }),
  styled
)(App)
