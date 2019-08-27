import React from 'react'
import { defaultStyle } from 'substyle'

function ItemList({ items, onItemRemove, style }) {
  return items.map((item, key) => (
    <div key={key}>
      <button onClick={() => onItemRemove(item)}>Remove</button>
      <div {...style('itemName')}>{item.name}</div>
    </div>
  ))
}

const styled = defaultStyle(() => ({
  itemName: { display: 'inline' },
}))

export default styled(ItemList)
