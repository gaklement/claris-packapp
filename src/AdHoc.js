import { button, color, margin } from './theme'
import { compose, withHandlers, withState } from 'recompose'

import AdHocCategorySelect from './AdHocCategorySelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Transition } from 'react-transition-group'
import { defaultStyle } from 'substyle'
import { duration } from './transitions'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { uniqueId } from 'lodash'

function AdHoc({
  categories,
  itemName,
  onItemAdd,
  onInputChange,
  onKeyDown,
  setSelectedCategory,
  setShowPopUpButton,
  showPopUpButton,
  style,
}) {
  return (
    <div {...style}>
      {showPopUpButton && (
        <div
          {...style('popUpButton')}
          onClick={() => {
            setShowPopUpButton(false)
          }}
        >
          +
        </div>
      )}

      <Transition in={!showPopUpButton} timeout={duration}>
        {state => {
          return (
            <div
              style={{
                ...defaultStyles,
                ...transitionStyles[state],
                ...style,
              }}
            >
              <div
                {...style('closePopUp')}
                onClick={() => setShowPopUpButton(true)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <div {...style('description')}>
                Wenn dir etwas zwischendrin einfällt, was du auf keinen Fall
                vergessen willst, kannst du das hier eintragen
              </div>
              <div {...style('adHoc')}>
                <input
                  {...style('adHocInput')}
                  id="adHocName"
                  type="text"
                  onChange={onInputChange}
                  onKeyDown={onKeyDown}
                  value={itemName}
                />
                <AdHocCategorySelect
                  categories={categories}
                  onItemAdd={onItemAdd}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>
          )
        }}
      </Transition>
    </div>
  )
}

const defaultStyles = {
  backgroundColor: color.primary,
  border: `1px solid ${color.secondary}`,
  borderBottom: 'none',
  borderRadius: button.borderRadius,
  height: 0,
  opacity: 0,
  transition: 'height 300ms ease-in-out',
  zIndex: 1,
}

const transitionStyles = {
  entered: {
    bottom: 0,
    height: 140,
    opacity: 1,
    padding: margin.small,
    position: 'fixed',
    width: '87%',
  },
  exited: {
    height: 0,
    bottom: 0,
    display: 'none',
  },
}

const styled = defaultStyle(() => {
  return {
    adHoc: {
      display: 'flex',
      flexDirection: 'column',
      margin: margin.small,
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

    closePopUp: {
      color: color.secondary,
      marginRight: margin.medium,
      marginTop: margin.small,
      textAlign: 'right',
    },
    description: {
      color: color.secondary,
      marginBottom: margin.medium,
      marginLeft: margin.small,
      marginTop: margin.small,
    },
    popUpButton: {
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
      zIndex: 1,
    },
  }
})

export default compose(
  withState('itemName', 'setItemName', 'Socken'),
  withState('selectedCategory', 'setSelectedCategory', 'Sonstiges'),
  withState('showPopUpButton', 'setShowPopUpButton', true),
  withHandlers({
    onInputChange: ({ setItemName }) => ({ target }) => {
      setItemName(target.value)
    },
    onItemAdd: ({
      categories,
      itemName,
      items,
      selectedCategory,
      setShowPopUpButton,
      setItems,
      setItemName,
    }) => () => {
      if (!itemName) {
        return
      }
      const mappedCategoryId = categories.find(
        category => category.name === selectedCategory
      )

      const item = {
        id: uniqueId(),
        name: itemName,
        packageIds: [mappedCategoryId.id],
      }

      setItems([...items, item])
      setItemName('')
      setShowPopUpButton(true)
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
