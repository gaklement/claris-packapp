import { groupBy, map } from 'lodash'

import React from 'react'
import { defaultStyle } from 'substyle'

function ItemList({ items, onItemRemove, packages, style }) {
  const groupedByCategory = groupBy(items, item => {
    return item.packageIds
  })

  return (
    <div>
      {map(groupedByCategory, (category, key) => {
        return (
          <div key={key}>
            <h3>{packages.find(pack => pack.id === key).name}</h3>
            {map(category, (item, key) => (
              <div key={key}>
                <button onClick={() => onItemRemove(item)}>Remove</button>
                <div {...style('itemName')}>{item.name}}</div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

const styled = defaultStyle(() => ({
  itemName: { display: 'inline' },
}))

export default styled(ItemList)
