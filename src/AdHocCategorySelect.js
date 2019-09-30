import { button, margin } from './theme'

import React from 'react'
import { defaultStyle } from 'substyle'

function AdHocCategorySelect({
  categories,
  onItemAdd,
  setSelectedCategory,
  style,
}) {
  return (
    <div {...style}>
      <select
        {...style('categorySelect')}
        onChange={event => setSelectedCategory(event.target.value)}
      >
        {categories &&
          categories.map(category => <option>{category.name}</option>)}
      </select>

      <div {...style('adHocAdd')} onClick={onItemAdd}>
        +
      </div>
    </div>
  )
}

const styled = defaultStyle(() => {
  return {
    display: 'flex',
    marginTop: margin.small,
    adHocAdd: {
      backgroundColor: '#dca3a3',
      border: 'none',
      borderRadius: button.borderRadius,
      height: button.height,
      lineHeight: `${button.height}px`,
      marginLeft: margin.small,
      textAlign: 'center',
      paddingBottom: 1,
      width: button.height,
    },
    categorySelect: {
      border: 'none',
      borderRadius: button.borderRadius,
      flexGrow: 1,
      height: button.height,
    },
  }
})

export default styled(AdHocCategorySelect)
