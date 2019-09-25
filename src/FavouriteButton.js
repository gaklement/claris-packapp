import { button, margin } from './theme'
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
        SPEICHERN
      </div>
    </div>
  )
}

const styled = defaultStyle(() => {
  return {
    display: 'flex',
    flexDirection: 'column',

    marginTop: margin.large,
    favouriteInput: {
      borderRadius: button.borderRadius,
      border: 'none',
      backgroundColor: 'white',
      flexGrow: 1,
      height: button.height,
      lineHeight: `${button.height}px`,
      opacity: 0.6,
      paddingBottom: 0,
      paddingLeft: button.padding,
    },
    favouriteAdd: {
      backgroundColor: '#dca3a3',
      border: 'none',
      borderRadius: button.borderRadius,
      height: button.height,
      lineHeight: `${button.height}px`,
      marginTop: margin.small,
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
