import { button, color } from './theme'

import React from 'react'
import { defaultStyle } from 'substyle'
import { isNil } from 'lodash'

function NextButton({ onNextClick, pendingAnswer, style, travelLength }) {
  return (
    <button
      {...style}
      id="next"
      onClick={() => {
        onNextClick()
      }}
      type="text"
      disabled={
        travelLength === undefined ||
        (travelLength !== undefined && isNil(pendingAnswer))
      }
    >
      Weiter
    </button>
  )
}

const styled = defaultStyle(() => ({
  backgroundColor: color.primary,
  border: 'none',
  borderRadius: button.borderRadius,
  color: 'white',
  height: button.height,
  marginTop: 10,
}))

export default styled(NextButton)
