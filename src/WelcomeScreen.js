import { faAmbulance, faBolt, faList } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { defaultStyle } from 'substyle'

function WelcomeScreen({ onMenuItemSelect, style }) {
  return (
    <div {...style}>
      <div {...style('menuItem')} onClick={() => onMenuItemSelect('wizard')}>
        <div {...style('label')}>
          TO THE RESCUE
          <FontAwesomeIcon {...style('icon')} icon={faAmbulance} />
        </div>
      </div>
      <div {...style('menuItem')} onClick={() => onMenuItemSelect('adHoc')}>
        <div {...style('label')}>
          NEUE BLITZLISTE
          <FontAwesomeIcon {...style('icon')} icon={faBolt} />
        </div>
      </div>
      <div
        {...style('menuItem')}
        onClick={() => onMenuItemSelect('favourites')}
      >
        <div {...style('label')}>WEITERE LISTEN</div>
        <FontAwesomeIcon {...style('icon')} icon={faList} />
      </div>
    </div>
  )
}

const styled = defaultStyle(() => {
  const baseSize = 120
  const fontSize = 18
  const iconSize = 45
  return {
    display: 'flex',
    flexWrap: 'wrap',

    icon: {
      fontSize: iconSize,
    },

    menuItem: {
      alignItems: 'center',
      border: '2px solid black',
      backgroundColor: 'white',
      borderRadius: baseSize / 2,
      display: 'flex',
      height: baseSize,
      lineHeight: `${baseSize}px`,
      margin: 'auto',
      textAlign: 'center',
      width: baseSize,
    },

    label: {
      fontSize,
      lineHeight: `${fontSize}px`,
      margin: 'auto',
    },
  }
})

export default styled(WelcomeScreen)
