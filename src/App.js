import './App.css'

import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { uniqueId, values } from 'lodash'

import AdHoc from './AdHoc'
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
  packages,
  setItems,
  setItemsFromFavourites,
  setWizardActive,
  style,
  wizardActive,
}) {
  // if (!selectedMenuItem) {
  //   return <WelcomeScreen onMenuItemSelect={onMenuItemSelect} />
  // }

  return (
    <div {...style} className="App">
      <header className="App-header">
        <AdHoc items={items} setItems={setItems} />
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
        <ItemList
          items={itemsFromFavourites}
          onItemRemove={removedItem => {
            const updatedItems = itemsFromFavourites.filter(
              item => item !== removedItem
            )

            setItemsFromFavourites(updatedItems)
          }}
          packages={packages}
        />
      )}
      {items.length > 0 && (
        <div id="items">
          <ItemList
            items={items}
            onItemRemove={onItemRemove}
            packages={packages}
          />
        </div>
      )}
      {wizardActive ? (
        <Wizard
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
const styled = defaultStyle(() => {
  // const fontSize = 14
  return {
    fontFamily: 'Inconsolata, monospace',

    itemName: { display: 'inline' },
  }
})

export default compose(
  withState('items', 'setItems', []),
  withState('itemsFromFavourites', 'setItemsFromFavourites', []),
  withState('packages', 'setPackages', []),
  withState('wizardActive', 'setWizardActive', false),
  withHandlers({
    onItemRemove: ({ items, setItems }) => removedItem => {
      const updatedItems = items.filter(item => item !== removedItem)
      console.log('==hello', updatedItems)
      setItems(updatedItems)
    },
  }),
  withHandlers({
    onMenuItemSelect: ({ setSelectedMenuItem }) => menuItem => {
      setSelectedMenuItem(menuItem)
    }, //
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
