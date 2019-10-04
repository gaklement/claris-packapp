import { button, color, margin } from './theme'
import { compose, withHandlers, withState } from 'recompose'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { groupBy, map } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Items from './Items'
import React from 'react'
import { Transition } from 'react-transition-group'
import { defaultStyle } from 'substyle'
import { expandCollapseTransition } from './transitions'
import sortCategories from './sortCategories'

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
  const itemsGroupedByCategory = groupBy(items, item => {
    return item.packageIds
  })

  const sortedCategories = sortCategories(itemsGroupedByCategory)

  return (
    <div {...style}>
      {map(sortedCategories, (categoryGroup, categoryGroupKey) => {
        const isCollapsed = collapsedCategories.includes(categoryGroupKey)
        const mappedPackage = packages.find(
          pack => pack.id === categoryGroupKey
        )

        return (
          <div {...style('categoryContainer')} key={categoryGroupKey}>
            <div
              {...style('categoryTile')}
              onClick={() => {
                onCollapseCategory(categoryGroupKey)
              }}
            >
              <h3 {...style('title')}>{mappedPackage && mappedPackage.name}</h3>
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
  opacity: 1,
  transition: expandCollapseTransition,
}

const transitionStyles = {
  exited: {
    maxHeight: 0,
    opacity: 0,
    overflow: 'hidden',
  },
}

const styled = defaultStyle(() => {
  return {
    categoryContainer: {
      backgroundColor: color.quattronary,
      borderRadius: `${2 * button.borderRadius}px`,
      border: '1px solid lightgrey',
      marginBottom: margin.large,
    },

    categoryTile: {
      alignItems: 'center',
      color: '#e2e2e2',
      display: 'flex',
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
