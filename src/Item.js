import { faCheck, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { defaultStyle } from 'substyle'

function Item({ isCheckedOff, item, onClickItemCheck, onItemRemove, style }) {
  return (
    <div {...style}>
      <div {...style('itemName')}>
        {item.amount ? `${item.amount} x ${item.name}` : item.name}
      </div>
      <div {...style('toolbar')}>
        <FontAwesomeIcon
          {...style('remove')}
          icon={faTimes}
          onClick={() => onItemRemove(item)}
        />
        <FontAwesomeIcon
          icon={isCheckedOff ? faRedo : faCheck}
          onClick={() => onClickItemCheck(item, isCheckedOff)}
        />
      </div>
    </div>
  )
}

const styled = defaultStyle(
  () => {
    const fontColor = '#848282'

    return {
      marginBottom: 1,
      itemName: {
        backgroundColor: 'orange',
        color: fontColor,
        display: 'inline-block',
        paddingLeft: 10,
        textAlign: 'left',
        verticalAlign: 'center',
        width: 200,
      },

      remove: {
        paddingRight: 4,
      },

      toolbar: {
        backgroundColor: 'orange',
        color: fontColor,
        display: 'inline-block',
        paddingRight: 10,
        ':hover': { backgroundColor: 'blue' },
      },
      '&isCheckedOff': {
        itemName: { backgroundColor: '#ededf3' },
        toolbar: { backgroundColor: '#ededf3' },
      },
    }
  },
  ({ isCheckedOff }) => ({
    '&isCheckedOff': isCheckedOff,
  })
)

export default styled(Item)
