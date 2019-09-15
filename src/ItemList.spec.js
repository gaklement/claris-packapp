import Item from './Item'
import ItemList from './ItemList'
import React from 'react'
import data from './data'
import { mount } from 'enzyme'
describe('ItemList', () => {
  let component

  const basicItems = [
    { id: 'bra', name: 'BH', packageIds: ['basics'] },
    { id: 'phone', name: 'Handy', packageIds: ['basics'] },
  ]
  const beachItems = [
    { id: 'afterSunLotion', name: 'Après sun', packageIds: ['beach'] },
    { id: 'flipFlops', name: 'Badelatschen', packageIds: ['beach'] },
  ]

  const cosmeticItems = [
    { id: 'conditioner', name: 'Spülung', packageIds: ['cosmetics'] },
    { id: 'hairFoam', name: 'Haarschaum', packageIds: ['cosmetics'] },
  ]

  const multipleCategoriesItems = [
    { id: 'book', name: 'Buch', packageIds: ['beach', 'byPlane', 'quietTime'] },
    {
      id: 'sunBlocker',
      name: 'Sonnencreme',
      packageIds: ['cosmetics', 'beach'],
    },
  ]
  const items = [
    ...basicItems,
    ...beachItems,
    ...cosmeticItems,
    ...multipleCategoriesItems,
  ]
  beforeEach(() => {
    component = mount(<ItemList items={items} packages={data.packages} />)
  })

  it('should show items for a category', () => {
    component.setProps({
      items: cosmeticItems,
    })
    expect(component.find(Item).at(0)).toIncludeText(cosmeticItems[0].name)
    expect(component.find(Item).at(1)).toIncludeText(cosmeticItems[1].name)
  })
})
