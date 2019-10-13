import { button, margin } from './theme'
import { compose, lifecycle, withHandlers, withState } from 'recompose'

import React from 'react'
import SaveFavouriteButton from './SaveFavouriteButton'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import { keys } from 'lodash'

function AllFavourites({
  checkedOffItems,
  favourites,
  items,
  itemsFromFavourites,
  onSelectChange,
  onFetchItems,
  style,
}) {
  return (
    <div {...style}>
      <div>
        <select {...style('favouriteSelect')} onChange={onSelectChange}>
          {favourites.map(favourite => {
            return (
              <option value={favourite} key={favourite}>
                {favourite}
              </option>
            )
          })}
        </select>
        <div
          {...style('favouriteGetButton')}
          type="text"
          onClick={onFetchItems}
        >
          ANZEIGEN
        </div>
      </div>
      <SaveFavouriteButton
        checkedOffItems={checkedOffItems}
        items={items}
        itemsFromFavourites={itemsFromFavourites}
      />
    </div>
  )
}

const styled = defaultStyle(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: margin.large,
  favouriteGetButton: {
    backgroundColor: button.backgroundColor,
    border: 'none',
    borderRadius: button.borderRadius,
    height: button.height,
    lineHeight: `${button.height}px`,
    textAlign: 'center',
  },
  favouriteSelect: {
    background: 'white',
    border: 'none',
    borderRadius: button.borderRadius,
    flexGrow: 1,
    height: button.height,
    marginBottom: margin.small,
    opacity: 0.6,
    width: '100%',
  },
}))

export default compose(
  withState('favourites', 'setFavourites', []),
  withState('selectedFavourite', 'setSelectedFavourite'),

  withHandlers({
    onSelectChange: ({ setSelectedFavourite }) => ({ target }) => {
      setSelectedFavourite(target.value)
    },
    onFetchItems: ({
      favourites,
      selectedFavourite,
      setCheckedOffItems,
      setItemsFromFavourites,
    }) => () => {
      if (favourites.length === 0) {
        return
      }
      database
        .ref(`favourites/${selectedFavourite}`)
        .once('value', snapshot => {
          setItemsFromFavourites(snapshot.val())
          setCheckedOffItems(snapshot.val().filter(item => item.isCheckedOff))
        })
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setFavourites, setSelectedFavourite } = this.props
      database.ref('favourites').once('value', snapshot => {
        setFavourites(keys(snapshot.val()))
        setSelectedFavourite(keys(snapshot.val())[0])
      })
    },
  }),
  styled
)(AllFavourites)
