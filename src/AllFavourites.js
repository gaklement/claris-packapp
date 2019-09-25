import { button, margin } from './theme'
import { compose, lifecycle, withHandlers, withState } from 'recompose'

import React from 'react'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import { keys } from 'lodash'

function AllFavourites({
  favourites,
  onSelectChange,
  onFetchItems,
  setFavourites,
  style,
}) {
  return (
    <div {...style}>
      <select {...style('favouriteSelect')} onChange={onSelectChange}>
        {favourites.map(favourite => {
          return (
            <option value={favourite} key={favourite}>
              {favourite}
            </option>
          )
        })}
      </select>
      <div {...style('favouriteGetButton')} type="text" onClick={onFetchItems}>
        ANZEIGEN
      </div>
    </div>
  )
}

const styled = defaultStyle(() => ({
  display: 'flex',
  marginTop: margin.large,
  favouriteGetButton: {
    backgroundColor: button.backgroundColor,
    border: 'none',
    borderRadius: button.borderRadius,
    height: button.height,
    lineHeight: `${button.height}px`,
    marginLeft: margin.small,
    paddingLeft: button.padding,
    paddingRight: button.padding,
  },
  favouriteSelect: {
    background: 'white',
    border: 'none',
    borderRadius: button.borderRadius,
    flexGrow: 1,
    height: button.height,
    marginBottom: margin.medium,
    opacity: 0.6,
  },
}))

export default compose(
  withState('favourites', 'setFavourites', []),
  withState('selectedFavourite', 'setSelectedFavourite'),

  withHandlers({
    onSelectChange: ({ setSelectedFavourite }) => ({ target }) => {
      setSelectedFavourite(target.value)
    },
    onFetchItems: ({ selectedFavourite, setItemsFromFavourites }) => () => {
      database
        .ref(`favourites/${selectedFavourite}`)
        .once('value', snapshot => {
          setItemsFromFavourites(snapshot.val())
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
