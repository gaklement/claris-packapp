import Item from './Item'
import React from 'react'
import { defaultStyle } from 'substyle'
import { map } from 'lodash'
import { margin } from './theme'

function Items({
  categoryGroup,
  checkedOffItems,
  onClickItemCheck,
  onItemRemove,
  style,
}) {
  return (
    <div {...style}>
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

const styled = defaultStyle(() => ({
  padding: margin.small,
  paddingTop: margin.large,
}))

export default styled(Items)
