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
                <div {...style('itemName')}>{item.name}</div>
                <button onClick={() => onItemRemove(item)}>Remove</button>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

const styled = defaultStyle(() => {
  const lineHeight = '24px'
  return {
    itemName: {
      backgroundColor: '#ededf3',
      color: '#848282',
      display: 'inline-block',
      fontSize: 14,
      lineHeight,
      marginBottom: 1,
      minHeight: lineHeight,
      textAlign: 'left',
      verticalAlign: 'center',
      width: 200,
    },
  }
})

export default styled(ItemList)
