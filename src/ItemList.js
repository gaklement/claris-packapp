import { button, margin } from './theme'
import { compose, withHandlers, withState } from 'recompose'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { groupBy, map } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Items from './Items'
import React from 'react'
import { Transition } from 'react-transition-group'
import { defaultStyle } from 'substyle'

function ItemList({
  checkedOffItems,
  collapsedCategories,
  items,
  onClickItemCheck,
  onCollapseCategory,
  onItemRemove,
  packages,
  style,
}) {
  const itemGroupedByCategory = groupBy(items, item => {
    return item.packageIds
  })

  return (
    <div {...style}>
      {map(itemGroupedByCategory, (categoryGroup, categoryGroupKey) => {
        const isCollapsed = collapsedCategories.includes(categoryGroupKey)

        return (
          <div key={categoryGroupKey}>
            <div
              {...style('categoryTile')}
              onClick={() => {
                onCollapseCategory(categoryGroupKey)
              }}
            >
              <h3 {...style('title')}>
                {packages.find(pack => pack.id === categoryGroupKey)
                  ? packages.find(pack => pack.id === categoryGroupKey).name
                  : 'Auf die Schnelle'}
              </h3>
              <FontAwesomeIcon
                {...style('collapseIcon')}
                icon={isCollapsed ? faChevronDown : faChevronUp}
              />
            </div>
            <Transition in={!isCollapsed} timeout={100}>
              {state => (
                <div style={{ ...defaultStyles, ...transitionStyles[state] }}>
                  <Items
                    categoryGroup={categoryGroup}
                    checkedOffItems={checkedOffItems}
                    onClickItemCheck={onClickItemCheck}
                    onItemRemove={onItemRemove}
                  />
                </div>
              )}
            </Transition>
          </div>
        )
      })}
    </div>
  )
}

const defaultStyles = {
  maxHeight: 1000,
  transition: 'max-height 500ms ease-in-out',
}

const transitionStyles = {
  exited: {
    maxHeight: 0,
    overflow: 'hidden',
  },
}

const styled = defaultStyle(() => {
  return {
    categoryTile: {
      alignItems: 'center',
      backgroundColor: '#748dc3',
      borderRadius: `${2 * button.borderRadius}px ${2 *
        button.borderRadius}px 0px 0px`,
      border: '1px solid',
      color: '#e2e2e2',
      display: 'flex',
      marginBottom: 10, //when collapsed
      opacity: 0.8,
      paddingLeft: button.padding,
      paddingLight: button.padding,
    },

    collapseIcon: {
      marginRight: margin.medium,
    },

    title: {
      display: 'inline-block',
      flexGrow: 1,
    },
  }
})

export default compose(
  withState('checkedOffItems', 'setCheckedOffItems', []),
  withState('collapsedCategories', 'setCollapsedCategories', []),
  withHandlers({
    onClickItemCheck: ({ checkedOffItems, setCheckedOffItems }) => (
      clickedItem,
      isCheckedOff
    ) => {
      if (!isCheckedOff) {
        setCheckedOffItems([...checkedOffItems, clickedItem])
        return
      }

      setCheckedOffItems(
        checkedOffItems.filter(
          checkedOffItem => checkedOffItem.id !== clickedItem.id
        )
      )
    },
    onCollapseCategory: ({
      collapsedCategories,
      setCollapsedCategories,
    }) => categoryKey => {
      if (collapsedCategories.includes(categoryKey)) {
        setCollapsedCategories(
          collapsedCategories.filter(
            collapsedCategory => collapsedCategory !== categoryKey
          )
        )
        return
      }

      setCollapsedCategories([...collapsedCategories, categoryKey])
    },
  }),
  styled
)(ItemList)
