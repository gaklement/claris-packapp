import { compose, lifecycle, withHandlers, withState } from 'recompose'

import React from 'react'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import { keys } from 'lodash'
import theme from './theme'

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
        Anzeigen
      </div>
    </div>
  )
}

const styled = defaultStyle(() => ({
  display: 'flex',
  marginTop: 20,
  favouriteGetButton: {
    backgroundColor: theme.button.backgroundColor,
    border: 'none',
    borderRadius: theme.button.borderRadius,
    height: theme.button.height,
    lineHeight: `${theme.button.height}px`,
    marginLeft: 3,
    paddingLeft: theme.button.padding,
    paddingRight: theme.button.padding,
  },
  favouriteSelect: {
    background: 'white',
    border: 'none',
    borderRadius: theme.button.borderRadius,
    flexGrow: 1,
    height: theme.button.height,
    marginBottom: 5,
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
