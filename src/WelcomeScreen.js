import React from 'react'
import StartButton from './StartButton'
import { defaultStyle } from 'substyle'
import favourites from './favourites.png'
import { margin } from './theme'
import wizard from './wizard.png'

function WelcomeScreen({ onMenuItemSelect, style }) {
  return (
    <div {...style}>
      <StartButton
        icon={wizard}
        label="WIZARD STARTEN"
        menuName="wizard"
        onMenuItemSelect={onMenuItemSelect}
        style={style('wizard')}
      />
      <StartButton
        icon={favourites}
        label="FAVOURITEN"
        menuName="favourites"
        onMenuItemSelect={onMenuItemSelect}
        style={style('favourites')}
      />
    </div>
  )
}

const styled = defaultStyle(() => ({
  display: 'flex',
  marginBottom: margin.large,
  marginTop: margin.large,
  wizard: {
    action: {},

    icon: {},
  },
  favourites: {
    action: {
      width: '100%',
    },

    icon: {
      height: '40%',
      marginBottom: margin.medium,
      marginTop: margin.large,
      width: '40%',
    },
  },
}))

export default styled(WelcomeScreen)
