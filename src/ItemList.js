import { groupBy, map } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { defaultStyle } from 'substyle'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function ItemList({ items, onItemRemove, packages, style }) {
  const groupedByCategory = groupBy(items, item => {
    return item.packageIds
  })

  return (
    <div>
      {map(groupedByCategory, (category, key) => {
        return (
          <div key={key}>
            <h3>
              {packages.find(pack => pack.id === key)
                ? packages.find(pack => pack.id === key).name
                : 'Auf die Schnelle'}
            </h3>
            {map(category, (item, key) => (
              <div key={key}>
                <div {...style('itemName')}>{item.name}</div>
                <div {...style('remove')}>
                  <FontAwesomeIcon
                    {...style('icon')}
                    icon={faTimes}
                    onClick={() => onItemRemove(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

const styled = defaultStyle(() => {
  const fontColor = '#848282'
  const lineHeight = '24px'
  return {
    remove: {
      backgroundColor: '#ededf3',
      color: fontColor,
      display: 'inline-block',
      fontSize: 14,
      lineHeight,
      paddingRight: 10,
    },
    itemName: {
      backgroundColor: '#ededf3',
      color: fontColor,
      display: 'inline-block',
      fontSize: 14,
      lineHeight,
      marginBottom: 1,
      minHeight: lineHeight,
      paddingLeft: 10,
      textAlign: 'left',
      verticalAlign: 'center',
      width: 200,
    },
  }
})

export default styled(ItemList)
