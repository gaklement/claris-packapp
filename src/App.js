import './App.css'

import { compose, lifecycle, withHandlers, withState } from 'recompose'

import AdHoc from './AdHoc'
import AllFavourites from './AllFavourites'
import FavouriteButton from './FavouriteButton'
import ItemList from './ItemList'
import React from 'react'
import Wizard from './Wizard'
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
  setItems,
  setItemsFromFavourites,
  setWizardActive,
  style,
  wizardActive,
}) {
  return (
    <div {...style} className="App">
      <img {...style('logo')} src={ihmk} alt="logo" />

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

    logo: {
      display: 'block',
      margin: '0 auto',
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
  withState('packages', 'setPackages', []),
  withState('wizardActive', 'setWizardActive', false),
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
