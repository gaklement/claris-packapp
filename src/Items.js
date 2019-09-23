import Item from './Item'
import React from 'react'
import { map } from 'lodash'

function Items({
  categoryGroup,
  checkedOffItems,
  onClickItemCheck,
  onItemRemove,
}) {
  return (
    <div>
      {map(categoryGroup, (item, key) => {
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
}

export default Items
