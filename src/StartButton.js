import React, { useState } from 'react'
import { duration, transition } from './transitions'

import { Transition } from 'react-transition-group'
import { color } from './theme'
import { defaultStyle } from 'substyle'

function StartButton({ icon, label, menuName, onMenuItemSelect, style }) {
  const [inProp, setInProp] = useState(true)

  return (
    <Transition in={inProp} timeout={duration}>
      {state => (
        <div
          style={{
            ...defaultStyles,
            ...transitionStyles[state],
            ...style,
          }}
          onClick={() => {
            setInProp(false)

            setTimeout(() => onMenuItemSelect(menuName), duration)
          }}
        >
          <img {...style('icon')} src={icon} alt={label} />
          <div {...style('action')}>{label}</div>
        </div>
      )}
    </Transition>
  )
}

const defaultStyles = {
  backgroundColor: color.primary,
  border: '1px solid white',
  borderRadius: '50%',
  display: 'block',
  height: 150,
  margin: 'auto',
  opacity: 1,
  transition,
  width: 150,
}

const transitionStyles = {
  exiting: {
    opacity: 0.2,
  },
  exited: {
    opacity: 0,
  },
}

const styled = defaultStyle(() => ({
  action: {
    color: 'white',
    margin: 'auto',
    marginTop: 5,
    textAlign: 'center',
    width: '50%',
  },

  icon: {
    display: 'block',
    height: '50%',
    margin: 'auto',
    marginTop: 10,
    paddingRight: 2,
    width: '50%',
  },
}))

export default styled(StartButton)
