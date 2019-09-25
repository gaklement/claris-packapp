import { color, margin } from './theme'

import Item from './Item'
import React from 'react'
import { defaultStyle } from 'substyle'
import { map } from 'lodash'

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
  // backgroundColor: color.quattronary,
  padding: margin.small,
  paddingTop: margin.large,
  // border: '1px solid lightgrey',
  // borderTop: 0,
}))

export default styled(Items)
