import { button, margin } from './theme'
import { compose, withHandlers, withState } from 'recompose'
import { uniqBy, values } from 'lodash'

import React from 'react'
import { database } from './firebase'
import { defaultStyle } from 'substyle'

function SaveFavouriteButton({
  name,
  onNameChange,
  onSaveToFavourites,
  showSavedHint,
  setShowSavedHint,
  style,
}) {
  if (showSavedHint) {
    setTimeout(() => {
      setShowSavedHint(false)
    }, 1500)
  }
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
        {showSavedHint ? 'GESPEICHERT' : 'SPEICHERN'}
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

function extendByCheckedOffProperty(checkedOffItems, items) {
  return items.map(item => ({
    ...item,
    isCheckedOff: item.isCheckedOff || checkedOffItems.includes(item),
  }))
}

export default compose(
  withState('name', 'setName', ''),
  withState('showSavedHint', 'setShowSavedHint', false),
  withHandlers({
    onNameChange: ({ setName }) => ({ target }) => {
      setName(target.value)
    },
    onSaveToFavourites: ({
      checkedOffItems,
      items,
      itemsFromFavourites = [],
      name,
      setShowSavedHint,
    }) => () => {
      if (!name) {
        return
      }

      const itemsWithCheckedOff = extendByCheckedOffProperty(checkedOffItems, [
        ...items,
        ...itemsFromFavourites,
      ])

      let favourites

      database.ref(`favourites/${name}`).once('value', snapshot => {
        favourites = values(snapshot.val())

        database
          .ref(`favourites/${name}`)
          .set(uniqBy([...itemsWithCheckedOff, ...favourites], 'id'), () => {
            setShowSavedHint(true)
          })
      })
    },
  }),
  styled
)(SaveFavouriteButton)
