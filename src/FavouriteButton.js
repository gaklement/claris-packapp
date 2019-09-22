import { compose, withHandlers, withState } from 'recompose'
import { uniqBy, values } from 'lodash'

import React from 'react'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import theme from './theme'

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
  return {
    // display: 'flex',
    marginTop: 20,
    favouriteInput: {
      borderRadius: theme.button.borderRadius,
      border: 'none',
      backgroundColor: 'white',
      flexGrow: 1,
      height: theme.button.height,
      lineHeight: `${theme.button.height}px`,
      opacity: 0.6,
      paddingBottom: 0,
      paddingLeft: theme.button.padding,
      // width: '100%',
      width: '98%', //sonst werd ich verruückt
    },
    favouriteAdd: {
      backgroundColor: '#dca3a3',
      border: 'none',
      borderRadius: theme.button.borderRadius,
      height: theme.button.height,
      lineHeight: `${theme.button.height}px`,
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
