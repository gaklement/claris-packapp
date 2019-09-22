import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { button } from './theme'
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
  return {
    adHoc: {
      display: 'flex',
    },
    adHocAdd: {
      backgroundColor: '#dca3a3',
      border: 'none',
      borderRadius: button.borderRadius,
      height: button.height,
      lineHeight: `${button.height}px`,
      marginLeft: 3,
      textAlign: 'center',
      paddingBottom: 1,
      width: button.height,
    },
    adHocInput: {
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
  }),
  withHandlers({
    onKeyDown: ({ onItemAdd }) => ({ keyCode }) => {
      if (keyCode === 13) {
        onItemAdd()
      }
    },
  }),
  styled
)(AdHoc)
