import { compose, lifecycle } from 'recompose'

import React from 'react'
import { css } from 'glamor'
import { defaultStyle } from 'substyle'

const hello = css.keyframes({
  from: {
    fontSize: 11,
  },
  to: {
    fontSize: 200,
  },
})

const handleContinue = window.addEventListener('keydown', () =>
  console.log('==keydown')
)

function WelcomeScreen({ onContinue, style }) {
  return <div {...style}>HELLO</div>
}

const styled = defaultStyle(() => ({
  animation: '2s ease-in-out',
  animationDuration: 4000,
  animationName: hello,
  fontSize: 200,
}))

export default compose(
  lifecycle({
    componentWillUnmount() {
      window.removeEventListener('keydown', handleContinue)
    },
  }),
  styled
)(WelcomeScreen)
