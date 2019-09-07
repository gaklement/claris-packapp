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
            <div>{packages.find(pack => pack.id === key).name}</div>
            {map(category, (item, key) => (
              <div key={key}>
                <button onClick={() => onItemRemove(item)}>Remove</button>
                <div {...style('itemName')}>
                  {item.name} {item.packageIds[0]}
                </div>
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
