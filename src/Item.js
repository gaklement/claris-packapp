import { button, margin } from './theme'
import {
  faCheckCircle,
  faRedo,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

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
        <div {...style('removeContainer')}>
          <FontAwesomeIcon
            {...style('remove')}
            icon={faTimes}
            onClick={() => onItemRemove(item)}
          />
        </div>
        <div {...style('checkOffContainer')}>
          <FontAwesomeIcon
            {...style('checkOff')}
            icon={isCheckedOff ? faRedo : faCheckCircle}
            onClick={() => onClickItemCheck(item, isCheckedOff)}
          />
        </div>
      </div>
    </div>
  )
}

const styled = defaultStyle(
  () => {
    return {
      display: 'flex',
      height: button.height,
      lineHeight: `${button.height}px`,
      marginBottom: 1,
      paddingBottom: 2,

      checkOff: {
        color: '#277933',
      },

      checkOffContainer: {
        backgroundColor: 'white',
        border: 'none',
        borderRadius: button.borderRadius,
        height: button.height,
        marginLeft: margin.small,
        opacity: 0.6,
        textAlign: 'center',
        width: button.height,
      },

      itemName: {
        backgroundColor: 'white',
        border: 'none',
        borderRadius: button.borderRadius,
        flexGrow: 1,
        opacity: 0.6,
        paddingLeft: button.padding,
        paddingRight: button.padding,
      },

      remove: {
        color: '#ad3f3f',
        marginTop: 7, // no idea why but that centers the icon
      },

      removeContainer: {
        backgroundColor: 'white',
        border: 'none',
        borderRadius: button.borderRadius,
        height: button.height,
        marginLeft: margin.small,
        opacity: 0.6,
        textAlign: 'center',
        width: button.height,
      },

      toolbar: {
        display: 'flex',
      },
      '&isCheckedOff': {
        opacity: 0.3,
      },
    }
  },
  ({ isCheckedOff }) => ({
    '&isCheckedOff': isCheckedOff,
  })
)

export default styled(Item)
