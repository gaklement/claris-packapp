import { button, color, margin } from './theme'
import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import { uniqueId } from 'lodash'

function AdHoc({
  adHocActive,
  itemName,
  onItemAdd,
  onInputChange,
  onKeyDown,
  setAdHocActive,
  style,
}) {
  return (
    <div>
      <div {...style('popUp')} onClick={() => setAdHocActive(true)}>
        +
      </div>

      {adHocActive && (
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
      )}
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
      marginLeft: margin.small,
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
    popUp: {
      backgroundColor: color.primary,
      border: `1px solid ${color.secondary}`,
      borderRadius: '20px',
      bottom: 0,
      color: color.secondary,
      fontSize: 25,
      height: '40px',
      lineHeight: '35px',
      marginBottom: margin.medium,
      marginRight: margin.medium,
      position: 'fixed',
      right: 0,
      textAlign: 'center',
      width: '40px',
    },
  }
})

export default compose(
  withState('adHocActive', 'setAdHocActive', false),
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
