import React from 'react'
import { compose } from 'recompose'
import { css } from 'glamor'
import { defaultStyle } from 'substyle'

const keyframes = css.keyframes({
  from: {
    fontSize: 11,
  },
  to: {
    fontSize: 200,
  },
})

function WelcomeScreen({ style }) {
  return <div {...style}>HELLO</div>
}

const styled = defaultStyle(() => ({
  animation: 'x 1.2s ease-in-out',
  animationDuration: 4000,
  animationName: keyframes,
  fontSize: 200,
}))
export default compose(styled)(WelcomeScreen)
