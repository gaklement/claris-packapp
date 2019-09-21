import { compose, withHandlers, withState } from 'recompose'
import { uniqBy, values } from 'lodash'

import React from 'react'
import { database } from './firebase'
import { defaultStyle } from 'substyle'

function FavouriteButton({
  items,
  name,
  onNameChange,
  onSaveToFavourites,
  style,
}) {
  return (
    <div {...style}>
      <input
        {...style('favouriteInput')}
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Gib einen Listennamen ein"
      />

      <div
        {...style('favouriteAdd')}
        disabled={!name}
        onClick={onSaveToFavourites}
      >
        Speichern
      </div>
    </div>
  )
}

const styled = defaultStyle(() => {
  const height = 28

  return {
    // display: 'flex',
    marginTop: 20,
    favouriteInput: {
      borderRadius: 3,
      border: 'none',
      backgroundColor: 'white',
      flexGrow: 1,
      height,
      lineHeight: `${height}px`,
      opacity: 0.6,
      paddingBottom: 0,
      paddingLeft: 4,
      // width: '100%',
      width: '98%', //sonst werd ich verruückt
    },
    favouriteAdd: {
      backgroundColor: '#dca3a3',
      border: 'none',
      borderRadius: 3,
      height,
      lineHeight: `${height}px`,
      marginTop: 3,
      textAlign: 'center',
      paddingBottom: 1,
      width: '100%',
    },
  }
})

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
  }),
  styled
)(FavouriteButton)
