import { compose, lifecycle, withState } from 'recompose'

import React from 'react'
import { database } from './firebase'
import { keys } from 'lodash'

function AllFavourites({ favourites, setFavourites }) {
  return (
    <select>
      {favourites.map(favourite => {
        return (
          <option value={favourite} key={favourite}>
            {favourite}
          </option>
        )
      })}
    </select>
  )
}

export default compose(
  withState('favourites', 'setFavourites', []),
  lifecycle({
    componentDidMount() {
      const { setFavourites } = this.props
      database.ref('favourites').once('value', snapshot => {
        setFavourites(keys(snapshot.val()))
      })
    },
  })
)(AllFavourites)
