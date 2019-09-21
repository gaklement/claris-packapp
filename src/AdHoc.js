import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import { uniqueId } from 'lodash'

function AdHoc({ itemName, onItemAdd, onInputChange, onKeyDown, style }) {
  return (
    <div {...style('adHoc')}>
      <input
        {...style('adHocInput')}
        id="adHocName"
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={itemName}
      />

      <div {...style('adHocAdd')} onClick={onItemAdd}>
        +
      </div>
    </div>
  )
}

const styled = defaultStyle(() => {
  const height = 28

  return {
    adHoc: {
      display: 'flex',
    },
    adHocAdd: {
      backgroundColor: '#dca3a3',
      border: 'none',
      borderRadius: 3,
      height,
      lineHeight: `${height}px`,
      marginLeft: 3,
      textAlign: 'center',
      paddingBottom: 1,
      width: height,
    },
    adHocInput: {
      borderRadius: 3,
      border: 'none',
      backgroundColor: 'white',
      flexGrow: 1,
      height,
      lineHeight: `${height}px`,
      opacity: 0.6,
      paddingBottom: 0,
      paddingLeft: 4,
    },
  }
})

export default compose(
  withState('itemName', 'setItemName', 'Socken'),
  withHandlers({
    onInputChange: ({ setItemName }) => ({ target }) => {
      setItemName(target.value)
    },
    onItemAdd: ({ itemName, items, setItems, setItemName }) => () => {
      if (!itemName) {
        return
      }

      const item = {
        id: uniqueId(),
        name: itemName,
        packageIds: ['adHoc'],
      }

      setItems([...items, item])
      setItemName('')
    },
    onKeyDown: ({ onItemAdd }) => ({ keyCode }) => {
      if (keyCode === 13) {
        onItemAdd()
      }
    },
  }),
  styled
)(AdHoc)
