import { faAmbulance, faBolt, faList } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { color } from './theme'
import { defaultStyle } from 'substyle'
import wizard from './wizard.png'

function WelcomeScreen({ onMenuItemSelect, onClick, style }) {
  return (
    <div {...style} onClick={onClick}>
      <img {...style('wizard')} src={wizard} alt="wizard" />
      <div {...style('action')}>WIZARD STARTEN</div>
    </div>
  )
}

const styled = defaultStyle(() => ({
  backgroundColor: 'darkcyan',
  border: '1px solid white',
  borderRadius: '50%',
  display: 'block',
  height: 150,
  margin: 'auto',
  opacity: 0.6,
  width: 150,

  action: {
    color: 'white',
    margin: 'auto',
    marginTop: 5,
    textAlign: 'center',
    width: '50%',
  },

  wizard: {
    display: 'block',
    height: '50%',
    margin: 'auto',
    marginTop: 10,
    paddingRight: 2,
    width: '50%',
  },
}))

export default styled(WelcomeScreen)
