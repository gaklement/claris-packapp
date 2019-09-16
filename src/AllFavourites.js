import { compose, lifecycle, withHandlers, withState } from 'recompose'

import React from 'react'
import { database } from './firebase'
import { keys } from 'lodash'

function AllFavourites({
  favourites,
  onSelectChange,
  onFetchItems,
  setFavourites,
}) {
  return (
    <div>
      <select onChange={onSelectChange}>
        {favourites.map(favourite => {
          return (
            <option value={favourite} key={favourite}>
              {favourite}
            </option>
          )
        })}
      </select>
      <button type="text" onClick={onFetchItems}>
        Liste abrufen
      </button>
    </div>
  )
}

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
  })
)(AllFavourites)
