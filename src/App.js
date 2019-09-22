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
import { button } from './theme'
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
      <AdHoc items={items} setItems={setItems} />

      <FavouriteButton items={items} />
      <AllFavourites
        setItemsFromFavourites={itemsFromFavourites =>
          setItemsFromFavourites(itemsFromFavourites)
        }
      />

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
      {wizardActive ? (
        <Wizard
          onWizardComplete={mappedItems => {
            setItems([...items, ...mappedItems])
          }}
        />
      ) : (
        <button
          {...style('startWizard')}
          type="input"
          onClick={() => setWizardActive(true)}
        >
          Start wizard
        </button>
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
    </div>
  )
}
const styled = defaultStyle(() => {
  return {
    padding: 5,

    itemName: { display: 'inline' },

    startWizard: {
      background: button.backgroundColor,
      border: 'none',
      borderRadius: button.borderRadius,
      height: button.height,
      width: '100%',
    },
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
