import './App.css'

import { compose, lifecycle, withHandlers, withState } from 'recompose'

import AdHoc from './AdHoc'
import AllFavourites from './AllFavourites'
import FavouriteButton from './FavouriteButton'
import ItemList from './ItemList'
import React from 'react'
import WelcomeScreen from './WelcomeScreen'
import WizardContainer from './WizardContainer'
import { button } from './theme'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import ihmk from './ihmk.png'
import { initializeTestData } from './dataUtils'
import { values } from 'lodash'

function App({
  items,
  itemsFromFavourites,
  onItemRemove,
  packages,
  selectedMenuItem,
  setItems,
  setItemsFromFavourites,
  setSelectedMenuItem,
  style,
}) {
  return (
    <div {...style} className="App">
      <img {...style('logo')} src={ihmk} alt="logo" />

      <AdHoc items={items} setItems={setItems} />
      {selectedMenuItem === 'favourites' && (
        <div>
          <FavouriteButton items={items} />
          <AllFavourites
            setItemsFromFavourites={itemsFromFavourites =>
              setItemsFromFavourites(itemsFromFavourites)
            }
          />
        </div>
      )}

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
      {selectedMenuItem === 'wizard' ? (
        <WizardContainer
          onWizardComplete={mappedItems => {
            setItems([...items, ...mappedItems])
          }}
        />
      ) : (
        <WelcomeScreen
          onMenuItemSelect={menuItem => setSelectedMenuItem(menuItem)}
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
    </div>
  )
}
const styled = defaultStyle(() => {
  return {
    padding: 5,

    itemName: { display: 'inline' },

    logo: {
      display: 'block',
      margin: '0 auto',
      maxWidth: 150,
      paddingBottom: 10,
      width: '50%',
    },

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
  withState('selectedMenuItem', 'setSelectedMenuItem', ''),
  withState('packages', 'setPackages', []),
  withHandlers({
    onItemRemove: ({ items, setItems }) => removedItem => {
      const updatedItems = items.filter(item => item !== removedItem)
      console.log('==hello', updatedItems)
      setItems(updatedItems)
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
