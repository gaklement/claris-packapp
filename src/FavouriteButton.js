import { compose, withHandlers, withState } from 'recompose'
import { uniqBy, values } from 'lodash'

import React from 'react'
import { database } from './firebase'

function FavouriteButton({ items, name, onNameChange, onSaveToFavourites }) {
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Gib der Liste einen Namen.."
      />
      <button disabled={!name} onClick={onSaveToFavourites}>
        Save to favourites
      </button>
    </div>
  )
}

export default compose(
  withState('name', 'setName', ''),
  withHandlers({
    onNameChange: ({ setName }) => ({ target }) => {
      setName(target.value)
    },
    onSaveToFavourites: ({ items, name }) => () => {
      if (!name) {
        return
      }

      let favourites

      database.ref(`favourites/${name}`).once('value', snapshot => {
        favourites = values(snapshot.val())

        database
          .ref(`favourites/${name}`)
          .set(uniqBy([...items, ...favourites], 'id'))
      })
    },
  })
)(FavouriteButton)
