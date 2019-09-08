import { compose, withHandlers, withState } from 'recompose'
import { groupBy, map } from 'lodash'

import Item from './Item'
import React from 'react'
import { defaultStyle } from 'substyle'

function ItemList({
  checkedOffItems,
  items,
  onClickItemCheck,
  onItemRemove,
  packages,
  style,
}) {
  const groupedByCategory = groupBy(items, item => {
    return item.packageIds
  })

  return (
    <div {...style}>
      {map(groupedByCategory, (category, key) => {
        return (
          <div key={key}>
            <h3>
              {packages.find(pack => pack.id === key)
                ? packages.find(pack => pack.id === key).name
                : 'Auf die Schnelle'}
            </h3>
            {map(category, (item, key) => {
              const isCheckedOff = checkedOffItems.find(
                checkedOffItem => checkedOffItem.id === item.id
              )
              return (
                <Item
                  key={key}
                  isCheckedOff={isCheckedOff}
                  item={item}
                  onClickItemCheck={onClickItemCheck}
                  onItemRemove={onItemRemove}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const styled = defaultStyle(() => {
  return {
    fontSize: 14,
    lineHeight: '24px',
  }
})

export default compose(
  withState('checkedOffItems', 'setCheckedOffItems', []),
  withHandlers({
    onClickItemCheck: ({ checkedOffItems, setCheckedOffItems, items }) => (
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
  }),
  styled
)(ItemList)
